export interface Product {
  id: string;
  name: string;
  category: 'BEVERAGES' | 'SNACKS' | 'HOUSEHOLD' | 'CLEARANCE';
  image: string;
  cashPrice: number;
  bnplPrice: number;
  retailPrice: number;
  savings: number;
  savingsPercent: number;
  unit: string;
  stock: number;
  description?: string;
  dbId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  shopName: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'bnpl';
  bnplInstallments?: number;
  pickupType: 'immediate' | 'scheduled';
  pickupLocation: string;
  pickupDate?: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  shopName: string;
  contactPerson: string;
  email: string;
  phone: string;
  creditLimit: number;
  usedCredit: number;
  membershipTier: 'standard' | 'prime' | 'platinum';
}

export interface OutletLocation {
  id: string;
  name: string;
  address: string;
  type: 'hub' | 'heartland';
  availability: 'immediate' | 'scheduled';
  leadTime?: string;
}
