import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

/**
 * 文档页面组件
 *
 * 功能特性：
 * - 自动生成目录（TOC）
 * - 面包屑导航
 * - GitHub编辑链接
 * - 最后更新时间
 * - 页脚导航（上一页/下一页）
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const MDX = page.data.body;

  // 构建GitHub编辑URL
  const githubEditUrl = `https://github.com/yourusername/saas-docs/blob/main/content/docs/${page.file.path}`;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        enabled: true,
        style: 'clerk',
      }}
      editOnGithub={{
        owner: 'yourusername',
        repo: 'saas-docs',
        sha: 'main',
        path: `content/docs/${page.file.path}`,
      }}
      lastUpdate={page.data.lastModified ?? new Date()}
      breadcrumb={{
        enabled: true,
        includePage: true,
      }}
      footer={{
        enabled: true,
      }}
    >
      <DocsBody>
        <h1>{page.data.title}</h1>
        {page.data.description && (
          <p className="text-lg text-muted-foreground mt-2 mb-8">
            {page.data.description}
          </p>
        )}
        <MDX />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
