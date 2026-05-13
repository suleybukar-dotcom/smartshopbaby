import Link from 'next/link'
import { getAllPages, CATEGORIES } from '@/lib/content'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tous les Comparatifs Produits Bébé',
  description: 'Guides d\'achat complets et comparatifs objectifs pour choisir les meilleurs produits pour votre bébé.',
}

export default function ComparatifsPage() {
  const pages = getAllPages().filter(p =>
    !['mentions-legales', 'a-propos', 'portfolio-redaction-seo-articles-comparatifs', 'behind-my-content-creation-process', 'voir-nos-meilleurs-produits-bebe'].includes(p.slug)
  )

  const byCategory: Record<string, typeof pages> = {}
  pages.forEach(page => {
    if (!byCategory[page.category]) byCategory[page.category] = []
    byCategory[page.category].push(page)
  })

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">
            Guides comparatifs
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-4">
            Tous les comparatifs
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-xl">
            {pages.length} guides d'achat pour vous aider à faire les meilleurs choix — sans publicité, sans biais.
          </p>
        </div>

        {/* By category */}
        {Object.entries(byCategory).map(([cat, catPages]) => {
          const info = CATEGORIES[cat]
          return (
            <div key={cat} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{info?.emoji || '📖'}</span>
                <h2 className="font-display text-2xl text-[var(--color-ink)]">
                  {info?.label || cat}
                </h2>
                <Link
                  href={`/categorie/${cat}`}
                  className="text-xs text-[var(--color-accent)] hover:underline ml-2"
                >
                  Voir la catégorie →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {catPages.map(page => (
                  <Link
                    key={page.slug}
                    href={`/comparatifs/${page.slug}`}
                    className="group card-hover bg-white border border-[var(--color-border)] rounded-xl p-5"
                  >
                    <h3 className="font-display text-base text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors leading-snug line-clamp-3 mb-3">
                      {page.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                      Lire le guide <ArrowRight size={11} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
