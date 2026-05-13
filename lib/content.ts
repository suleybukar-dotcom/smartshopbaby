import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')
const pagesDirectory = path.join(process.cwd(), 'content/pages')

export interface PostMeta {
  title: string
  slug: string
  category: string
  date: string
  excerpt: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter(f => f.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        title: data.title || '',
        slug: data.slug || slug,
        category: data.category || 'guides',
        date: data.date || '',
        excerpt: data.excerpt || '',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return posts
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) return null
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      title: data.title || '',
      slug: data.slug || slug,
      category: data.category || 'guides',
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
    }
  } catch {
    return null
  }
}

export function getAllPages(): PostMeta[] {
  if (!fs.existsSync(pagesDirectory)) return []
  const fileNames = fs.readdirSync(pagesDirectory)
  return fileNames
    .filter(f => f.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(pagesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        title: data.title || '',
        slug: data.slug || slug,
        category: data.category || 'guides',
        date: data.date || '',
        excerpt: data.excerpt || '',
      }
    })
}

export function getPageBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(pagesDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) return null
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      title: data.title || '',
      slug: data.slug || slug,
      category: data.category || 'guides',
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
    }
  } catch {
    return null
  }
}

export const CATEGORIES: Record<string, { label: string; description: string; emoji: string }> = {
  'siege-auto': {
    label: 'Siège Auto',
    description: 'Comparatifs et guides pour choisir le siège auto le plus sûr',
    emoji: '🚗',
  },
  'poussette': {
    label: 'Poussettes',
    description: 'Sélection des meilleures poussettes par usage et budget',
    emoji: '🛒',
  },
  'chaise-haute': {
    label: 'Chaise Haute',
    description: 'Guide complet pour choisir la chaise haute idéale',
    emoji: '🪑',
  },
  'biberon': {
    label: 'Biberons',
    description: 'Conseils et comparatifs pour les biberons et accessoires',
    emoji: '🍼',
  },
  'lit-bebe': {
    label: 'Lits Bébé',
    description: 'Guides pour un sommeil sûr et serein',
    emoji: '🛏️',
  },
  'couches': {
    label: 'Couches',
    description: 'Comparatif des meilleures couches pour bébé',
    emoji: '🧷',
  },
  'guides': {
    label: 'Guides Parents',
    description: 'Conseils pratiques pour les jeunes parents',
    emoji: '📖',
  },
  'cadeaux': {
    label: 'Cadeaux & Baby Shower',
    description: "Les meilleures idées cadeaux pour l'arrivée de bébé",
    emoji: '🎁',
  },
}
