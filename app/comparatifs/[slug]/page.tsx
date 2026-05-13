import { notFound } from 'next/navigation'
import { getAllPages, getPageBySlug, CATEGORIES } from '@/lib/content'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const pages = getAllPages()
  return pages.map(page => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPageBySlug(params.slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.excerpt || page.title,
  }
}

export default function ComparatifPage({ params }: Props) {
  const page = getPageBySlug(params.slug)
  if (!page) notFound()

  const categoryInfo = CATEGORIES[page.category]
  const allPages = getAllPages().filter(p =>
    p.slug !== page.slug && p.category === page.category
  ).slice(0, 3)

  return (
    <article className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] mb-8 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-ink)] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/comparatifs" className="hover:text-[var(--color-ink)] transition-colors">Comparatifs</Link>
          <span>/</span>
          {categoryInfo && (
            <>
              <Link href={`/categorie/${page.category}`} className="hover:text-[var(--color-ink)] transition-colors">
                {categoryInfo.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[var(--color-ink)] truncate max-w-[200px]">{page.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          {categoryInfo && (
            <Link
              href={`/categorie/${page.category}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-full mb-4 hover:bg-[var(--color-accent)] hover:text-white transition-colors"
            >
              <span>{categoryInfo.emoji}</span>
              {categoryInfo.label}
            </Link>
          )}

          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-ink)] leading-tight">
            {page.title}
          </h1>
        </header>

        {/* Notice about affiliate links */}
        <div className="mb-8 p-4 bg-[var(--color-accent-soft)] rounded-xl border border-[var(--color-accent)]/20">
          <p className="text-sm text-[var(--color-accent)] leading-relaxed">
            <strong>Notre approche :</strong> Ce guide est rédigé de façon objective pour vous aider à faire le meilleur choix. Les liens vers Amazon sont fournis à titre informatif uniquement.
          </p>
        </div>

        {/* Content */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: page.content
              .replace(/^## (.*)/gm, '<h2>$1</h2>')
              .replace(/^### (.*)/gm, '<h3>$1</h3>')
              .replace(/^#### (.*)/gm, '<h4>$1</h4>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/^- (.*)/gm, '<li>$1</li>')
              .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/^(?!<[h|u|l|p])(.+)/gm, '<p>$1</p>')
          }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/comparatifs"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft size={14} />
            Retour aux comparatifs
          </Link>
        </div>
      </div>

      {/* Related */}
      {allPages.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div className="border-t border-[var(--color-border)] pt-12">
            <h2 className="font-display text-2xl text-[var(--color-ink)] mb-8">
              Guides similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allPages.map(p => (
                <Link
                  key={p.slug}
                  href={`/comparatifs/${p.slug}`}
                  className="group card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6"
                >
                  <h3 className="font-display text-base text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-3">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
