# 飞书集成指南
> 来源：CLAUDE.md v2.0
> 用途：Lark-MCP 使用与配置

**主索引**：~/.claude/CLAUDE.md

---

## 2.4 子代理执行规范

当子任务是代码层面实施或 GIT 操作时，子代理必须执行以下流程:

**启动阶段:**
1. 检查 `.claude/feishu.yaml` 获取默认 chatid
2. 如果没有配置，询问用户并保存到该文件
3. 通过 lark-mcp `im_v1_message_create` 向目标用户/群发送"任务开始通知"
4. 通过 lark-mcp `bitable_v1_appTableRecord_create` 在多维表格中新增任务记录

**执行阶段:**
5. 根据任务进度实时更新多维表格描述信息
   - 使用 `bitable_v1_appTableRecord_update` 更新记录
   - 新内容追加在描述字段的最顶部（保持历史记录可见）
   - 更新间隔：每完成重要步骤或小节时更新一次

**完成阶段:**
6. 任务完成后通过 `bitable_v1_appTableRecord_update` 将状态改为"待审查"
7. 通过 lark-mcp `im_v1_message_create` 发送"任务结束等待审查"通知
8. 在通知中附带任务摘要和多维表格链接

**异常处理:**
- 如果 lark-mcp 调用失败，记录错误但继续执行任务（不阻塞）
- 如果 `.claude/feishu.yaml` 配置不完整，使用用户交互补填

---

## 7.4 Lark-MCP ChatId 查找机制

当用户提供的是群名称或用户信息而非 chatid 时，使用以下机制自动查找:

| 任务                | 使用工具                          | 说明                                                           |
| ------------------- | --------------------------------- | -------------------------------------------------------------- |
| 查找群聊            | `im_v1_chat_list`                 | 遍历当前用户所属群聊，按名称匹配目标群                          |
| 查找用户            | `contact_v3_user_batchGetId`      | 根据邮箱/手机号查找用户，获取 open_id/union_id/user_id          |
| 自动保存            | 更新 `.claude/feishu.yaml`        | 找到后自动保存到配置文件，避免重复查询                          |

**查找流程:**
1. 用户提供群名称或用户信息
2. 检查 `.claude/feishu.yaml` 中是否已有缓存
3. 如无缓存，调用对应 MCP 工具进行查找
4. 找到匹配项后保存并使用

---

## 7.6 Feishu.yaml 配置说明

位置：`.claude/feishu.yaml`

配置文件用于存储飞书/Lark 集成的默认参数。格式如下:

```yaml
# 默认通知目标（群 ID 或用户 ID）
default_chat_id: ""  # 待用户配置

# 多维表格应用 Token
bitable_app_token: "UiaVbSpyQaKtYqsCXFcchl0cnOe"

# 任务表 ID
bitable_table_id: "tblsXw0Hhp63wiLe"

# 多维表格 URL
bitable_table_url: "https://scydcn888.feishu.cn/base/UiaVbSpyQaKtYqsCXFcchl0cnOe"

# 任务表的字段映射（可选）
task_fields:
  status: "Status"          # 任务状态字段名
  description: "Description"  # 任务描述字段名
  assignee: "Assignee"      # 负责人字段名
```

**使用说明:**
- 首次运行子代理时，如未配置此文件，会自动提示并保存
- `default_chat_id` 可通过 `im_v1_chat_list` 和 `contact_v3_user_batchGetId` 自动查找
- `bitable_app_token` 和 `bitable_table_id` 已预设为公共任务管理表格
- `bitable_table_url` 提供直接访问链接，便于查看和管理任务

---

## 4.3 初始化项目创建流程

**触发条件（满足任一即触发）：**
1. 用户明确说"初始化"、"初始化项目"、"init"或 `/init`
2. 用户开始任何任务时，检测到 `.claude/.synced` 不存在且无 `.claude/.skip-sync` 标记
3. 检测到项目目录（.git、package.json、pom.xml等）但无 `.claude/` 目录

