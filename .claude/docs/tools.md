# 工具使用指南
> 来源：CLAUDE.md v2.0
> 用途：内置工具与MCP服务详解

**主索引**：~/.claude/CLAUDE.md

---

## 2. 工具能力总览

### 2.1 内置工具（Claude Code 官方最佳实践对齐）

| 工具                | 作用                                                | 启用/审批要点                                                                                                                               | 参考  |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Bash/Shell          | 在本地环境执行命令，含 Git/gh 等常用 CLI           | 默认保守；用"Always allow"、`/permissions`、`.claude/settings.json` 或 `--allowedTools` 放行                                                | [CC]  |
| Read/Edit/Write     | 读取/编辑/写入项目文件                              | 小步改动、可回滚；建议优先结构化、可审计的变更；配合 Git diff 审视                                                                        | [CC]  |
| Grep/Glob           | 精确检索（Grep）与范围定位（Glob）                  | 高效搜索文件名模式与内容；优先目标查询而非广泛扫描                                                                                         |       |
| Git/gh              | 版本管理与 GitHub 交互（PR/Issue/Review 等）       | 官方建议安装 gh 以增强能力；避免直接 push main；PR/Issue 工作流由 gh 驱动                                                                 | [CC]  |
| Task                | 启动子代理处理复杂多步任务                          | 支持 general-purpose、Explore、Plan、claude-code-guide 等子代理类型；可后台运行                                                            | [CC]  |
| TaskOutput          | 获取后台任务或子代理的输出                          | 支持阻塞/非阻塞模式                                                                                                                         |       |
| TodoWrite           | 任务管理与进度跟踪                                  | 复杂任务必须使用；实时更新状态；同时只能有一个 in_progress 任务                                                                            | [CC]  |
| WebFetch/WebSearch  | 获取网页内容/网络搜索                               | WebFetch 用于分析特定 URL；WebSearch 用于获取最新信息                                                                                       |       |
| NotebookEdit        | 编辑 Jupyter Notebook 单元格                        | 支持替换/插入/删除操作                                                                                                                      |       |
| AskUserQuestion     | 向用户提问获取澄清或决策                            | 支持多选项、多问题；不严格需要时基于假设继续                                                                                                |       |
| EnterPlanMode       | 进入计划模式进行方案设计                            | 非简单任务建议使用                                                                                                                          |       |
| Skill               | 执行专业领域技能模块                                | 覆盖开发、设计、测试、安全、提示词工程等；使用 Skill 工具调用；详见第 2.5 节                                             | [CC]  |
| 斜杠命令            | `.claude/commands` 自定义命令模板（`/` 菜单）       | 固化重复工作流；减少 prompt 噪声                                                                                                            | [CC]  |
| CLAUDE.md           | 会话自动拉取的上下文配置/手册                       | 多级：根/父/子/全局(`~/.claude/CLAUDE.md`)；可用 `#` 直接把指令写入；`CLAUDE.local.md` 可 gitignore                                         | [CC]  |

### 2.2 外部工具（MCP）

通过 `mcpServers` 接入。官方建议：MCP 问题使用 `--mcp-debug` 诊断；在项目或全局配置中声明；也可通过 `.mcp.json` 共享给团队。

**当前已启用**:

| 类别       | MCP 服务器    | 关键能力                                                                                           | 使用要点                                                                                                          |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **核心工具** | memory       | 知识图谱持久化（实体/关系/观察 CRUD）                                                             | 跨会话保留；原子化存储（每个观察一个事实）                                                                         |
| **Next.js** | next-devtools | Next.js 开发工具（browser_eval/Playwright、nextjs_docs、nextjs_index/call、upgrade_nextjs_16、enable_cache_components） | Next.js 项目必用；浏览器自动化测试；页面验证优先用 browser_eval；文档查询与运行时诊断                             |
| **UI 组件** | 21st-dev     | 21st.dev UI 组件（magic_component_builder/inspiration/refiner、logo_search）                       | 新建 UI 组件用 builder；优化现有组件用 refiner；获取灵感用 inspiration                                             |
| **协作**   | lark-mcp      | 飞书/Lark 集成（多维表格、文档、群聊、消息、Wiki）                                                 | 团队协作；数据管理；文档搜索与导入                                                                                 |
| **其他**   | fal           | fal 知识库搜索（SearchFal）                                                                        | 查找 fal 相关文档、代码示例、API 参考                                                                               |

