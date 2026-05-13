# SmartShopBaby — Next.js Migration

Site de référence pour les parents. Migré depuis WordPress vers Next.js 14 + Tailwind CSS.

## Stack technique

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **Contenu** : MDX (généré depuis l'export WordPress)
- **Déploiement** : Vercel
- **Domaine** : smartshopbaby.com

## Structure du projet

```
smartshopbaby/
├── app/
│   ├── page.tsx                    ← Homepage premium
│   ├── layout.tsx                  ← Root layout + Navigation
│   ├── blog/
│   │   ├── page.tsx               ← Liste tous les articles
│   │   └── [slug]/page.tsx        ← Article dynamique
│   ├── comparatifs/
│   │   ├── page.tsx               ← Liste tous les comparatifs
│   │   └── [slug]/page.tsx        ← Comparatif dynamique
│   ├── categorie/
│   │   └── [slug]/page.tsx        ← Page catégorie
│   ├── sitemap.ts                 ← Sitemap SEO auto-généré
│   └── robots.ts
├── components/
│   ├── Navigation.tsx             ← Nav sticky avec dropdown
│   └── Footer.tsx
├── lib/
│   └── content.ts                 ← Utilitaires lecture MDX
├── content/
│   ├── posts/                     ← 56 articles en MDX
│   └── pages/                     ← 33 pages comparatives en MDX
├── styles/
│   └── globals.css                ← Design tokens + styles globaux
└── public/images/
```

## Contenu migré

- **56 articles** de blog (guides, conseils)
- **33 pages** comparatives
- **15 liens affiliés** Amazon nettoyés (tracking supprimé)
- **8 catégories** : siège auto, poussette, chaise haute, biberon, lit bébé, couches, guides, cadeaux

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement sur Vercel

```bash
# 1. Push sur GitHub
git init
git add .
git commit -m "feat: initial migration from WordPress"
git remote add origin https://github.com/TON_USERNAME/smartshopbaby.git
git push -u origin main

# 2. Déployer sur Vercel
# → Aller sur vercel.com → Import Git Repository
# → Sélectionner le repo → Deploy
# → Connecter le domaine smartshopbaby.com dans Settings > Domains
```

## Configuration DNS pour smartshopbaby.com

Dans le panneau DNS de ton registrar (LWS) :

| Type | Nom | Valeur                        |
|------|-----|-------------------------------|
| A    | @   | 76.76.21.21 (Vercel IP)       |
| CNAME | www | cname.vercel-dns.com          |

## SEO preservé

- Tous les slugs originaux sont conservés
- Redirections 301 configurées dans `next.config.js`
- Sitemap auto-généré à `/sitemap.xml`
- Robots.txt à `/robots.txt`
- Métadonnées optimisées par page

## Liens affiliés

- Tous les `?tag=souleiman9802-21` ont été supprimés du contenu
- Les liens Amazon propres sont conservés (`/dp/ASIN` uniquement)
- Mention en pied de page + bannière info sur les pages comparatives
"# smartshopbaby"  