**强制性：**
此流程是**前置必需流程**，不属于"实施"范畴。即使用户说"先不实施"，文档同步流程也必须先完成（这是环境准备而非任务实施）。

**执行流程：**

| 步骤 | 说明 |
| ---- | ---- |
| 0    | 检测项目类型并创建目录：`mkdir -p .claude/docs .claude/agents` |
| 1    | 增量同步文档：复制 `~/.claude/docs/*.md` 到 `.claude/docs/`（不覆盖） |
| 2    | 增量同步角色：复制 `~/.claude/agents/*.md` 到 `.claude/agents/`（不覆盖） |
| 3    | 同步主索引：复制 `~/.claude/CLAUDE.md` 到 `.claude/CLAUDE.md`（不覆盖） |
| 4    | 同步配置文件：复制 `~/.claude/*.yaml` 到 `.claude/`（不覆盖） |
| 5    | **群选择**：调用 `im_v1_chat_list` 获取所有可用群聊列表 |
| 6    | 向用户展示群列表（群名称 + chat_id），让用户选择通知目标 |
| 7    | 用户选择群后，保存 chat_id 到 `.claude/feishu.yaml` 的 `default_chat_id` |
| 8    | 向用户询问项目名称（提供当前文件夹名称作为默认值） |
| 9    | 等待用户响应，设置 30 秒超时；无响应则使用文件夹名称 |
| 10   | 通过 lark-mcp `bitable_v1_appTableRecord_create` 在多维表格"任务管理"表中创建初始化记录 |
| 11   | 记录内容：任务名称（"【项目初始化】{项目名}"）、项目（自动创建选项）、任务状态（"进行中"）、任务描述（包含路径、技术栈等） |
| 12   | 创建同步标记：`echo "$(date)" > .claude/.synced` |
| 13   | 成功创建后向用户确认：`"项目 {project_name} 配置已同步并记录到多维表格"` |

**群选择示例流程：**
```bash
# 步骤5：调用MCP获取群列表
mcp__lark-mcp__im_v1_chat_list(params: {page_size: 50})

# 步骤6：向用户展示（示例）
可用群聊列表：
1. [研发团队] - oc_xxx123
2. [产品讨论] - oc_xxx456
3. [技术支持] - oc_xxx789

请选择通知目标群（输入序号或群名称）：
```

**同步规则：**
- 只复制不存在的文件（增量同步）
- 不覆盖已存在的项目级配置
- 项目级配置优先于全局配置

**异常处理：**
- 文件复制失败：记录错误日志，跳过失败文件，继续后续步骤
- 如果用户创建了 `.claude/.skip-sync` 标记，则跳过自动同步
- 多维表格操作失败：记录错误但继续执行（不阻塞同步过程）
- 用户响应超时：使用文件夹名称继续

**手动初始化命令：**
用户可以明确说"初始化项目"或"/init"强制重新同步。

---

## 常用 Lark-MCP 工具

### 消息管理

- `im_v1_message_create` - 发送消息（文本/卡片/图片等）
- `im_v1_message_list` - 获取聊天历史

### 群聊管理

- `im_v1_chat_create` - 创建群聊
- `im_v1_chat_list` - 获取群聊列表
- `im_v1_chatMembers_get` - 获取群成员列表

### 多维表格

- `bitable_v1_app_create` - 创建多维表格应用
- `bitable_v1_appTable_create` - 创建数据表
- `bitable_v1_appTable_list` - 列出所有表
- `bitable_v1_appTableField_list` - 列出表字段
- `bitable_v1_appTableRecord_create` - 创建记录
- `bitable_v1_appTableRecord_search` - 搜索记录
- `bitable_v1_appTableRecord_update` - 更新记录

### 用户管理

- `contact_v3_user_batchGetId` - 通过邮箱/手机号查找用户ID

### 文档管理

