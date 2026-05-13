'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  {
    label: 'Comparatifs',
    href: '/comparatifs',
    children: [
      { label: '🚗 Sièges auto', href: '/categorie/siege-auto' },
      { label: '🛒 Poussettes', href: '/categorie/poussette' },
      { label: '🪑 Chaises hautes', href: '/categorie/chaise-haute' },
      { label: '🍼 Biberons', href: '/categorie/biberon' },
      { label: '🛏️ Lits bébé', href: '/categorie/lit-bebe' },
    ],
  },
  { label: 'Guides', href: '/blog' },
  { label: 'À propos', href: '/comparatifs/a-propos' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl" aria-hidden="true">🍼</span>
          <span
            className="font-display text-lg font-normal tracking-tight text-[var(--color-ink)]"
          >
            SmartShopBaby
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors rounded-lg hover:bg-[var(--color-surface)]"
              >
                {link.label}
                {link.children && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                  />
                )}
              </Link>

              {link.children && activeDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden min-w-[200px] py-1">
                  {link.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/comparatifs"
            className="px-4 py-2 text-sm font-medium bg-[var(--color-ink)] text-white rounded-full hover:bg-[var(--color-ink-soft)] transition-colors"
          >
            Voir tous les guides
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-[var(--color-ink)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)] px-6 py-4 space-y-2">
          {navLinks.map(link => (
            <div key={link.label}>
              <Link
                href={link.href}
                className="block py-2 text-sm font-medium text-[var(--color-ink-soft)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4 space-y-1">
                  {link.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-1.5 text-sm text-[var(--color-ink-muted)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