**可选扩展（按需安装）**:

| 类别       | MCP 服务器        | 关键能力                                                                                           | 使用要点                                                                                                          |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **核心工具** | sequential-thinking | 链式推理/反思（sequentialthinking）                                                                | 复杂任务强制前置；允许修订/分支/回溯；支持假设生成与验证；最多 6-10 步                                             |
|            | context7          | 官方库/SDK 文档（`resolve-library-id` → `get-library-docs`）                                       | 优先权威来源；提供 topic 聚焦；默认 tokens=5000；标注库 ID/版本                                                    |
| **代码开发** | repomix          | 代码库打包分析（pack_codebase/pack_remote_repository）、技能生成                                  | 代码审查、文档生成、bug 调查；支持压缩以节省 token                                                                 |
|            | codex-mcp-server  | Codex CLI 集成（ask-codex、batch-codex、brainstorm）                                               | 代码分析与批量任务；支持 changeMode 返回结构化编辑建议                                                             |
|            | gemini-mcp-tool   | Gemini 模型集成（ask-gemini、brainstorm）                                                          | 辅助分析与创意生成；支持 sandbox 模式                                                                               |
|            | codebase          | 代码库管理                                                                                          | 代码库索引和搜索                                                                                                   |
| **UI 组件** | shadcn           | shadcn/ui 组件库（搜索、查看、获取示例、添加命令）                                                 | 需先调用 get_project_registries；获取示例用 get_item_examples_from_registries                                      |
|            | magicui           | Magic UI 组件库（动画、按钮、背景、特效等）                                                        | React UI 组件实现参考                                                                                              |
|            | motion            | Motion.dev 动画库（文档、API、示例、代码生成、优化）                                               | React/JS/Vue 动画实现；支持序列动画与语法验证                                                                       |

### 2.3 预置 Agents（角色/模型）

#### 模型选择策略

| 模型              | 定位                                                                                              | 使用场景                                           |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Opus**          | 重推理/策略/审查/架构设计                                                                          | 思考规划、复杂决策、架构设计、主代理协调            |
| **Default(Sonnet)** | 通用编码与实现                                                                                    | 常规编码与实现、标准开发任务                        |
| **Haiku**         | 高速枚举/结构化与检索/执行命令                                                                     | 文档内容结构化梳理、执行命令、快速枚举任务、文档简单操作（增删改已知内容） |

#### 路由基线

| 策略          | 说明                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| 分层协作      | 主代理（Opus）规划 → 子代理（Sonnet/Haiku）执行 → 主代理监督                                      |
| 能力分配      | 先"上下文归纳/范围收敛"，再"领域专长实现"，重要节点引入"审查/安全/测试"会签                       |

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

### 2.5 Skill 技能模块（专业领域）

按需调用。使用方法：`Skill` 工具 + skill 名称

#### 高频 Skill（优先考虑）

| 场景         | 推荐 Skill                              | 触发条件                                           |
| ------------ | --------------------------------------- | ------------------------------------------------- |
| 前端设计     | frontend-design / frontend-design-react | 创建 UI、组件设计、避免通用美学                    |
| 代码审查     | code-review-excellence                  | PR 审查、代码质量检查                              |
| 安全审查     | security-assessment                     | 安全漏洞检查、OWASP 合规                           |
| API 设计     | api-design-principles                   | 设计 REST/GraphQL API                              |
| 复杂规划     | create-plan                             | 大型功能开发、战略规划                             |
| 问题分解     | sequential-thinking                     | 多步骤问题、不确定性高的任务                       |
| 数据库设计   | postgresql-table-design                 | PostgreSQL 模式设计、性能优化                      |
| **提示词生成** | **prompt-factory**                      | 生成生产级 mega-prompt，69 个预设，多格式输出      |
| **原型提示词** | **prototype-prompt-generator**          | UI/UX 原型提示词，支持微信/iOS/Material/Ant Design |

