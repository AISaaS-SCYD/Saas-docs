# 子代理执行规范
> 来源：CLAUDE.md v2.0
> 用途：子代理工作流程与飞书集成

**主索引**：~/.claude/CLAUDE.md

---

## 2.3 预置 Agents（角色/模型）

#### 模型选择策略

| 模型              | 定位                                                                                              | 使用场景                                           |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Opus**          | 重推理/策略/审查/架构设计                                                                          | 思考规划、复杂决策、架构设计、主代理协调            |
| **Default(Sonnet)** | 通用编码与实现                                                                                    | 常规编码与实现、标准开发任务                        |
| **Haiku**         | 高速枚举/结构化与检索/执行命令                                                                     | 文档内容结构化梳理、执行命令、快速枚举任务、文档简单操作（增删改已知内容） |

**模型选择决策:**
- 涉及深度推理、架构设计、复杂决策 → 主代理(Opus)
- 代码实施、功能实现、标准开发 → 子代理(Sonnet)
- 文档操作、命令执行、快速枚举 → 子代理(Haiku)
- 不确定时默认使用 Sonnet

#### 路由基线

| 策略          | 说明                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| 分层协作      | 主代理（Opus）规划 → 子代理（Sonnet/Haiku）执行 → 主代理监督                                      |
| 能力分配      | 先"上下文归纳/范围收敛"，再"领域专长实现"，重要节点引入"审查/安全/测试"会签                       |

**子代理触发条件:**

| 触发条件 | 子代理模型 |
|----------|-----------|
| 代码实施 | Sonnet |
| GIT操作 | Haiku |
| 文档增删改/执行命令 | Haiku |
| 需要深度推理 | 主代理(Opus)规划后委托 |

**内置子代理类型（Task 工具）:**

| 子代理类型         | 用途                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| general-purpose    | 通用代理，用于研究复杂问题、搜索代码、执行多步任务                                                 |
| Explore            | 快速探索代码库，支持文件模式搜索、关键词搜索、代码库问题解答（指定 thoroughness：quick/medium/very thorough） |
| Plan               | 软件架构代理，用于设计实现计划、识别关键文件、考虑架构权衡                                         |
| claude-code-guide  | Claude Code 文档查询代理，用于回答关于 Claude Code、Claude Agent SDK、Claude API 的问题           |

#### 子代理选择决策树

根据任务特性，选择合适的子代理模型:

```
任务类型
├─ 思考/规划/策略 → Opus（主代理进行深度思考）
├─ 常规编码/实现 → Sonnet（通用编码与实现）
└─ 快速执行/文档操作/命令执行 → Haiku（高速结构化操作）
```

实际应用:
- 需要多步思考、架构设计、复杂决策 → 由主代理（Opus）进行推理与规划
- 常规的代码编写、功能实现、标准开发任务 → 由 Sonnet 子代理执行
- 文档内容结构化梳理、执行命令、快速枚举任务、现有内容的简单编辑 → 由 Haiku 子代理执行

#### 子代理创建规范

创建子代理时，如果任务符合以下角色要求，必须在创建子代理的prompt中指示：

```
你需要读取 ./.claude/agents/[角色名].md（项目级优先）或 ~/.claude/agents/[角色名].md（全局次级）文件作为你的提示词
```

**角色映射表：**

| 任务类型 | 角色文件 | 说明 |
|---------|---------|------|
| Git操作（提交、分支、PR、合并等） | git-operations.md | 版本管理相关操作 |
| 文件操作（创建、删除、移动、复制、重命名） | file-operations.md | 文件系统相关操作 |
| 架构分析、技术规划、方案设计 | architect.md | 需要深度思考和架构设计 |
| Bug调试、问题排查、错误修复 | debugger.md | 需要集成Codex CLI |
| 文档管理、文档编辑、内容组织 | doc-manager.md | 文档生命周期管理 |
| 代码编写、代码优化、功能实现 | code-developer.md | 代码实现与自审查 |
| 前端界面、UI组件、页面设计 | ui-designer.md | 需要集成Gemini CLI |
| 单元测试、集成测试、E2E测试 | test-engineer.md | 测试编写与维护 |
| CI/CD配置、容器化、部署脚本 | devops-engineer.md | 运维与部署 |
| 安全审查、漏洞检测、合规检查 | security-auditor.md | 安全审计与威胁建模 |
| API设计、接口规范、OpenAPI文档 | api-designer.md | API设计与文档生成 |
| 性能诊断、瓶颈定位、方案制定 | performance-optimizer.md | 性能分析（不实施代码） |

