import { notFound } from 'next/navigation'
import { getAllPosts, getAllPages, CATEGORIES } from '@/lib/content'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = CATEGORIES[params.slug]
  if (!info) return {}
  return {
    title: `${info.label} — Comparatifs et Guides`,
    description: info.description,
  }
}

export default function CategoryPage({ params }: Props) {
  const info = CATEGORIES[params.slug]
  if (!info) notFound()

  const posts = getAllPosts().filter(p => p.category === params.slug)
  const pages = getAllPages().filter(p => p.category === params.slug)

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] mb-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <Link
            href="/comparatifs"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Tous les comparatifs
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{info.emoji}</span>
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-2">
                {info.label}
              </h1>
              <p className="text-lg text-[var(--color-ink-soft)]">{info.description}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4 text-sm text-[var(--color-ink-muted)]">
            <span>{pages.length} comparatif{pages.length > 1 ? 's' : ''}</span>
            <span>·</span>
            <span>{posts.length} guide{posts.length > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Comparatifs */}
        {pages.length > 0 && (
          <section className="mb-16">
            <h2 className="font-display text-2xl text-[var(--color-ink)] mb-6">
              Guides comparatifs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pages.map(page => (
                <Link
                  key={page.slug}
                  href={`/comparatifs/${page.slug}`}
                  className="group card-hover bg-white border border-[var(--color-border)] rounded-2xl p-6"
                >
                  <h3 className="font-display text-base text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors leading-snug mb-3 line-clamp-3">
                    {page.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                    Voir le comparatif <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Articles */}
        {posts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl text-[var(--color-ink)] mb-6">
              Articles & conseils
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6"
                >
                  {post.date && (
                    <p className="text-xs text-[var(--color-ink-muted)] mb-2">
                      {new Date(post.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  <h3 className="font-display text-base text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors leading-snug mb-2 line-clamp-3">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-xs text-[var(--color-ink-muted)] line-clamp-2 leading-relaxed">
                      {post.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] transition-colors mt-3">
                    Lire <ArrowRight size={11} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
