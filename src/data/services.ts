export interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  features: string[]
  image?: string
  imageAlt?: string
}

export const servicesData: ServiceItem[] = [
  {
    id: 'custom-aquascape',
    number: '01',
    title: 'Custom Aquascape',
    description: 'Desain aquascape penuh custom sesuai ruang, gaya, dan preferensi Anda. Dari konsep hingga eksekusi, setiap detail dipertimbangkan untuk menciptakan ekosistem yang seimbang dan estetis.',
    features: [
      'Konsultasi desain gratis',
      'Pemilihan hardscape premium',
      'Tanaman aquatic berkualitas',
      'Garansi 6 bulan ekosistem',
    ],
    image: '/images/services/custom-aquascape.jpg',
    imageAlt: 'Custom aquascape design process',
  },
  {
    id: 'aquarium-setup',
    number: '02',
    title: 'Aquarium Setup',
    description: 'Setup aquarium lengkap termasuk peralatan, substrat, pencahayaan, filtrasi, dan CO2 system. Kami memastikan parameter air optimal sebelum penempatan biota.',
    features: [
      'Peralatan berkualitas tinggi',
      'Setup sistem CO2 pressurized',
      'Pencahayaan spektrum tanaman',
      'Filtrasi efisien & senyap',
    ],
    image: '/images/services/aquarium-setup.jpg',
    imageAlt: 'Professional aquarium setup with equipment',
  },
  {
    id: 'maintenance',
    number: '03',
    title: 'Maintenance',
    description: 'Perawatan berkala untuk menjaga kesehatan ekosistem dan estetika aquascape. Termasuk pemotongan tanaman, pengujian air, pembersihan, dan dosing nutrisi.',
    features: [
      'Jadwal fleksibel (mingguan/bulanan)',
      'Pengujian parameter air lengkap',
      'Trimming & replanting tanaman',
      'Laporan kondisi berkala',
    ],
    image: '/images/services/maintenance.jpg',
    imageAlt: 'Aquascape maintenance service',
  },
  {
    id: 'aquatic-plants',
    number: '04',
    title: 'Aquatic Plants',
    description: 'Menyediakan berbagai spesies tanaman aquatic berkualitas tinggi: foreground, midground, background, epiphyte, dan floating plants. Semua tanaman bebas alga dan siap tanam.',
    features: [
      'Koleksi 50+ spesies',
      'Tanaman tissue culture',
      'Bebas alga & hama',
      'Pengiriman aman ke seluruh Indonesia',
    ],
    image: '/images/services/aquatic-plants.jpg',
    imageAlt: 'Aquatic plants collection',
  },
]