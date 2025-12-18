import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { Metadata } from 'next';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';
import { BookOpen, Code, Rocket } from 'lucide-react';

/**
 * 元数据配置：优化SEO和社交分享
 */
export const metadata: Metadata = {
  title: {
    default: 'Documentation',
    template: '%s | SaaS Docs',
  },
  description: 'Comprehensive documentation and guides for SaaS platform',
  openGraph: {
    type: 'website',
    title: 'SaaS Documentation',
    description: 'Comprehensive documentation and guides for SaaS platform',
  },
};

/**
 * 文档布局配置
 *
 * 功能特性：
 * - 嵌套侧边栏导航（支持多层级）
 * - 面包屑导航
 * - 搜索功能（Fumadocs内置）
 * - 目录导航（TOC）
 * - GitHub编辑链接
 * - 移动端响应式
 * - 平滑过渡动画
 * - 底部链接配置
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <div className="flex items-center gap-2 font-semibold">
            <BookOpen className="size-5" />
            <span>SaaS Docs</span>
          </div>
        ),
        transparentMode: 'top',
        enabled: true,
        children: (
          <RootToggle
            options={[
              {
                title: 'Documentation',
                description: 'User guides and tutorials',
                icon: <BookOpen className="size-5" />,
                url: '/docs',
              },
              {
                title: 'API Reference',
                description: 'Complete API documentation',
                icon: <Code className="size-5" />,
                url: '/docs/api',
              },
              {
                title: 'Quick Start',
                description: 'Get started in minutes',
                icon: <Rocket className="size-5" />,
                url: '/docs/getting-started',
              },
            ]}
          />
        ),
      }}
      i18n={false}
      sidebar={{
        enabled: true,
        collapsible: true,
        defaultOpenLevel: 1,
        banner: (
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-3 mb-4">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Documentation v1.0
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Updated for latest release
            </p>
          </div>
        ),
      }}
      containerProps={{
        className: 'transition-all duration-300 ease-in-out',
      }}
      links={[
        {
          text: 'Documentation',
          url: '/docs',
          active: 'nested-url',
        },
        {
          text: 'Blog',
          url: '/blog',
        },
        {
          text: 'Community',
          url: 'https://github.com/yourusername/saas-docs/discussions',
          external: true,
        },
      ]}
    >
      {/* 面包屑导航自动启用 */}
      {/* TOC（目录）自动启用 */}
      {/* 搜索功能通过 Fumadocs 自动集成 */}
      {children}
    </DocsLayout>
  );
}
