# CLAUDE.md 分层架构调整方案

> 版本: 1.0
> 创建时间: 2025-12-18
> 状态: 提案

---

## 1. 用户需求分析

### 原始需求

"主索引设置为项目级，子索引设置为全局的"

### 需求解读

| 术语 | 含义 | 定位 |
|------|------|------|
| 主索引 | CLAUDE.md（入口文件） | 项目级（每个项目独立） |
| 子索引 | docs/*.md、agents/*.md（详细文档） | 全局级（所有项目共享） |

### 核心意图

1. **项目定制化**：每个项目有自己的 CLAUDE.md，可定义项目特定的技术栈、规范、工作流
2. **全局规范共享**：通用的工具文档、代理定义、编码规范等保持全局，避免重复维护
3. **灵活引用**：项目级主索引可以选择性引用全局子文档

---

## 2. 架构对比

### 当前架构（全局主索引）

```
~/.claude/                          # 全局配置根目录
├── CLAUDE.md                       # 全局主索引（当前方案）
├── output-styles/
│   └── default-style.md            # 全局系统提示词
├── docs/                           # 全局详细文档
│   ├── agents.md                   # 子代理规范
│   ├── tools.md                    # 工具使用指南
│   ├── workflow.md                 # 工作流程详解
│   ├── coding.md                   # 编码规范
│   └── lark.md                     # 飞书集成指南
├── agents/                         # 全局角色定义
│   └── *.md (12个角色)
└── settings.json

项目目录/
└── (无项目级 CLAUDE.md)
```

**问题**：
- 所有项目使用同一份 CLAUDE.md，无法定制
- 项目特定信息需要写入全局文件，造成污染
- 切换项目时上下文不匹配

### 目标架构（项目级主索引 + 全局子索引）

```
~/.claude/                          # 全局配置根目录
├── CLAUDE.md                       # 全局默认模板（新项目复制用）
├── output-styles/
│   └── default-style.md            # 全局系统提示词（保持不变）
├── docs/                           # 全局详细文档（子索引）
│   ├── agents.md
│   ├── tools.md
│   ├── workflow.md
│   ├── coding.md
│   └── lark.md
├── agents/                         # 全局角色定义
│   └── *.md (12个角色)
└── settings.json

项目目录/
└── .claude/
    ├── CLAUDE.md                   # 项目级主索引（定制化）
    └── docs/                       # 项目级文档（可选，覆盖全局）
        └── project-specific.md     # 项目特定文档
```

---

## 3. 详细设计

### 3.1 项目级主索引结构

项目级 `CLAUDE.md` 应包含：

```markdown
# [项目名] - Claude Code 配置

> 版本: 1.0
> 项目类型: [Web/API/CLI/Library...]

## 项目概述

[一句话描述项目用途]

## 技术栈

- 主要语言：[语言及版本]
- 框架：[框架及版本]
- 数据库：[数据库类型]
- 部署：[部署方式]

## 项目结构

| 目录 | 用途 |
|------|------|
| src/ | 源代码 |
| tests/ | 测试文件 |
| docs/ | 项目文档 |

## 项目特定约束

[项目独有的规则或限制]

## 文档索引

### 全局文档（引用 ~/.claude/docs/）

| 文档 | 用途 | 路径 |
|------|------|------|
| 工具使用 | 内置工具与MCP详解 | /Users/mac/.claude/docs/tools.md |
| 代码规范 | 编码原则与风格 | /Users/mac/.claude/docs/coding.md |
| 工作流程 | 6阶段详细说明 | /Users/mac/.claude/docs/workflow.md |
| 飞书集成 | Lark-MCP使用指南 | /Users/mac/.claude/docs/lark.md |
| 子代理 | 子代理执行规范 | /Users/mac/.claude/docs/agents.md |

### 项目文档（可选）

| 文档 | 用途 | 路径 |
|------|------|------|
| 架构说明 | 系统架构设计 | [项目路径]/.claude/docs/architecture.md |
| API文档 | 接口规范 | [项目路径]/.claude/docs/api.md |
```

### 3.2 优先级规则

```
加载顺序（后加载覆盖前加载）：
1. 全局 ~/.claude/CLAUDE.md（如果项目无配置时的默认）
2. 项目级 ./.claude/CLAUDE.md（存在时完全替代全局）

文档引用优先级：
1. 项目级 ./.claude/docs/*.md（如果存在）
2. 全局 ~/.claude/docs/*.md（作为默认）
```

### 3.3 初始化流程调整

当用户执行"初始化"时：

```bash
# 步骤1：创建项目级目录
mkdir -p .claude/docs

# 步骤2：复制主索引模板
cp ~/.claude/CLAUDE.md .claude/CLAUDE.md

# 步骤3：不复制全局 docs/（保持引用关系）
# 全局文档通过绝对路径引用

# 步骤4：创建项目特定文档占位
touch .claude/docs/architecture.md
```

---

## 4. 实施步骤

### 4.1 第一阶段：准备全局模板

1. **简化全局 CLAUDE.md**：
   - 移除项目特定内容
   - 保留通用框架结构
   - 添加明确的项目信息占位符

2. **确保全局 docs/ 自包含**：
   - 每个文档独立可读
   - 使用绝对路径引用其他文档
   - 不依赖主文件上下文

### 4.2 第二阶段：创建项目模板

创建 `~/.claude/templates/project-claude.md`：

```markdown
# [PROJECT_NAME] - Claude Code 配置

> 版本: 1.0
> 创建时间: [DATE]

## 项目概述

[待填写]

## 技术栈

- 主要语言：[待识别]
- 框架：[待识别]
- 构建工具：[待识别]

## 文档索引

### 全局文档

| 文档 | 路径 |
|------|------|
| 工具使用 | /Users/mac/.claude/docs/tools.md |
| 代码规范 | /Users/mac/.claude/docs/coding.md |
| 工作流程 | /Users/mac/.claude/docs/workflow.md |
| 飞书集成 | /Users/mac/.claude/docs/lark.md |
| 子代理 | /Users/mac/.claude/docs/agents.md |

### 项目文档

| 文档 | 路径 |
|------|------|
| 架构说明 | [PROJECT_PATH]/.claude/docs/architecture.md |

---

**注意**：此文件由项目初始化自动生成，请根据项目实际情况修改。
```

### 4.3 第三阶段：更新初始化逻辑

修改 `default-style.md` 中的初始化流程：

```markdown
#### 步骤0：创建项目配置目录
mkdir -p .claude/docs

#### 步骤1：生成项目级 CLAUDE.md
# 复制模板并替换占位符
cp ~/.claude/templates/project-claude.md .claude/CLAUDE.md
# 替换 PROJECT_NAME、PROJECT_PATH、DATE 等变量

#### 步骤2：项目扫描
# 使用 Task(Explore) 分析项目
# 识别技术栈、代码风格、目录结构

#### 步骤3：更新项目信息
# 将扫描结果填入 .claude/CLAUDE.md 的对应章节

#### 步骤4：全局 docs/ 保持引用
# 不复制，使用绝对路径引用
```

---

## 5. 文件变更清单

### 需要创建

| 文件 | 用途 |
|------|------|
| `~/.claude/templates/project-claude.md` | 项目级 CLAUDE.md 模板 |

### 需要修改

| 文件 | 变更内容 |
|------|---------|
| `~/.claude/CLAUDE.md` | 简化为纯模板，移除项目特定内容 |
| `~/.claude/output-styles/default-style.md` | 更新初始化流程（4.3节） |
| `~/.claude/docs/*.md` | 确保使用绝对路径，自包含 |

### 保持不变

| 文件 | 原因 |
|------|------|
| `~/.claude/agents/*.md` | 全局角色定义，所有项目共享 |
| `~/.claude/settings.json` | 全局设置 |

---

## 6. 架构优势

### 6.1 项目定制化

| 优势 | 说明 |
|------|------|
| 技术栈适配 | 每个项目声明自己的语言、框架、工具 |
| 规范定制 | 项目可以有自己的编码规范、命名约定 |
| 上下文精准 | Claude 获得与当前项目相关的准确信息 |

### 6.2 全局规范共享

| 优势 | 说明 |
|------|------|
| 单点维护 | 更新 `~/.claude/docs/tools.md` 即生效全部项目 |
| 一致性 | 所有项目共享相同的工具使用方法、工作流程 |
| 减少冗余 | 避免每个项目重复定义相同内容 |

### 6.3 维护便利性

| 优势 | 说明 |
|------|------|
| 关注点分离 | 项目信息 vs 通用规范 清晰划分 |
| 版本控制 | 项目级配置可纳入项目仓库 |
| 迁移简单 | 新项目只需复制模板并填写 |

---

## 7. 使用场景示例

### 场景1：Next.js 项目

```
my-nextjs-app/
└── .claude/
    ├── CLAUDE.md                   # 定义：Next.js 15、TypeScript、Tailwind
    └── docs/
        └── components.md           # 项目组件规范
```

项目级 CLAUDE.md 片段：
```markdown
## 技术栈

- 框架：Next.js 15 (App Router)
- 语言：TypeScript 5.x
- 样式：Tailwind CSS 3.x
- 测试：Vitest + Playwright

## 项目约束

- 使用 next-devtools MCP 进行运行时诊断
- 组件使用 21st-dev MCP 构建
```

### 场景2：Python API 项目

```
my-fastapi-app/
└── .claude/
    ├── CLAUDE.md                   # 定义：FastAPI、Python 3.11、PostgreSQL
    └── docs/
        └── database.md             # 数据库设计文档
```

### 场景3：无配置项目

当项目目录不存在 `.claude/CLAUDE.md` 时：
- 自动使用全局 `~/.claude/CLAUDE.md`
- 行为与当前架构一致
- 保持向后兼容

---

## 8. 迁移指南

### 现有项目迁移

```bash
# 1. 进入项目目录
cd /path/to/project

# 2. 创建项目配置目录
mkdir -p .claude/docs

# 3. 复制全局模板
cp ~/.claude/CLAUDE.md .claude/CLAUDE.md

# 4. 编辑项目配置
# 填写项目特定的技术栈、规范等

# 5. 添加到 .gitignore（可选）
echo ".claude/CLAUDE.local.md" >> .gitignore
```

### 验证检查

```bash
# 确认项目级配置存在
ls -la .claude/CLAUDE.md

# 确认全局文档可访问
ls -la ~/.claude/docs/
```

---

## 9. 决策记录

| 决策 | 选择 | 理由 |
|------|------|------|
| 主索引位置 | 项目级 | 实现项目定制化 |
| 子索引位置 | 全局级 | 避免重复维护，保持一致性 |
| 引用方式 | 绝对路径 | 避免路径解析问题 |
| 兼容性 | 保持向后兼容 | 无配置时使用全局默认 |

---

## 10. 下一步建议

1. **确认方案**：审阅本文档，确认设计符合需求
2. **创建模板**：执行 `touch ~/.claude/templates/project-claude.md`
3. **简化全局**：精简 `~/.claude/CLAUDE.md` 为纯模板
4. **更新初始化**：修改 `default-style.md` 中的初始化流程
5. **测试验证**：在一个测试项目中验证新流程

---

**文档结束**
