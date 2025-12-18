import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const Content = (page.data as any).default || page.data;

  return (
    <DocsPage>
      <DocsBody>
        <h1>{page.data.title}</h1>
        {page.data.description && (
          <p className="text-lg text-muted-foreground mt-2 mb-8">
            {page.data.description}
          </p>
        )}
        {typeof Content === 'function' ? <Content /> : <div>{JSON.stringify(page.data)}</div>}
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