**使用示例：**

```
Task(general-purpose): "你需要读取 ./.claude/agents/git-operations.md 文件作为你的提示词。请创建feature分支并提交代码。"
```

---

## 2.4 子代理执行规范

### 飞书集成流程适用范围

**需要执行飞书集成流程的角色**：
- code-developer（代码实施）
- git-operations（Git操作）
- debugger（代码审查与修复）
- test-engineer（测试编写）
- devops-engineer（CI/CD配置）

**不需要执行飞书集成流程的角色**：
- architect（仅规划分析，不实施）
- doc-manager（文档操作，非代码实施）
- file-operations（文件操作，非代码实施）

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

## 角色分工详解

### 主代理（Opus）职责

**核心原则：主代理只规划，不实施**

1. **战略规划**
   - 接收用户任务，进行深度思考
   - 检查可用 Skill 和 MCP 工具
   - **强制任务分类**：识别任务类型并匹配子代理（见 workflow.md 阶段3）
   - 制定整体执行计划
   - 决定子代理分工

2. **监督验证**
   - 监控子代理执行进度
   - 验证交付质量
   - 进行自我反思评估
   - 协调多个子代理协作

3. **风险控制**
   - 识别潜在风险点
   - 决策破坏性变更
   - 处理失败恢复策略
   - 最终质量把关

**主代理禁止事项（严格遵守）：**
- ❌ 禁止直接编写代码（必须委托 code-developer 或 debugger）
- ❌ 禁止直接修复 BUG（必须委托 debugger + Codex CLI）
- ❌ 禁止直接设计 UI（必须委托 ui-designer + Gemini CLI）
- ❌ 禁止直接操作 Git（必须委托 git-operations）
- ❌ 禁止直接编辑文档（必须委托 doc-manager）
- ✅ 允许：规划、协调、监督、验证、决策

**强制委托检查（每次规划后自检）：**
```
我是否直接实施了代码/文档/Git操作？
├─ 是 → 违规！立即停止，创建子代理
└─ 否 → 检查是否创建了对应子代理
    ├─ 已创建 → 继续
    └─ 未创建 → 违规！立即创建
```

### 子代理职责

1. **Sonnet 子代理**
   - 执行代码编写任务
   - 实现功能逻辑
   - 执行 Git 操作
   - 运行测试验证
   - 遵循飞书集成流程（启动→执行→完成）

2. **Haiku 子代理**
   - 文档内容操作（增删改）
   - 执行系统命令
   - 快速枚举任务
   - 结构化数据处理
   - 简单文件操作

---

## 协作模式

### 标准协作流程

```
用户请求
    ↓
主代理（Opus）接收
    ↓
检查 Skill/MCP
    ↓
制定计划
    ↓
创建子代理（Sonnet/Haiku）
    ↓
子代理执行（含飞书通知）
    ↓
主代理监督
    ↓
质量验证
    ↓
交付用户
```

### 并行协作模式

**触发条件：**
- 任务间无依赖关系
- 操作不同文件，无资源冲突
- 3-5 个独立子任务

**执行流程：**
```
主代理规划（识别并行任务）
    ↓
单次消息启动多个子代理（run_in_background: true）
    ├─ 子代理A（文档） - 后台运行
    ├─ 子代理B（代码） - 后台运行
    └─ 子代理C（测试） - 后台运行
         ↓
    主代理监控进度（TaskOutput）
         ↓
    汇总子代理结果
         ↓
    主代理验证无冲突
         ↓
      交付用户
```

