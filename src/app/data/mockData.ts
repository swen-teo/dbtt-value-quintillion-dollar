import { Product, OutletLocation } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cola (24x330ml)',
    category: 'BEVERAGES',
    image: 'https://www.brandinginasia.com/wp-content/uploads/2018/07/BTS-Coca-Cola-KPOP-Branding-in-Asia-1.jpg',
    cashPrice: 22.50,
    bnplPrice: 23.63,
    retailPrice: 28.50,
    savings: 5.00,
    savingsPercent: 21,
    unit: '24x330ml',
    stock: 150,
    description: 'Premium quality cola in bulk packaging. Perfect for retail shops.'
  },
  {
    id: '2',
    name: 'Potato Chips Box (60x30g)',
    category: 'SNACKS',
    image: 'https://www.honestfoodtalks.com/wp-content/uploads/2022/07/bts-favorite-snacks-honey-butter-chip.jpg',
    cashPrice: 25.50,
    bnplPrice: 26.78,
    retailPrice: 26.60,
    savings: 1.10,
    savingsPercent: 4,
    unit: '60x30g',
    stock: 200,
    description: 'Popular potato chips in individual packets. High-margin product.'
  },
  {
    id: '3',
    name: 'Instant Noodles (40 packs)',
    category: 'SNACKS',
    image: 'https://scontent-sin2-1.cdninstagram.com/v/t51.82787-15/654967801_18106495501850704_535747531038733368_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzU5MTE3NTQwMTc0ODAwNzAyNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=JmfVvVqn_jQQ7kNvwFwyv4a&_nc_oc=AdqV8PaqPD-IAKSggWzAy5VchmC24C4LAVSxhXspcD3QgkcygppzjZ0E5gcdG01_kLA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-sin2-1.cdninstagram.com&_nc_gid=Tum_xrEiwh-8wTXIJfIFiA&_nc_ss=7a32e&oh=00_Afx8tBS03AE5CbPSI_D-qjJ-tYRKBLz0oNspVFH15G4dCg&oe=69C6F287',
    cashPrice: 22.00,
    bnplPrice: 23.10,
    retailPrice: 25.00,
	savings: 3.00,
    savingsPercent: 12,
    unit: '40 packs',
    stock: 300,
    description: 'Fast-moving instant noodles. Multiple flavors available.'
  },
  {
    id: '4',
    name: 'Energy Drink (24x250ml)',
    category: 'BEVERAGES',
    image: 'https://pbs.twimg.com/media/EdWt9d8XkAEtcB9.jpg:orig',
    cashPrice: 28.00,
    bnplPrice: 29.40,
    retailPrice: 32.00,
    savings: 4.00,
    savingsPercent: 13,
    unit: '24x250ml',
    stock: 100,
    description: 'Popular energy drink brand. High demand product.'
  },
  {
    id: '5',
    name: 'Laundry Detergent (6x1L)',
    category: 'HOUSEHOLD',
    image: 'https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2021/01/28/0262957e-5b08-11eb-a99a-beae699a1a1d_972x_194734.jpg',
    cashPrice: 42.00,
    bnplPrice: 44.10,
    retailPrice: 50.00,
    savings: 8.00,
    savingsPercent: 16,
    unit: '6x1L',
    stock: 80,
    description: 'Premium laundry detergent. Long-lasting formula.'
  },
  {
    id: '6',
    name: 'Cleaning Liquid (6x1L)',
    category: 'HOUSEHOLD',
    image: 'https://www.lioncorp.com.sg/wp-content/uploads/2020/05/MML-group-v2.jpg',
    cashPrice: 28.00,
    bnplPrice: 29.40,
    retailPrice: 32.00,
    savings: 4.00,
    savingsPercent: 13,
    unit: '6x1L',
    stock: 120,
    description: 'Multi-purpose cleaning solution. Popular household item.'
  }
];

export const outletLocations: OutletLocation[] = [
  {
    id: 'hub-1',
    name: 'Valu$ Central Hub & Warehouse',
    address: '123 Industrial Road, Singapore 629876',
    type: 'hub',
    availability: 'immediate'
  },
  {
    id: 'hub-2',
    name: 'Valu$ Jurong Hub Outlet',
    address: '456 Jurong West Ave 1, Singapore 640456',
    type: 'hub',
    availability: 'immediate'
  },
  {
    id: 'hl-1',
    name: 'Valu$ Ang Mo Kio',
    address: '123 Ang Mo Kio Ave 3, Singapore 560123',
    type: 'heartland',
    availability: 'scheduled',
    leadTime: '24-48 hours'
  },
  {
    id: 'hl-2',
    name: 'Valu$ Bedok',
    address: '456 Bedok North Street 1, Singapore 460456',
    type: 'heartland',
    availability: 'scheduled',
    leadTime: '24-48 hours'
  },
  {
    id: 'hl-3',
    name: 'Valu$ Clementi',
    address: '789 Clementi Ave 4, Singapore 120789',
    type: 'heartland',
    availability: 'scheduled',
    leadTime: '24-48 hours'
  },
  {
    id: 'hl-4',
    name: 'Valu$ Tampines',
    address: '321 Tampines Street 32, Singapore 520321',
    type: 'heartland',
    availability: 'scheduled',
    leadTime: '24-48 hours'
  },
  {
    id: 'hl-5',
    name: 'Valu$ Woodlands',
    address: '654 Woodlands Drive 71, Singapore 730654',
    type: 'heartland',
    availability: 'scheduled',
    leadTime: '24-48 hours'
  },
  {
    id: 'hl-6',
    name: 'Valu$ Yishun',
    address: '987 Yishun Ring Road, Singapore 760987',
    type: 'heartland',
    availability: 'scheduled',
    leadTime: '24-48 hours'
  }
];

// Mock frequently ordered products
export const frequentlyOrdered = [
  products[2], // Instant Noodles
  products[3], // Energy Drink
  products[1]  // Potato Chips
];