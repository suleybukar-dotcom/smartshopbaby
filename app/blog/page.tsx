import Link from 'next/link'
import { getAllPosts, CATEGORIES } from '@/lib/content'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guides & Conseils pour Parents',
  description: 'Tous nos articles, guides pratiques et conseils pour les jeunes parents.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  // Group by category
  const byCategory: Record<string, typeof posts> = {}
  posts.forEach(post => {
    if (!byCategory[post.category]) byCategory[post.category] = []
    byCategory[post.category].push(post)
  })

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
          Guides & Conseils
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-4">
          Tous nos articles
        </h1>
        <p className="text-lg text-[var(--color-ink-soft)] max-w-xl">
          {posts.length} guides pratiques pour vous aider à faire les meilleurs choix pour votre bébé.
        </p>
      </div>

      {/* Posts grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group card-hover bg-white border border-[var(--color-border)] rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-0.5 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-full capitalize">
                  {CATEGORIES[post.category]?.label || post.category}
                </span>
                {post.date && (
                  <span className="text-xs text-[var(--color-ink-muted)]">
                    {new Date(post.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
              <h2 className="font-display text-base text-[var(--color-ink)] leading-snug mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-3">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-[var(--color-ink-muted)] line-clamp-2 leading-relaxed">
                  {post.excerpt.replace(/<[^>]*>/g, '')}
                </p>
              )}
              <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] transition-colors mt-4">
                Lire l'article <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