#### 分类索引

| 类别           | Skill 列表                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| **开发指南**   | api-design-principles, backend-dev-guidelines, frontend-dev-guidelines, fastapi-templates, modern-javascript-patterns, prompt-engineering-patterns, error-handling-patterns |
| **前端设计**   | frontend-design, frontend-design-react, frontend-design-fix-vue, frontend-ui-animator, frontend-developer, internationalizing-websites |
| **UI 组件**    | shadcn-ui, magic-ui, artifacts-builder                                                                         |
| **安全质量**   | security-assessment, better-auth, code-review-excellence, debugging-strategies, idempotency-handling          |
| **测试**       | e2e-testing-patterns, github-actions-templates                                                                 |
| **数据库**     | postgres-schema-design, postgresql-table-design, sql-optimization-patterns                                     |
| **工具集成**   | codex, cli-gemini, repomix (Skill), web-fetch-integration, time-helper, motion, sequential-thinking (Skill)   |
| **Claude Code** | agent-identifier, skill-development, command-development, claude-code-analyzer                                 |
| **高级智能**   | reasoningbank-intelligence, developer-growth-analysis                                                          |
| **文档**       | docs-write, create-plan                                                                                        |
| **提示词工程** | prompt-factory, prototype-prompt-generator                                                                     |

---

## 7. MCP 使用指南

### 7.1 全局原则

| 原则         | 说明                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------- |
| 单轮工具限制 | 每轮对话合理控制 MCP 调用数量；独立时并行执行、有依赖时串行执行，并说明原因                        |
| 最小必要     | 限制查询范围（tokens/结果数/时间窗/关键词）以避免过度数据捕获                                      |
| 离线优先     | 默认使用本地工具；外部调用需要理由且必须遵守 robots/ToS/隐私                                      |
| 可追溯性     | 在响应末尾追加"工具调用简报"（工具名、输入摘要、关键参数、来源）                                   |
| 失败降级     | 失败时按优先级尝试替代服务；全部失败时提供保守的本地答案并标记不确定性                             |

### 7.2 服务选择矩阵

| 任务意图             | 主要服务             | 备用                   | 使用时机                                    |
| -------------------- | -------------------- | ---------------------- | ------------------------------------------- |
| 网页内容获取         | WebFetch             | WebSearch              | 获取网页、文档、博客文章                     |
| 符号/语义搜索        | Task(Explore)        | Grep/Glob              | 符号定位、跨文件引用分析                     |
| 持久化记忆、知识图谱 | memory               | 手动笔记               | 用户偏好、项目上下文、实体关系               |
| UI 组件              | 21st-dev             | 手动实现               | React UI 组件实现                            |
| Next.js 开发         | next-devtools        | -                      | 文档、运行时诊断、浏览器测试                 |
| 团队协作             | lark-mcp             | -                      | 飞书消息、文档、表格                         |
| fal 相关查询         | fal                  | WebFetch/WebSearch     | fal 知识库、文档、API 参考                   |

**可选扩展服务**（需要安装后才能使用）:

| 任务意图             | 主要服务             | 备用                   | 使用时机                                    |
| -------------------- | -------------------- | ---------------------- | ------------------------------------------- |
| 复杂规划、分解       | sequential-thinking MCP | 手动分解               | 可行性不确定、多步重构                       |
| 官方文档/API/框架    | context7             | WebFetch (原始 URL)    | 库用法、版本差异、配置问题                   |
| 代码库分析           | repomix              | Task(Explore)          | 代码审查、大型代码库理解、bug 调查           |
| UI 组件扩展          | shadcn → magicui     | 21st-dev               | shadcn/ui 组件、Magic UI 动画               |
| 动画实现             | motion               | 手动实现               | React/JS/Vue 动画                            |
| AI 辅助分析          | codex-mcp-server     | gemini-mcp-tool        | 代码分析、批量任务、创意生成                 |

