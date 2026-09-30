export interface WorkItem {
  id: string
  title: string
  style: string
  size: string
  location: string
  image: string
  imageAlt: string
  description: string
  details: {
    hardscape: string[]
    plants: string[]
    equipment: string[]
    duration: string
  }
}

export const worksData: WorkItem[] = [
  {
    id: 'forest-01',
    title: 'Forest 01',
    style: 'Nature Style',
    size: '60cm',
    location: 'Bandung, Private Residence',
    image: '/images/works/work-01.jpg',
    imageAlt: 'Forest 01 - Nature Style aquascape 60cm',
    description: 'Komposisi hutan miniatur dengan kayu driftwood sebagai focal point utama. Tanaman latar depan berupa carpet plants menciptakan kesan luas.',
    details: {
      hardscape: ['Malaysian Driftwood', 'Seiryu Stone', 'Lava Rock'],
      plants: ['Micranthemum monte carlo', 'Rotala rotundifolia', 'Anubias nana petite', 'Bucephalandra sp.'],
      equipment: ['ADA 60P', 'Twinstar 600SA', 'Oase BioMaster 250', 'CO2 Pressurized'],
      duration: '3 hari instalasi',
    },
  },
  {
    id: 'mountain-02',
    title: 'Mountain 02',
    style: 'Iwagumi',
    size: '90cm',
    location: 'Jakarta, Cafe',
    image: '/images/works/work-02.jpg',
    imageAlt: 'Mountain 02 - Iwagumi style aquascape 90cm',
    description: 'Tata letak batu klasik Sanzon Iwagumi dengan tiga batu utama. Carpet plants yang rapat menciptakan kesan padang rumput di kaki gunung.',
    details: {
      hardscape: ['Manten Stone (Oyaishi)', 'Manten Stone (Fukuishi)', 'Manten Stone (Soeishi)'],
      plants: ['Eleocharis acicularis', 'Hemianthus callitrichoides', 'Staurogyne repens'],
      equipment: ['ADA 90P', 'ADA Solar RGB', 'ADA Super Jet ES-600', 'CO2 Pressurized'],
      duration: '2 hari instalasi',
    },
  },
  {
    id: 'jungle-03',
    title: 'Jungle 03',
    style: 'Jungle Style',
    size: '120cm',
    location: 'Surabaya, Office Lobby',
    image: '/images/works/work-03.jpg',
    imageAlt: 'Jungle 03 - Jungle Style aquascape 120cm',
    description: 'Aquascape skala besar dengan keragaman spesies tanaman tinggi. Menciptakan kesan hutan tropis yang lebat dan alami.',
    details: {
      hardscape: ['Spider Wood', 'Dragon Stone', 'River Rocks'],
      plants: ['Hygrophila polysperma', 'Rotala vietnam', 'Limnophila sessiliflora', 'Cryptocoryne wendtii', 'Vallisneria spiralis', 'Java Fern'],
      equipment: ['Custom 120x50x50', 'Chihiros WRGB II 90', 'Eheim 2217', 'CO2 Pressurized Dual'],
      duration: '4 hari instalasi',
    },
  },
  {
    id: 'stream-04',
    title: 'Stream 04',
    style: 'Blackwater',
    size: '45cm',
    location: 'Bandung, Private Collection',
    image: '/images/works/work-04.jpg',
    imageAlt: 'Stream 04 - Blackwater style aquascape 45cm',
    description: 'Replikasi aliran sungai hutan dengan air berwarna teh dari tannin. Botanicals seperti daun ketapang dan seed pods melengkapi ekosistem.',
    details: {
      hardscape: ['Manzanita Branches', 'Palm Fronds', 'Alder Cones', 'Catappa Leaves'],
      plants: ['Cryptocoryne wendtii brown', 'Bucephalandra brownie ghost', 'Anubias barteri nana', 'Nymphaea lotus'],
      equipment: ['ADA 45P', 'Twinstar 450SA', 'Oase BioMaster 150', 'CO2 Pressurized'],
      duration: '2 hari instalasi',
    },
  },
]