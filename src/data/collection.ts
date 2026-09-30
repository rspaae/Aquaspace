export interface CollectionItem {
  id: string
  slug: string
  title: string
  description: string
  style: string
  image: string
  imageAlt: string
  features: string[]
}

export const collectionData: CollectionItem[] = [
  {
    id: 'nature',
    slug: 'nature-style',
    title: 'Nature Style',
    description: 'Natural composition combining rocks, wood and aquatic plants to create a harmonious underwater landscape.',
    style: 'Nature Aquarium',
    image: '/images/collection/nature.jpg',
    imageAlt: 'Nature Style Aquascape with driftwood and aquatic plants',
    features: ['Balanced hardscape', 'Layered planting', 'Natural flow', 'Long-term stability'],
  },
  {
    id: 'iwagumi',
    slug: 'iwagumi',
    title: 'Iwagumi',
    description: 'Minimalist composition focused on stones, balance and negative space. The essence of Japanese aquascaping.',
    style: 'Iwagumi',
    image: '/images/collection/iwagumi.jpg',
    imageAlt: 'Iwagumi style aquascape with carefully placed stones',
    features: ['Stone-focused design', 'Rule of thirds', 'Carpet plants', 'Zen aesthetic'],
  },
  {
    id: 'jungle',
    slug: 'jungle-style',
    title: 'Jungle Style',
    description: 'Dense greenery inspired by tropical underwater landscapes. Wild, lush, and full of life.',
    style: 'Jungle',
    image: '/images/collection/jungle.jpg',
    imageAlt: 'Jungle Style aquascape with dense plant growth',
    features: ['Dense planting', 'Multiple species', 'Vertical layers', 'High biodiversity'],
  },
  {
    id: 'blackwater',
    slug: 'blackwater',
    title: 'Blackwater',
    description: 'A darker natural atmosphere inspired by forest streams. Tannin-rich water with unique botanical elements.',
    style: 'Blackwater',
    image: '/images/collection/blackwater.jpg',
    imageAlt: 'Blackwater aquascape with botanical elements',
    features: ['Botanical elements', 'Tannin-stained water', 'Leaf litter', 'Unique species'],
  },
]