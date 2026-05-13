import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, CATEGORIES } from '@/lib/content'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt || post.title,
  }
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const categoryInfo = CATEGORIES[post.category]
  const posts = getAllPosts()
  const related = posts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3)

  return (
    <article className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--color-ink)] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[var(--color-ink)] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-[var(--color-ink)]">{categoryInfo?.label || post.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {categoryInfo && (
              <Link
                href={`/categorie/${post.category}`}
                className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-colors"
              >
                <span>{categoryInfo.emoji}</span>
                {categoryInfo.label}
              </Link>
            )}
            {post.date && (
              <span className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
                <Calendar size={12} />
                {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-[var(--color-ink)] leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed border-l-4 border-[var(--color-accent)] pl-4 py-1">
              {post.excerpt.replace(/<[^>]*>/g, '').slice(0, 250)}
            </p>
          )}
        </header>

        {/* Content */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/^## (.*)/gm, '<h2>$1</h2>')
              .replace(/^### (.*)/gm, '<h3>$1</h3>')
              .replace(/^#### (.*)/gm, '<h4>$1</h4>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/^- (.*)/gm, '<li>$1</li>')
              .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/^(?!<[h|u|l|p])(.+)/gm, '<p>$1</p>')
          }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft size={14} />
            Retour aux guides
          </Link>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div className="border-t border-[var(--color-border)] pt-12">
            <h2 className="font-display text-2xl text-[var(--color-ink)] mb-8">
              Articles similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
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
