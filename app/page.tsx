import Link from 'next/link'
import { getAllPosts, getAllPages, CATEGORIES } from '@/lib/content'
import { ArrowRight, Star, Shield, BookOpen } from 'lucide-react'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6)
  const pages = getAllPages().filter(p => 
    !['mentions-legales', 'a-propos', 'portfolio-redaction-seo-articles-comparatifs', 'behind-my-content-creation-process'].includes(p.slug)
  ).slice(0, 6)

  const featuredCategories = [
    'siege-auto', 'poussette', 'chaise-haute', 'biberon', 'lit-bebe', 'couches'
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background texture */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #e8f0e8 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, #f5ede0 0%, transparent 60%), #fdfcf8',
          }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-accent-soft)] rounded-full text-xs font-medium text-[var(--color-accent)] mb-8 animate-fade-up">
            <Shield size={12} />
            Guides vérifiés par des parents experts
          </div>

          <h1
            className="font-display text-5xl md:text-7xl text-[var(--color-ink)] leading-tight mb-6 animate-fade-up animate-fade-up-delay-1"
            style={{ letterSpacing: '-0.02em' }}
          >
            Le guide de référence
            <br />
            <em className="not-italic" style={{ color: 'var(--color-accent)' }}>pour les parents</em>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-ink-soft)] max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up animate-fade-up-delay-2">
            Comparatifs objectifs, conseils d'experts et guides pratiques pour choisir les meilleurs produits pour votre bébé — sans publicité agressive, sans pression.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up animate-fade-up-delay-3">
            <Link
              href="/comparatifs"
              className="flex items-center gap-2 px-6 py-3.5 bg-[var(--color-ink)] text-white rounded-full text-sm font-medium hover:bg-[var(--color-ink-soft)] transition-all hover:gap-3"
            >
              Voir tous les comparatifs
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 px-6 py-3.5 bg-white border border-[var(--color-border)] text-[var(--color-ink)] rounded-full text-sm font-medium hover:bg-[var(--color-surface)] transition-colors"
            >
              <BookOpen size={16} />
              Lire les guides
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--color-ink-muted)]">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-[var(--color-ink)]">89</span>
              <span>articles & guides</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-border)]" />
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-[var(--color-ink)]">8</span>
              <span>catégories produits</span>
            </div>
            <div className="w-px h-4 bg-[var(--color-border)]" />
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-[var(--color-ink)]">0</span>
              <span>liens affiliés cachés</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-2">
              Explorer par catégorie
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
              Tous les guides comparatifs
            </h2>
          </div>
          <Link
            href="/comparatifs"
            className="hidden md:flex items-center gap-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredCategories.map((cat, i) => {
            const info = CATEGORIES[cat]
            if (!info) return null
            return (
              <Link
                key={cat}
                href={`/categorie/${cat}`}
                className="group card-hover relative bg-white border border-[var(--color-border)] rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[var(--color-accent-soft)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <span className="text-3xl mb-3 block">{info.emoji}</span>
                  <h3 className="font-display text-lg text-[var(--color-ink)] mb-1">{info.label}</h3>
                  <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">{info.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorer <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Comparatifs */}
      <section className="bg-[var(--color-surface)] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-2">
                Nos comparatifs phares
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
                Guides d'achat détaillés
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/comparatifs/${page.slug}`}
                className="group card-hover bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{CATEGORIES[page.category]?.emoji || '📖'}</span>
                    <span className="text-xs font-medium px-2 py-0.5 bg-[var(--color-accent-soft)] text-[var(--color-accent)] rounded-full capitalize">
                      {CATEGORIES[page.category]?.label || page.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-[var(--color-ink)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors line-clamp-3">
                    {page.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] transition-colors mt-4">
                    Lire le guide <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/comparatifs"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-sm font-medium text-[var(--color-ink)] rounded-full hover:bg-white transition-colors"
            >
              Voir tous les comparatifs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-2">
              Derniers articles
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-ink)]">
              Conseils & guides pratiques
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
          >
            Tous les articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group card-hover flex flex-col"
            >
              <div className="bg-[var(--color-surface)] rounded-2xl p-6 flex-1 border border-[var(--color-border)]">
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
                <h3 className="font-display text-base text-[var(--color-ink)] leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors line-clamp-3">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-[var(--color-ink-muted)] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-1 text-xs font-medium text-[var(--color-ink-muted)] group-hover:text-[var(--color-accent)] transition-colors mt-4">
                  Lire <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-[var(--color-ink)] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Des guides écrits par des parents, pour des parents
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Chaque comparatif est rédigé avec soin, basé sur des critères objectifs. Pas de jargon marketing, pas de pression d'achat — juste des informations utiles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Analyse approfondie',
                desc: 'Chaque produit est étudié selon des critères précis : sécurité, confort, praticité, rapport qualité-prix.',
              },
              {
                icon: '✅',
                title: 'Informations vérifiées',
                desc: 'Nos guides sont basés sur des normes officielles (ECE R129, i-Size) et des retours d\'utilisation réels.',
              },
              {
                icon: '💬',
                title: 'Langage accessible',
                desc: 'Fini le jargon technique incompréhensible. Nos articles sont clairs, directs et faciles à lire.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