**代码示例：**
```python
# 单次消息启动多个子代理
Task(doc-manager, run_in_background: true): "更新API文档"
Task(code-developer, run_in_background: true): "修复订阅表单"
Task(test-engineer, run_in_background: true): "编写单元测试"

# 稍后获取结果
TaskOutput(task_id_1, block: true)
TaskOutput(task_id_2, block: true)
TaskOutput(task_id_3, block: true)
```

**关键原则：**
- **最大化并行**：默认优先考虑并行执行
- **单次启动**：所有并行任务在一个消息中启动
- **后台运行**：使用 `run_in_background: true` 参数
- **进度监控**：主代理使用 TaskOutput 监控进度
- **冲突避免**：确保不同子代理操作不同文件
- **持续执行**：并行任务完成后立即检查 TodoWrite，启动下一批任务

**持续并行执行流程：**

```
并行批次1启动（3-5个任务）
    ↓
主代理监控进度
    ↓
所有任务完成，获取结果
    ↓
验证无冲突
    ↓
更新 TodoWrite（标记已完成）
    ↓
检查 TodoWrite 剩余任务
    ├─ 有 pending 任务？
    │   ├─ 识别下一组可并行任务
    │   ├─ 分析依赖关系
    │   └─ 启动并行批次2 → 回到监控
    │
    └─ 无 pending 任务？
        └─ 进入验证和交付阶段
```

**任务队列管理示例：**

```markdown
批次1完成后：
1. 读取 TodoWrite 状态
2. 发现 3 个 pending 任务：
   - [pending] 添加错误处理逻辑
   - [pending] 更新单元测试
   - [pending] 更新API文档
3. 分析：三个任务独立，可并行
4. 立即启动批次2：
   Task(code-developer, run_in_background: true): "添加错误处理逻辑"
   Task(test-engineer, run_in_background: true): "更新单元测试"
   Task(doc-manager, run_in_background: true): "更新API文档"
5. 继续监控循环
```

### 串行协作模式

当任务有依赖关系时:

```
主代理规划
    ↓
子代理A（上下文收集）
    ↓
主代理分析
    ↓
子代理B（代码实现）
    ↓
子代理C（测试验证）
    ↓
主代理最终验证
    ↓
交付用户
```

---

## 实践建议

1. **明确边界**：主代理只负责思考和规划，具体实施交给子代理
2. **信息传递**：子代理执行时，主代理需提供清晰的上下文和目标
3. **进度同步**：子代理通过 TodoWrite 和飞书多维表格同步进度
4. **质量保证**：主代理在每个关键节点进行验证
5. **失败处理**：子代理连续3次失败后，主代理介入重新规划
6. **诊断后自动执行**：子代理完成诊断后，主代理自主决策下一步，避免询问用户

### 诊断后自动执行规则

当 debugger/architect 等分析型子代理完成诊断并提出修复建议时：

**决策树：**
```
收到诊断报告
    ↓
检查优先级和任务清晰度
    ├─ P0 + 任务明确 → 立即启动子代理并行执行
    │   ├─ 识别独立任务
    │   ├─ 创建 TodoWrite
    │   └─ 单次消息启动多个子代理（run_in_background: true）
    │
    ├─ P0 + 任务需细化 → 主代理快速规划 → 启动执行
    │
    ├─ P1/P2 + 有其他待办 → 添加到 TodoWrite → 继续当前任务
    │
    └─ P1/P2 + 无其他待办 → 立即启动执行
```

**禁止询问场景：**
- ❌ "需要我开始实施这些修复吗？"
- ❌ "还是您想先处理其他待办任务？"
- ❌ "我应该继续吗？"

**正确做法：**
```markdown
收到 debugger 诊断报告，发现 3 个 P0 问题。

分析：3 个问题独立且操作不同文件，可并行执行。

创建任务列表并立即执行：
[TodoWrite: 3 个任务，标记为 pending]

启动并行修复：
- Task(code-developer, run_in_background: true): "修复表格加载状态"
- Task(code-developer, run_in_background: true): "增强订阅创建健壮性"
- Task(code-developer, run_in_background: true): "添加事务保护"

监控进度中...
```

