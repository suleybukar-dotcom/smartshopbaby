import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🍼</span>
              <span className="font-display text-lg">SmartShopBaby</span>
            </div>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
              Le guide de référence pour les parents qui veulent le meilleur pour leur bébé.
            </p>
          </div>

          {/* Comparatifs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">
              Comparatifs
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Sièges auto', href: '/categorie/siege-auto' },
                { label: 'Poussettes', href: '/categorie/poussette' },
                { label: 'Chaises hautes', href: '/categorie/chaise-haute' },
                { label: 'Biberons', href: '/categorie/biberon' },
                { label: 'Lits bébé', href: '/categorie/lit-bebe' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">
              Guides
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Tous les guides', href: '/blog' },
                { label: 'Sécurité bébé', href: '/categorie/siege-auto' },
                { label: 'Sommeil bébé', href: '/categorie/lit-bebe' },
                { label: 'Alimentation', href: '/categorie/biberon' },
                { label: 'Baby shower', href: '/categorie/cadeaux' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">
              À propos
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Notre approche', href: '/comparatifs/a-propos' },
                { label: 'Mentions légales', href: '/comparatifs/mentions-legales' },
              ].map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-ink-muted)]">
            © {new Date().getFullYear()} SmartShopBaby — Tous droits réservés
          </p>
          <p className="text-xs text-[var(--color-ink-muted)]">
            Les liens vers Amazon sont fournis à titre informatif. Nous pouvons recevoir une commission.
          </p>
        </div>
      </div>
    </footer>
  )
}
