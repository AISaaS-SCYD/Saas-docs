# 项目初始化与配置同步指南

> 版本: 1.0
> 最后更新: 2025-12-18

## 1. 当前行为分析

### 1.1 现状

**❌ 问题：当前没有自动同步机制**

- 在已有内容的目录中工作时，不会自动创建或同步 `.claude` 配置
- 需要用户手动说"初始化"才会触发配置创建
- 切换到新项目时可能遗忘初始化，导致使用全局配置

### 1.2 现有初始化流程（触发条件：用户明确说"初始化"）

```bash
# 步骤0：创建目录
mkdir -p ~/.claude && mkdir -p .claude/agents/

# 步骤1：复制角色文件
cp ~/.claude/agents/*.md .claude/agents/ 2>/dev/null

# 步骤2：复制配置文件
cp ~/.claude/*.yaml .claude/ 2>/dev/null

# 步骤3：飞书多维表格记录（如果启用）
# 创建项目记录，询问项目名称
```

**问题**：
- 依赖用户手动触发
- 不会自动检测当前是否为新项目
- 已有项目切换时无自动同步

---

## 2. 建议的自动同步机制

### 2.1 方案A：智能初始化检测（已实施）

**触发时机**：每次对话开始时自动检测

**检测逻辑**：
1. 检查是否在项目目录（存在 .git、package.json、pom.xml 等）
2. 检查是否存在 `.claude/CLAUDE.md`
3. 检查是否存在跳过标记 `.claude/.skip-sync`

**自动同步内容**：
- `~/.claude/docs` --> `./.claude/docs`（增量）
- `~/.claude/agents/` --> `./.claude/agents/`（增量）
- `~/.claude/CLAUDE.md` --> `./.claude/CLAUDE.md`（不覆盖）
- `~/.claude/*.yaml` --> `./.claude/*.yaml`（增量）

**增量规则**：
- 只复制不存在的文件
- 不覆盖已存在的项目级配置
- 项目级配置优先于全局配置

**执行命令示例**：
```bash
# 步骤1：创建目录结构
mkdir -p .claude/docs .claude/agents

# 步骤2：增量同步文档
for file in ~/.claude/docs/*.md; do
    filename=$(basename "$file")
    [ ! -f ".claude/docs/$filename" ] && cp "$file" ".claude/docs/$filename"
done

# 步骤3：增量同步角色
for file in ~/.claude/agents/*.md; do
    filename=$(basename "$file")
    [ ! -f ".claude/agents/$filename" ] && cp "$file" ".claude/agents/$filename"
done

# 步骤4：同步主索引（不覆盖）
[ ! -f ".claude/CLAUDE.md" ] && cp ~/.claude/CLAUDE.md .claude/CLAUDE.md

# 步骤5：增量同步配置文件
for file in ~/.claude/*.yaml; do
    filename=$(basename "$file")
    [ ! -f ".claude/$filename" ] && cp "$file" ".claude/$filename"
done

# 步骤6：创建同步标记
echo "$(date)" > .claude/.synced
```

**跳过同步**：
创建 `.claude/.skip-sync` 标记文件，系统将不再自动同步。

**手动触发**：
用户说"初始化项目"或"/init"可强制重新同步。

---

### 2.2 方案B：工作目录变更时自动同步

**触发时机**：检测到工作目录变更

**实现方式**：
```bash
# Claude Code CLI 内置hook
# 当 `cd` 到新目录时触发

on_directory_change() {
    if [ -f ".git/config" ] && [ ! -f ".claude/CLAUDE.md" ]; then
        echo "📋 检测到项目但无配置，运行 'claude init' 初始化"
    fi
}
```

---

### 2.3 方案C：主动初始化命令

**命令**：`/init` 或 `/initialize`

**行为**：
```markdown
1. 扫描当前目录识别项目类型
2. 生成项目级 CLAUDE.md（包含检测到的技术栈）
3. 可选：创建项目级文档目录 `./.claude/docs/`
4. 可选：集成飞书多维表格记录
5. 输出初始化报告
```

---

## 3. 配置优先级规则

### 3.1 主索引（CLAUDE.md）

```
优先级（高→低）：
1. ./.claude/CLAUDE.md（项目级）
2. ~/.claude/CLAUDE.md（全局默认）
```

**如果存在项目级配置**：
- 完全替代全局 CLAUDE.md
- 全局作为后备（当项目删除配置时）

### 3.2 子索引（docs/*.md）

```
优先级（高→低）：
1. ./.claude/docs/*.md（项目级覆盖）
2. ~/.claude/docs/*.md（全局默认）
```

**如果存在项目级同名文档**：
- 覆盖全局同名文档
- 不同名文档：全局仍然有效

### 3.3 角色定义（agents/*.md）

```
优先级（高→低）：
1. ./.claude/agents/*.md（项目级定制）
2. ~/.claude/agents/*.md（全局默认）
```

**推荐做法**：
- 一般项目：直接使用全局角色定义
- 特殊项目：复制并修改需要定制的角色

---

## 4. 实施步骤

### 阶段1：文档更新（立即执行）