- `docx_v1_document_rawContent` - 获取文档纯文本内容
- `docx_builtin_search` - 搜索云文档
- `docx_builtin_import` - 导入文档（支持 Markdown）
- `drive_v1_permissionMember_create` - 添加文档协作者

### Wiki管理

- `wiki_v1_node_search` - 搜索 Wiki
- `wiki_v2_space_getNode` - 获取 Wiki 节点信息

---

## 初始化阶段飞书集成（阶段0强制执行）

### 步骤1：项目名称确认

使用 AskUserQuestion 询问用户：

```json
{
  "questions": [{
    "question": "请确认项目名称（用于创建飞书多维表格项目记录）",
    "header": "项目名称",
    "multiSelect": false,
    "options": [
      {
        "label": "使用当前目录名",
        "description": "使用当前工作目录的名称作为项目名"
      },
      {
        "label": "自定义名称",
        "description": "手动输入项目名称"
      }
    ]
  }]
}
```

获取项目名称后，调用：
```javascript
bitable_v1_appTableRecord_create({
  app_token: "从feishu.yaml获取",
  table_id: "从feishu.yaml获取",
  data: {
    fields: {
      "任务名称": "【项目初始化】{用户确认的项目名称}",
      "项目": "{用户确认的项目名称}",  // 飞书会自动创建该选项
      "任务状态": "进行中",
      "任务描述": "项目初始化详情（包含路径、技术栈等）"
    }
  }
})
```

**重要说明：**
- **"项目"字段**：这是单选字段，直接传入项目名称，飞书多维表格会**自动创建该选项**（如果不存在）
- **字段名称**：必须与实际多维表格的字段名称完全匹配，建议先用 `bitable_v1_appTableField_list` 查询字段定义
- **任务名称格式**：建议使用 `【项目初始化】{项目名}` 格式，便于区分初始化任务和普通任务

### 步骤2：通知对象选择

**2.1 询问通知方式**

使用 AskUserQuestion：

```json
{
  "questions": [{
    "question": "初始化完成后是否发送飞书通知？",
    "header": "通知方式",
    "multiSelect": false,
    "options": [
      {
        "label": "通知到群聊",
        "description": "在指定群聊中发送通知消息"
      },
      {
        "label": "通知到用户",
        "description": "给指定用户发送私信通知"
      },
      {
        "label": "不通知",
        "description": "跳过通知步骤"
      }
    ]
  }]
}
```

**2.2 如选择"通知到群聊"**

调用 `im_v1_chat_list` 获取所有群聊：

```javascript
im_v1_chat_list({
  page_size: 100,
  sort_type: "ByCreateTimeAsc"
})
```

使用 AskUserQuestion 展示群聊列表：

```json
{
  "questions": [{
    "question": "选择接收通知的群聊",
    "header": "目标群聊",
    "multiSelect": true,
    "options": [
      {
        "label": "群聊名称1",
        "description": "chat_id: xxx, 成员数: N"
      },
      {
        "label": "群聊名称2",
        "description": "chat_id: xxx, 成员数: N"
      }
      // ... 列出所有群聊
    ]
  }]
}
```

**2.3 如选择"通知到用户"**

获取用户列表（可选，根据需求）或直接让用户输入 open_id。

**2.4 保存配置**

将选择结果保存到 `.claude/feishu.yaml`：

```yaml
notification:
  type: "chat" # 或 "user" 或 "none"
  targets:
    - chat_id: "oc_xxx"
      name: "项目开发群"
    - chat_id: "oc_yyy"
      name: "测试通知群"
```

### 步骤3：发送初始化完成通知

如用户选择了通知，调用 `im_v1_message_create` 发送消息：

```javascript
im_v1_message_create({
  receive_id_type: "chat_id",
  data: {
    receive_id: "从feishu.yaml获取",
    msg_type: "text",
    content: JSON.stringify({
      text: `项目「${项目名称}」初始化完成\n` +
            `路径：${项目路径}\n` +
            `多维表格：${多维表格链接}`
    })
  }
})
```