**仅在以下情况询问用户：**
- **询问时机**：完成分析和规划，得出最终结论时
- **询问场景**：
  - 技术方案选择：多个等价方案需要用户偏好（如：使用 Redis 还是内存缓存）
  - 破坏性操作：删除数据库表、修改核心配置、强制覆盖数据
  - 业务逻辑决策：涉及产品功能定义（如：订阅过期后是否自动续费）

**询问格式示例：**
```markdown
分析完成，得出以下结论：

问题：订阅数据同步失败
根因：订单支付成功但订阅创建失败，缺少回滚机制

最终方案（需确认）：
1. 添加数据库事务保护
2. webhook 重试时检查订单状态
3. 失败时回滚订单状态为 PENDING

风险：需要修改核心支付流程，涉及订单状态变更

是否继续执行此方案？
```

**对比错误做法：**
```markdown
❌ 发现问题了，要不要修？  # 过程中询问
❌ 我应该用 Redis 还是内存？  # 中途决策询问
✓ [完整分析] → [最终方案] → 是否执行？  # 结论时询问
```

---

## 开发流程约束

### 子代理任务分配判断

分配子代理任务时，必须判断是否应该由外部工具（Codex/Gemini）实施：

**Codex CLI适用场景：**
- 代码审查、BUG修复、实施建议 → 委托 debugger 子代理

**注意**：Codex CLI 仅由 debugger 角色使用，performance-optimizer 使用 Skill 辅助性能分析

**Gemini CLI适用场景：**
- UI组件设计、页面设计 → 委托 ui-designer 子代理
- 图片生成、视觉设计 → 委托 ui-designer 子代理

**任务分工明确：**
- **debugger（Codex CLI）**：代码审查、BUG修复、实施建议等相关工作
- **code-developer（Opus）**：代码逻辑、代码优化、代码变更、代码编写等相关工作

### 外部工具调用规范

在调用外部工具（Codex CLI / Gemini CLI）之前，必须详细描述需求，确保工具完全理解任务。

**通用原则：**
1. 使用结构化格式（优先XML格式）组织需求
2. 提供完整的上下文信息
3. 明确指定约束条件和预期输出
4. 包含具体的示例或参考

**Codex CLI调用规范：**

适用角色：debugger（仅此角色使用 Codex CLI）

XML模板结构：
```xml
<code-review-request>
  <file>文件路径</file>
  <issue-type>bug-fix|performance|code-quality</issue-type>
  <description>问题描述</description>
  <error-stack>错误堆栈（如有）</error-stack>
  <expected-behavior>预期行为</expected-behavior>
  <context>
    <related-code>相关代码说明</related-code>
  </context>
  <constraints>约束条件列表</constraints>
</code-review-request>
```

调用示例：
```bash
codex ask "$(cat <<'EOF'
<code-review-request>
  <project-context>
    项目类型: Next.js + TypeScript
    框架版本: 14.x
    使用的库: jsonwebtoken, express
  </project-context>
  <file-location>
    文件路径: src/components/UserProfile.tsx
    行号范围: 45-75
    函数名: handleUpload
  </file-location>
  <error-details>
    错误类型: bug-fix
    错误描述: 用户头像上传后不显示，控制台报错：Failed to load image
    错误堆栈:
      Error: Failed to load image
        at ImageComponent (UserProfile.tsx:45)
        at handleUpload (UserProfile.tsx:23)
    发生频率: 100% 复现
    影响范围: 仅影响头像上传功能，其他图片加载正常
  </error-details>
  <related-code>
    使用了 Next.js Image组件
    图片存储在 /public/uploads 目录
    使用FormData上传文件到 /api/upload 接口
    后端返回图片URL后前端使用Image组件渲染
  </related-code>
  <attempted-solutions>
    - 尝试1: 清除浏览器缓存，问题依旧
    - 尝试2: 更换图片格式（JPG → PNG），问题依旧
    - 尝试3: 检查图片权限，权限正常
    - 问题仍未解决，需要深度分析
  </attempted-solutions>
  <environment>
    操作系统: macOS 14
    Node版本: 18.17
    npm版本: 9.6
    浏览器: Chrome 120
    开发环境: npm run dev
  </environment>
</code-review-request>
EOF
)" --mode changeMode
```