- [x] 创建本指南文档
- [ ] 更新 `default-style.md` 中的初始化说明
- [ ] 在 CLAUDE.md 中添加初始化检测说明
- [ ] 更新 agents.md 说明角色文件优先级

### 阶段2：模板准备

- [ ] 创建 `~/.claude/templates/project-claude.md`
- [ ] 创建 `.claude/.initialized` 标记文件说明
- [ ] 创建 `.claude/.skip-init` 标记文件说明

### 阶段3：初始化逻辑实现（需要代码修改）

**当前无法实现**（需要 Claude Code CLI 支持）：
- 自动检测项目类型
- 工作目录变更hook
- 对话开始时的自动检测

**可以实现**（通过提示词）：
- 用户说"初始化"时的流程优化
- 提醒用户在新项目中初始化
- 提供配置检查命令

---

## 5. 当前推荐做法

### 5.1 对于用户

**进入新项目时主动初始化**：
```
用户：初始化项目
或
用户：/init
```

**检查当前配置**：
```
用户：检查当前使用的是项目级还是全局配置
```

**响应示例**：
```
当前配置状态：
- 主索引：全局 ~/.claude/CLAUDE.md（未找到项目级配置）
- 建议：在项目根目录运行"初始化项目"创建项目级配置
```

### 5.2 对于 Claude（系统提示词增强）

在 `output-styles/default-style.md` 中添加：

```markdown
#### 对话开始时的配置检查

在每次对话的第一个响应中，静默检查：

1. **检测项目类型**
   - 是否存在 `.git`、`package.json`、`pom.xml` 等项目标识
   - 记录项目类型（Node.js/Java/Python等）

2. **检测配置状态**
   - 是否存在 `./.claude/CLAUDE.md`
   - 是否存在 `.claude/.skip-init` 标记

3. **智能提醒**（仅在检测到项目但无配置时）
   ```
   💡 提示：检测到 [项目类型] 项目，但未找到项目级配置。
   建议：说"初始化项目"创建定制化配置，或说"使用全局配置"跳过。
   ```

4. **避免重复**
   - 如果用户选择跳过，创建 `.claude/.skip-init`
   - 后续对话不再提醒
```

---

## 6. 未来改进建议

### 6.1 Claude Code CLI 层面

**需要添加的功能**：
1. `claude init` 命令：快速初始化项目配置
2. `claude config` 命令：查看当前使用的配置来源
3. `claude sync` 命令：同步全局更新到项目配置
4. 工作目录变更Hook：自动提醒初始化

### 6.2 配置管理

**需要的工具**：
1. 配置模板系统：根据项目类型生成不同模板
2. 配置差异对比：`claude diff global project`
3. 配置合并工具：`claude merge global project`

---

## 7. 常见问题

### Q1: 我在已有项目中，如何创建项目级配置？

**A1**: 说"初始化项目"或"/init"，系统会：
1. 创建 `./.claude/` 目录
2. 从模板生成 `CLAUDE.md`
3. 扫描项目填充技术栈信息
4. 可选：记录到飞书多维表格

### Q2: 项目级配置和全局配置有什么区别？

**A2**:
| 项目级 | 全局级 |
|--------|--------|
| 针对单个项目定制 | 所有项目共享 |
| 包含项目技术栈 | 通用规范和流程 |
| 可纳入版本控制 | 个人配置 |
| `./.claude/CLAUDE.md` | `~/.claude/CLAUDE.md` |

### Q3: 如果我不想用项目级配置怎么办？

**A3**: 说"使用全局配置"，系统会：
1. 创建 `.claude/.skip-init` 标记
2. 后续不再提醒初始化
3. 始终使用全局配置

### Q4: 切换项目后配置会自动切换吗？

**A4**:
- **当前**：不会自动切换，需要手动确认
- **未来**：计划支持自动检测和切换

### Q5: 项目级配置会覆盖全局配置的哪些部分？

**A5**:
- **主索引（CLAUDE.md）**：完全替代
- **子文档（docs/*.md）**：同名覆盖，不同名共存
- **角色（agents/*.md）**：同名覆盖，建议大部分使用全局

---

## 8. 总结

### 当前状态
- 方案A 智能初始化检测：已实施
- 自动同步机制：已启用（增量同步，不覆盖）
- 手动初始化流程：完善
- 跳过标记机制：`.claude/.skip-sync`

### 同步内容
1. `~/.claude/docs` --> `./.claude/docs`
2. `~/.claude/agents/` --> `./.claude/agents/`
3. `~/.claude/CLAUDE.md` --> `./.claude/CLAUDE.md`
4. `~/.claude/*.yaml` --> `./.claude/*.yaml`

### 操作建议
- 用户：进入新项目时会自动同步配置
- 跳过：说"不要同步"或"使用全局配置"创建跳过标记
- 强制：说"初始化项目"或"/init"强制重新同步
- 团队：将项目级配置纳入版本控制

---

**相关文档**：
- [架构调整方案](/Users/mac/.claude/docs/architecture-proposal.md)
- [飞书集成指南](/Users/mac/.claude/docs/lark.md)
- [工作流程说明](/Users/mac/.claude/docs/workflow.md)
