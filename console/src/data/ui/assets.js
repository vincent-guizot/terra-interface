// Asset registry. Paths point into /public/images. Files that do not exist yet
// fall back to a placeholder (see components/terra/AssetImage.jsx), so real
// artwork can be dropped in later without touching any page code.
export const ASSETS = {
  brand: {
    logo: '/images/brand/logo-leaf.svg',
    leafCorner: '/images/brand/leaf-corner.svg',
  },
  user: { avatar: '/images/user/vincent.jpg' },
  mascot: { terraAi: '/images/mascot/terra-ai.png' },
  hero: {
    farm3d: '/images/farm-master-plan.jpg',
    activities: '/images/hero/activities.png',
    resources: '/images/hero/resources.png',
    intelligence: '/images/hero/intelligence.png',
  },
  products: {
    telur: { src: '/images/products/telur.png', emoji: '🥚' },
    dagingAyam: { src: '/images/products/daging-ayam.png', emoji: '🍗' },
    sayuran: { src: '/images/products/sayuran.png', emoji: '🥬' },
    ikan: { src: '/images/products/ikan.png', emoji: '🐟' },
    jamur: { src: '/images/products/jamur.png', emoji: '🍄' },
    buah: { src: '/images/products/buah.png', emoji: '🍈' },
    kompos: { src: '/images/products/kompos.png', emoji: '🌱' },
    selada: { src: '/images/products/selada.png', emoji: '🥬' },
    jambu: { src: '/images/products/jambu.png', emoji: '🍈' },
  },
};

export default ASSETS;
