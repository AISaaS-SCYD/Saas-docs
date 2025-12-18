import { docs, meta } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { createSearchAPI } from 'fumadocs-core/search/server';

/**
 * 文档源配置
 *
 * 功能特性：
 * - 自动生成页面树（支持嵌套结构）
 * - 集成搜索API
 * - 面包屑和导航支持
 */
export const source = loader({
  baseUrl: '/docs',
  source: toFumadocsSource(docs, meta),
  icon: (icon) => {
    // 支持自定义图标映射
    const iconMap: Record<string, string> = {
      'book': '📚',
      'code': '💻',
      'guide': '📖',
      'api': '🔌',
      'tutorial': '🎓',
    };
    return icon && iconMap[icon] ? iconMap[icon] : undefined;
  },
});

/**
 * 搜索API配置
 *
 * Fumadocs 内置全文搜索功能
 * 使用该API可以在导航栏启用搜索框
 */
export const searchAPI = createSearchAPI('advanced', {
  indexes: docs.map((page) => ({
    id: page.url,
    url: page.url,
    title: page.data?.title || 'Untitled',
    description: page.data?.description || '',
    structuredData: page.data?.structuredData,
  })),
});