### 7.3 知识图谱（Memory）MCP

| 要素     | 说明                                                           |
| -------- | -------------------------------------------------------------- |
| 用途     | 持久化知识图谱，跨会话记住用户偏好、项目上下文和实体关系        |
| 触发     | 用户分享个人信息、偏好、项目约定；需要回忆先前存储的信息        |
| 核心概念 | 实体（具有观察的节点）、关系（主动语态的有向连接）、观察（原子事实）|
| 常用工具 | `create_entities`、`create_relations`、`add_observations`、`search_nodes`、`read_graph` |
| 策略     | 原子化存储（每个观察一个事实）、会话开始时检索、关系使用主动语态 |

### 7.5 速率限制与安全

| 要素     | 说明                                                           |
| -------- | -------------------------------------------------------------- |
| 速率限制 | 遇到 429/限流时退避 20 秒，减少范围，必要时切换备用服务         |
| 隐私     | 不上传敏感信息；遵守 robots.txt 和 ToS                          |
| 只读网络 | 外部调用必须是只读的；不进行变更                                |

---

## 8. 工具协作与降级

| instruction                                                                                                                     | notes              |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| 写操作优先 Edit/Write 工具，保持可回滚                                                                                           | 安全可回滚         |
| 符号/语义搜索：Task(Explore) → Grep/Glob                                                                                        | 高效定位           |
| 文档检索：WebFetch/WebSearch（Web 内容）                                                                                        | 权威分层           |
| Next.js 项目：nextjs_docs 获取文档 → nextjs_index/call 获取运行时信息 → browser_eval 验证页面                                    | Next.js 专用       |
| UI 组件：21st-dev（构建/优化/灵感）                                                                                              | UI 开发           |
| 测试/E2E：本地自动化 → browser_eval/Playwright                                                                                   | 互补               |
| 知识管理：知识图谱（memory）用于持久化实体/关系/观察                                                                             | 跨会话保留         |
| 团队协作：lark-mcp（飞书消息/文档/表格）                                                                                         | 飞书集成           |
| fal 查询：fal（知识库搜索）→ WebFetch/WebSearch                                                                                  | fal 文档           |
| Skill 使用：前端设计用 frontend-design 系列、代码审查用 code-review-excellence、安全用 security-assessment                        | 专业领域           |
| **MCP 缺失替代**：MCP 服务不可用时，可通过对应 Skill 技能替代（如 sequential-thinking Skill、repomix Skill 等）                  | 可用性保障         |
| 降级策略：专用工具失败 → 通用工具替代 → Task(Explore) 深入分析 → 记录降级原因                                                    | 可用性保障         |
| 记录：所有工具调用在 `operations-log.md` 留痕（时间/主体/参数/输出摘要）                                                          | 审计与回溯         |
| 权限管理：通过"Always allow"、`/permissions`、配置文件与 `--allowedTools` 维持最小可用集合                                      | 官方建议           |

**优先级摘要:**
0. **Skill/MCP 检查**：任何任务开始前，优先匹配可用的 Skill（第 2.5 节）和 MCP 服务（第 2.2 节），优先使用对应工具辅助
1. 思考与规划：EnterPlanMode（复杂任务）
2. 代码库分析：Task(Explore) → Grep/Glob
3. 文档检索：WebFetch/WebSearch
4. 代码执行：Read → Edit → Write → Bash
5. 测试验证：本地自动化 → browser_eval/Playwright
6. UI 开发：21st-dev
7. 知识管理：知识图谱（create_entities/search_nodes/read_graph）
8. 团队协作：lark-mcp（飞书消息/文档/表格）
9. fal 查询：fal（知识库搜索）
10. **Skill 专业领域**：按场景选择（见第 2.5 节）

**可选扩展**（安装后可用）:
- 复杂推理：Sequential Thinking MCP
- 官方文档：context7 MCP
- 代码库分析：repomix MCP
- UI 组件扩展：shadcn、magicui、motion MCP
- AI 辅助：codex-mcp-server、gemini-mcp-tool MCP
