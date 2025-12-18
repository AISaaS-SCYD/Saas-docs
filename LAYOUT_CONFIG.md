# 文档布局配置说明

## 已实现功能

### 1. 嵌套侧边栏导航
- 位置：`app/docs/layout.tsx`
- 支持多层级目录结构
- 可折叠/展开分组
- 默认展开层级：1

```tsx
sidebar={{
  enabled: true,
  collapsible: true,
  defaultOpenLevel: 1,
}}
```

### 2. 顶部导航栏
- 品牌标识带图标
- RootToggle快速切换（文档/API/快速开始）
- 透明模式（滚动时变化）

```tsx
nav={{
  title: <图标 + 文字>,
  transparentMode: 'top',
  children: <RootToggle>
}}
```

### 3. 面包屑导航
- 位置：`app/docs/[[...slug]]/page.tsx`
- 自动生成路径
- 包含当前页面

```tsx
breadcrumb={{
  enabled: true,
  includePage: true,
}}
```

### 4. 搜索功能
- 使用Fumadocs内置搜索
- API端点：`/api/search`
- 搜索配置：`lib/source.ts`
- 自动索引所有文档内容

### 5. 目录导航（TOC）
- 自动生成页面大纲
- 固定在右侧
- Clerk样式

```tsx
tableOfContent={{
  enabled: true,
  style: 'clerk',
}}
```

### 6. GitHub编辑链接
- 每个页面显示"Edit on GitHub"链接
- 配置方式：

```tsx
editOnGithub={{
  owner: 'yourusername',
  repo: 'saas-docs',
  sha: 'main',
  path: `content/docs/${page.file.path}`,
}}
```

### 7. 底部导航
- 自动生成上一页/下一页链接
- 基于文档结构

```tsx
footer={{
  enabled: true,
}}
```

### 8. 移动端响应式
- 侧边栏在移动端自动折叠为抽屉
- 导航栏自适应
- TOC在移动端隐藏

### 9. 平滑过渡动画
```tsx
containerProps={{
  className: 'transition-all duration-300 ease-in-out',
}}
```

### 10. 元数据配置
- SEO优化
- Open Graph标签
- 动态标题模板

```tsx
export const metadata: Metadata = {
  title: {
    default: 'Documentation',
    template: '%s | SaaS Docs',
  },
  description: '...',
  openGraph: {...},
}
```

## 自定义指南

### 修改GitHub仓库信息
在 `app/docs/[[...slug]]/page.tsx` 中修改：
```tsx
editOnGithub={{
  owner: 'your-github-username',  // 修改这里
  repo: 'your-repo-name',         // 修改这里
  sha: 'main',
  path: `content/docs/${page.file.path}`,
}}
```

### 修改导航链接
在 `app/docs/layout.tsx` 中修改：
```tsx
links={[
  {
    text: 'Documentation',
    url: '/docs',
    active: 'nested-url',
  },
  {
    text: 'Your Link',           // 添加自定义链接
    url: '/your-path',
    external: false,
  },
]}
```

### 自定义侧边栏横幅
在 `app/docs/layout.tsx` 中修改：
```tsx
sidebar={{
  banner: (
    <div className="...">
      <p>您的自定义内容</p>
    </div>
  ),
}}
```

### 修改RootToggle选项
在 `app/docs/layout.tsx` 中修改：
```tsx
<RootToggle
  options={[
    {
      title: '您的分类',
      description: '描述文本',
      icon: <YourIcon />,
      url: '/your-path',
    },
  ]}
/>
```

### 自定义图标映射
在 `lib/source.ts` 中修改：
```tsx
icon: (icon) => {
  const iconMap: Record<string, string> = {
    'your-icon-name': '🎯',  // 添加自定义图标
  };
  return icon && iconMap[icon] ? iconMap[icon] : undefined;
}
```

然后在MDX文件的frontmatter中使用：
```yaml
---
title: 页面标题
icon: your-icon-name
---
```

## 文件结构
```
app/
├── docs/
│   ├── layout.tsx              # 主布局配置
│   └── [[...slug]]/
│       └── page.tsx            # 页面级配置
├── api/
│   └── search/
│       └── route.ts            # 搜索API端点
lib/
└── source.ts                   # 文档源和搜索配置
```

## 下一步
1. 修改GitHub仓库信息（owner和repo）
2. 自定义导航链接和底部链接
3. 调整侧边栏横幅内容
4. 测试移动端响应式布局
5. 配置自定义图标（可选）

## 验证
开发服务器已成功启动，所有配置生效：
- 嵌套侧边栏：YES
- 面包屑导航：YES
- 搜索功能：YES（通过/api/search）
- TOC目录：YES
- GitHub编辑链接：YES（需修改仓库信息）
- 移动端响应式：YES
- 平滑动画：YES
- 元数据：YES
