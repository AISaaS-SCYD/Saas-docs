# 高级工具使用说明
> 来源：CLAUDE.md v3.0
> 用途：区分 Skill 和 MCP 的使用场景

**主索引**：~/.claude/CLAUDE.md

---

## Sequential Thinking（链式推理）

### Sequential Thinking Skill（推荐）

**用途**：复杂问题分解与多步推理

**使用方式**：
```
Skill(skill: "sequential-thinking")
```

**特点**：
- 无需安装外部依赖
- 轻量级推理框架
- 适合中等复杂度问题

**适用场景**：
- 多步骤任务规划
- 不确定性问题分析
- 方案对比与选择

### Sequential Thinking MCP（可选扩展）

**用途**：复杂任务的链式推理、反思、假设验证

**使用方式**：
```
mcp__sequential-thinking__sequentialthinking
```

**特点**：
- 需要安装 sequential-thinking MCP 服务
- 支持修订、分支、回溯
- 允许假设生成与验证
- 最多 6-10 步推理

**适用场景**：
- 极复杂的多步重构
- 需要多次假设验证的问题
- 大型架构决策

**安装方法**：
```bash
# 在 claude_desktop_config.json 中添加
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

---

## Repomix（代码库打包分析）

### Repomix Skill（推荐）

**用途**：打包代码库为单个AI友好文件

**使用方式**：
```
Skill(skill: "repomix")
```

**特点**：
- 无需安装外部依赖
- 快速代码库打包
- 支持多种输出格式（XML、Markdown、plain text）

**适用场景**：
- 代码库审查
- 文档生成
- Bug调查

### Repomix MCP（可选扩展）

**用途**：增强版代码库分析，支持远程仓库和压缩

**使用方式**：
```
mcp__repomix__pack_codebase
mcp__repomix__pack_remote_repository
```

**特点**：
- 需要安装 repomix MCP 服务
- 支持远程仓库打包
- 支持压缩以节省 token
- 支持自定义过滤规则

**适用场景**：
- 大型代码库分析
- 第三方库评估
- 安全审计

**安装方法**：
```bash
# 在 claude_desktop_config.json 中添加
{
  "mcpServers": {
    "repomix": {
      "command": "npx",
      "args": ["-y", "@repomix/mcp-server"]
    }
  }
}
```

---

## 使用决策树

### 何时使用 Skill？

- 标准场景，无需额外功能
- 追求快速响应
- 不想安装外部依赖

### 何时使用 MCP？

- 需要高级功能（如远程仓库、假设验证）
- 项目已配置对应 MCP 服务
- 需要与其他 MCP 服务集成

---

## 统一引用规范

在文档中提及这些工具时，使用以下格式：

- **sequential-thinking Skill**：指内置 Skill 技能
- **sequential-thinking MCP**：指可选安装的 MCP 服务
- **repomix Skill**：指内置 Skill 技能
- **repomix MCP**：指可选安装的 MCP 服务

避免混淆的错误引用：
- ❌ "sequential-thinking 工具"（不明确是 Skill 还是 MCP）
- ❌ "repomix"（不明确是 Skill 还是 MCP）
- ✅ "sequential-thinking Skill"
- ✅ "repomix MCP"