**Gemini CLI调用规范：**

适用角色：ui-designer

XML模板结构：
```xml
<design-request>
  <type>页面类型|组件类型</type>
  <style>设计风格</style>
  <dimensions>尺寸规格</dimensions>
  <colors>
    <primary>主色</primary>
    <secondary>辅助色</secondary>
    <accent>强调色</accent>
  </colors>
  <requirements>设计要求列表</requirements>
  <constraints>设计约束列表</constraints>
  <reference>参考链接</reference>
</design-request>
```

调用示例：
```bash
gemini ask "$(cat <<'EOF'
<design-request>
  <scenario>
    应用场景: 企业SaaS产品的营销主页Hero部分
    用户群体: 技术决策者和产品经理
    目标: 吸引用户注册免费试用
    预期转化率: CTR > 5%
  </scenario>
  <tech-stack>
    框架: Next.js 14 + React 19
    样式方案: Tailwind CSS + CSS Modules
    动画库: Framer Motion
    图片优化: Next.js Image + WebP
  </tech-stack>
  <design-system>
    品牌色彩: 蓝色主调（#2563eb）
    字体: Inter + JetBrains Mono
    圆角半径: 8px - 16px
    间距系统: 8px为基础单位
    现有约束: 禁止过度渐变、禁止过度装饰
  </design-system>
  <available-components>
    已有组件:
    - Button组件（primary/secondary两种）
    - Card组件（基础布局）
    - Section容器
    需要新建:
    - Hero背景动画效果
    - 特性展示卡片（3列）
    - 虚拟滚动统计数据展示
  </available-components>
  <design-task>
    具体需求:
    - Hero Section: 1920x1080尺寸，包含标题、副标题、两个CTA按钮
    - 背景: 几何图案动画（subtle，不能过度）
    - 特性卡片: 网格布局，每个卡片有icon + 标题 + 描述
    - 交互: 鼠标悬停时卡片有微妙的浮起效果
    - 响应式: 移动端、平板、桌面端全覆盖
  </design-task>
  <animations>
    要求:
    - Hero标题: 淡入动画（0.5s）
    - 按钮: hover时按钮背景色加深 + 下阴影增加
    - 特性卡片: 滚动进入视图时，从下往上淡入（cascading effect）
    - 背景图案: 极其细微的旋转动画（持续60s一周期）
    禁止: 过度闪烁、过度缩放、过度旋转
  </animations>
</design-request>
EOF
)"
```

### UI设计模板搜索流程

ui-designer角色在设计页面或组件前，必须执行模板搜索流程：

**搜索步骤：**

1. **访问Aura.build组件库**
   - URL: https://www.aura.build/browse/components
   - 使用WebFetch工具获取页面内容
   - 搜索与需求相关的模板（如：dashboard, landing, auth等）

2. **筛选候选模板**
   - 根据需求类型筛选3-5个相关模板
   - 按相关性和质量排序
   - 记录每个模板的名称、描述、Preview链接

3. **分析模板预览**
   - 使用browser_eval工具访问Preview地址
   - 执行以下操作：
     ```javascript
     // 截图保存页面效果
     screenshot({ fullPage: true })

     // 分析页面结构
     evaluate(`
       {
         layout: document.querySelector('main')?.className,
         components: Array.from(document.querySelectorAll('[class*="component"]')).map(el => el.tagName),
         animations: getComputedStyle(document.body).getPropertyValue('--animations'),
         colorScheme: {
           primary: getComputedStyle(document.documentElement).getPropertyValue('--primary'),
           secondary: getComputedStyle(document.documentElement).getPropertyValue('--secondary')
         }
       }
     `)
     ```

