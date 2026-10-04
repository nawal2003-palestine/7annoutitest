export type ScreenId =
  // Public (7)
  | 'public-landing'
  | 'public-about'
  | 'public-how-it-works'
  | 'public-become-merchant'
  | 'public-become-courier'
  | 'public-contact-faq'
  | 'public-legal'
  // Client (17)
  | 'client-login'
  | 'client-register'
  | 'client-forgot-password'
  | 'client-home'
  | 'client-store'
  | 'client-product'
  | 'client-cart'
  | 'client-checkout'
  | 'client-tracking'
  | 'client-order-detail'
  | 'client-order-history'
  | 'client-issue'
  | 'client-favorites'
  | 'client-profile'
  | 'client-addresses'
  | 'client-notifications'
  | 'client-security'
  | 'client-order-review'
  // Commerçant (14)
  | 'merchant-auth'
  | 'merchant-forgot'
  | 'merchant-dashboard'
  | 'merchant-analytics'
  | 'merchant-products'
  | 'merchant-stock'
  | 'merchant-orders'
  | 'merchant-order-detail'
  | 'merchant-karna'
  | 'merchant-delivery-zone'
  | 'merchant-store-profile'
  | 'merchant-reviews'
  | 'merchant-team'
  | 'merchant-security'
  // Livreur (10)
  | 'courier-auth'
  | 'courier-forgot'
  | 'courier-available'
  | 'courier-mission-detail'
  | 'courier-active-delivery'
  | 'courier-confirm'
  | 'courier-issue'
  | 'courier-earnings'
  | 'courier-profile'
  | 'courier-security'
  // Admin (15)
  | 'admin-auth'
  | 'admin-stores'
  | 'admin-merchant-detail'
  | 'admin-couriers'
  | 'admin-courier-detail'
  | 'admin-users'
  | 'admin-client-detail'
  | 'admin-orders'
  | 'admin-support'
  | 'admin-stats'
  | 'admin-reviews'
  | 'admin-roles'
  | 'admin-zones'
  | 'admin-audit'
  | 'admin-security'
  // Système (4)
  | 'system-404'
  | 'system-403'
  | 'system-suspended'
  | 'system-500';

export type UserRole = 'public' | 'client' | 'merchant' | 'courier' | 'admin';

export interface ProductVariant {
  id: string;
  label: string;
  price: number; // in DH
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  nameAr?: string;
  category: 'epicerie' | 'boissons' | 'frais' | 'boulangerie' | 'hygiene' | 'epices';
  description: string;
  price: number; // in DH
  unit: string;
  stock: number;
  reservedStock: number;
  lowStockThreshold: number;
  imageTag: string; // descriptive icon or banner
  variants?: ProductVariant[];
  isPopular?: boolean;
  isActive: boolean;
  isDeactivatedByAdmin?: boolean;
  deactivationReason?: string;
  deactivatedAt?: string;
  physicalStock?: number;
  availableStock?: number;
}

export interface Store {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
  rating: number;
  reviewsCount: number;
  openingHours: string;
  isOpen: boolean;
  deliveryTimeMinutes: number;
  minOrderDh: number;
  deliveryFeeDh: number;
  freeDeliveryThresholdDh: number;
  deliveryRadiusKm: number;
  hasKarna: boolean;
  bannerNote: string;
  lat: number;
  lng: number;
}

export interface CartItem {
  product: Product;
  variantId?: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  variantLabel?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  storeId: string;
  storeName: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  addressLabel: string;
  customerNote?: string;
  items: OrderItem[];
  subtotalDh: number;
  deliveryFeeDh: number;
  totalDh: number;
  paymentMethod: 'cod' | 'karna'; // Cash on Delivery or Carnet de crédit Karna
  status: OrderStatus;
  courierName?: string;
  courierPhone?: string;
  courierType?: 'pro' | 'employee' | 'concierge';
  etaMinutes: number;
  driverLat?: number;
  driverLng?: number;
  city?: string;
  neighborhood?: string;
  orderOrigin?: 'catalog' | 'text_list' | 'photo_list';
  originalText?: string;
  photoUrl?: string;
  alertFlag?: {
    type: 'delay' | 'address' | 'breakdown' | 'karna_limit' | 'unassigned';
    message: string;
    severity: 'warning' | 'critical';
  };
  timeline?: {
    stage: string;
    timestamp: string;
    done: boolean;
    description?: string;
  }[];
}

export interface KarnaEntry {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  currentDebtDh: number;
  creditLimitDh: number;
  lastPaymentDate: string;
  lastOrderDate: string;
  status: 'good' | 'warning' | 'blocked';
  history: {
    id: string;
    date: string;
    description: string;
    amountDh: number; // positive for new debt, negative for settlement
    balanceAfterDh: number;
    receiptRef?: string;
  }[];
}

export interface CourierMission {
  id: string;
  orderId: string;
  orderNumber: string;
  storeName: string;
  storeAddress: string;
  customerName: string;
  customerAddress: string;
  distanceKm: number;
  estimatedFeeDh: number;
  amountToCollectDh: number;
  status: 'available' | 'accepted' | 'picked_up' | 'delivered';
  customerNote?: string;
}

export interface Review {
  id: string;
  storeId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
  isMaskedByAdmin?: boolean;
  maskReason?: string;
  maskedAt?: string;
}

export interface ScreenMeta {
  id: ScreenId;
  title: string;
  role: 'public' | 'client' | 'merchant' | 'courier' | 'admin' | 'system';
  badge: string;
  description: string;
}

export type OrderCreationMethod = 'catalog' | 'text' | 'photo';

export interface DetectedOrderItem {
  id: string;
  originalText: string;
  matchedProduct?: Product;
  confidence: 'high' | 'medium' | 'low';
  quantity: number;
  suggestions?: Product[];
}

export * from './admin';