4. **模板评估与选择**
   - 评估标准：
     - 布局结构是否符合需求
     - 组件组合是否合理
     - 交互效果是否符合设计约束（无过度华丽）
     - 动画效果是否合理适度
     - 响应式设计是否完善
   - 选择最适合的模板作为设计参考
   - 如果没有合适的模板，则基于需求自行设计

5. **模板应用与定制**
   - 提取模板的优秀设计元素
   - 根据具体需求进行定制化调整
   - 确保符合UI设计约束（禁止过度华丽和渐变）
   - 添加必要的交互动画和特效

**WebFetch使用示例：**
```
WebFetch(
  url: "https://www.aura.build/browse/components",
  prompt: "搜索与[需求类型]相关的组件模板，列出前5个模板的名称、描述和Preview链接"
)
```

**browser_eval使用示例：**
```
browser_eval(
  action: "start",
  browser: "chrome",
  headless: false
)

browser_eval(
  action: "navigate",
  url: "https://aura-xxx.vercel.app/preview/example"
)

browser_eval(
  action: "screenshot",
  fullPage: true
)

browser_eval(
  action: "evaluate",
  script: "分析页面结构和设计元素的JavaScript代码"
)
```

### 代码变更流程

每次代码变更后必须执行以下流程：

1. **同步项目文档**
   - 更新项目级 `./docs` 文件夹下的相关文档
   - 判断是否需要调整 `./.claude` 下的相关文档

2. **国际化检查**
   - 确保国际化（i18n）兼容与完整
   - 检查所有用户可见文本是否支持多语言

3. **调试与构建验证**
   - 运行debug调试确保功能正常
   - 执行构建验证确保无编译错误

4. **Git提交前检查**
   - 委托 test-engineer 进行测试工程检查
   - 委托 security-auditor 进行安全审计
   - 确认无问题后才进行Git操作

### UI设计约束

ui-designer 子代理必须遵循以下约束：

**禁止事项：**
- 禁止过度华丽的设计
- 禁止过度使用渐变效果

**必须事项：**
- 为组件、页面、界面、UI等位置加入合理的动画以及特效
- 添加交互动画以及特效（hover、click、focus等状态）
- 没有合适的组件就自己实现（不依赖外部组件库）

### 前端性能优化要求

开发过程中应按照以下需求设计：

1. **加快首屏渲染速度**
   - Hero组件优先不使用motion动画
   - 不要用LazyImage懒加载图片
   - 第一时间渲染出内容，减少LCP（最大内容绘制）延时

2. **减少图片体积**
   - 图片放在项目的 `/imgs` 目录下
   - 使用tinypng压缩图片，减少图片体积

3. **增强网页无障碍性**
   - 给只有图标没有文字内容的 `<a>` / `<button>` 等标签加上 `aria-label` 属性
   - 增强网页Accessibility评分

4. **优化字体加载速度**
   - 引入自定义字体时加上 `display: 'swap'; preload: true` 两个属性
   - 告诉浏览器优先下载自定义字体，下载完替换默认字体，消除渲染阻塞

5. **缓存静态资源**
   - 在 `public/_headers` 和 `next.config.mjs` 文件针对 `/imgs/*` 等静态资源配置自定义缓存策略
   - 例如：`Cache-Control: public,max-age=31536000,immutable`
   - 让CDN明确知道需要缓存多久，实现零延迟加载

6. **缓存静态页面**
   - 在Next.js项目中，通过增量静态生成（ISR）来缓存页面路由文件
   - 在页面对应的 `page.tsx` 文件头部加上 `export const revalidate = 3600;`
   - 告诉Worker，一小时内不重复生成此页面

7. **优化服务端渲染**
   - 服务端渲染涉及数据操作时，会影响网页指标的LCP和Speed Index
   - 把多个操作用 `await Promise.all` 包裹起来并行处理，降低响应延时

8. **配置数据缓存**
   - 通过 `unstable_cache`、`revalidateTag` 配置数据缓存
   - 例如把频繁读库的 `getConfigs` 缓存到内存/kv，加快数据读取速度
