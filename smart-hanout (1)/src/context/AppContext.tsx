import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  ScreenId,
  UserRole,
  Store,
  Product,
  CartItem,
  Order,
  KarnaEntry,
  CourierMission,
  Review,
  OrderStatus,
  DetectedOrderItem,
  OrderCreationMethod,
  StoreAdminRecord,
  ClientAdminRecord,
  CourierAdminRecord,
  AdminAuditLogEntry,
  AdminRoleType,
  MerchantSuspensionReason,
  ClientSuspensionReason,
  CourierSuspensionReason,
  ProductAdminDeactivationReason,
  ReviewMaskReason,
  AdminNotification,
} from '../types';
import {
  MOCK_STORES,
  MOCK_PRODUCTS,
  MOCK_ORDERS,
  MOCK_KARNA_ENTRIES,
  MOCK_COURIER_MISSIONS,
  MOCK_REVIEWS,
  SCREEN_REGISTRY,
} from '../data/mockData';
import {
  MOCK_ADMIN_STORES,
  MOCK_ADMIN_CLIENTS,
  MOCK_ADMIN_COURIERS,
  MOCK_ADMIN_AUDIT_LOGS,
  MOCK_ADMIN_NOTIFICATIONS,
} from '../data/mockAdminData';

interface AppContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (id: ScreenId) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  stores: Store[];
  selectedStore: Store;
  setSelectedStore: (store: Store) => void;
  products: Product[];
  selectedProduct: Product;
  setSelectedProduct: (prod: Product) => void;
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, qty?: number) => void;
  updateCartQty: (productId: string, variantId: string | undefined, delta: number) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  cartTotalDh: number;
  cartItemCount: number;
  orders: Order[];
  activeOrder: Order;
  setActiveOrder: (order: Order) => void;
  placeOrder: (paymentMethod: 'cod' | 'karna', note?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  karnaEntries: KarnaEntry[];
  addKarnaPayment: (karnaId: string, amountDh: number, receipt?: string) => void;
  courierMissions: CourierMission[];
  acceptMission: (missionId: string) => void;
  completeMission: (missionId: string) => void;
  reviews: Review[];
  addReview: (rating: number, comment: string) => void;
  isScreenSwitcherOpen: boolean;
  setIsScreenSwitcherOpen: (open: boolean) => void;
  // Order list & photo parsing
  orderReviewItems: DetectedOrderItem[];
  setOrderReviewItems: React.Dispatch<React.SetStateAction<DetectedOrderItem[]>>;
  orderReviewSource: 'text' | 'photo';
  originalInputText: string;
  originalPhotoPreview: string | null;
  processGroceryInput: (input: string, source: 'text' | 'photo', photoUrl?: string | null) => void;
  addReviewedItemsToCart: (items: DetectedOrderItem[]) => void;
  // Admin supervision state & actions (PDF Specifications)
  adminStores: StoreAdminRecord[];
  adminClients: ClientAdminRecord[];
  adminCouriers: CourierAdminRecord[];
  adminAuditLogs: AdminAuditLogEntry[];
  currentAdminRole: AdminRoleType;
  setCurrentAdminRole: (role: AdminRoleType) => void;
  validateStoreAdmin: (storeId: string, reason: string) => void;
  suspendStoreAdmin: (
    storeId: string,
    reason: MerchantSuspensionReason | string,
    duration: 'temporary_7d' | 'definitive',
    notes?: string
  ) => void;
  reactivateStoreAdmin: (storeId: string) => void;
  suspendClientAdmin: (
    clientId: string,
    reason: ClientSuspensionReason | string,
    duration: 'temporary_7d' | 'definitive',
    notes?: string
  ) => void;
  reactivateClientAdmin: (clientId: string) => void;
  exportClientDataAdmin: (clientId: string) => void;
  validateCourierAdmin: (courierId: string, reason: string) => void;
  suspendCourierAdmin: (
    courierId: string,
    reason: CourierSuspensionReason | string,
    notes?: string
  ) => void;
  reactivateCourierAdmin: (courierId: string) => void;
  reassignOrderCourier: (
    orderId: string,
    courierName: string,
    courierPhone: string,
    courierType?: 'pro' | 'employee' | 'concierge'
  ) => void;
  resolveOrderAlert: (orderId: string) => void;
  flagOrderAlert: (
    orderId: string,
    alert: {
      type: 'delay' | 'address' | 'breakdown' | 'karna_limit' | 'unassigned';
      message: string;
      severity: 'warning' | 'critical';
    }
  ) => void;
  cancelOrderAdmin: (orderId: string, reason: string) => void;
  selectedAdminMerchantId: string | null;
  setSelectedAdminMerchantId: (id: string | null) => void;
  selectedAdminClientId: string | null;
  setSelectedAdminClientId: (id: string | null) => void;
  selectedAdminCourierId: string | null;
  setSelectedAdminCourierId: (id: string | null) => void;
  adminNotifications: AdminNotification[];
  deactivateProductAdmin: (
    productId: string,
    storeId: string,
    reason: ProductAdminDeactivationReason | string,
    notes?: string
  ) => void;
  reactivateProductAdmin: (productId: string, storeId: string) => void;
  maskReviewAdmin: (
    reviewId: string,
    storeId: string,
    reason: ReviewMaskReason | string,
    notes?: string
  ) => void;
  unmaskReviewAdmin: (reviewId: string, storeId: string) => void;
  verifyCourierDocumentAdmin: (
    courierId: string,
    docId: string,
    isValid: boolean,
    rejectionReason?: string
  ) => void;
  dispatchAdminNotification: (
    recipientType: 'merchant' | 'client' | 'courier',
    recipientId: string,
    recipientName: string,
    title: string,
    message: string,
    reason: string
  ) => void;
  logAdminAudit: (
    action: string,
    targetType: 'merchant' | 'courier' | 'client' | 'system',
    targetName: string,
    reason: string,
    notes?: string
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreenState] = useState<ScreenId>('public-landing');
  const [stores, setStores] = useState<Store[]>(MOCK_STORES);
  const [selectedStore, setSelectedStore] = useState<Store>(MOCK_STORES[0]);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(MOCK_PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[5], quantity: 2, unitPrice: 1.50 }, // 2 Pain beldi
    { product: MOCK_PRODUCTS[1], quantity: 3, unitPrice: 2.50, variantLabel: 'Unité (170g)' }, // 3 Raïbi
    { product: MOCK_PRODUCTS[0], quantity: 1, unitPrice: 18.50, variantLabel: 'Boîte 200g' }, // 1 Atay Sultan
  ]);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order>(MOCK_ORDERS[0]);
  const [karnaEntries, setKarnaEntries] = useState<KarnaEntry[]>(MOCK_KARNA_ENTRIES);
  const [courierMissions, setCourierMissions] = useState<CourierMission[]>(MOCK_COURIER_MISSIONS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [isScreenSwitcherOpen, setIsScreenSwitcherOpen] = useState<boolean>(false);

  // Free text & photo order review state
  const [orderReviewItems, setOrderReviewItems] = useState<DetectedOrderItem[]>([]);
  const [orderReviewSource, setOrderReviewSource] = useState<'text' | 'photo'>('text');
  const [originalInputText, setOriginalInputText] = useState<string>('2 lait, 1 pain, du sucre, 3 yaourts, de l\'huile');
  const [originalPhotoPreview, setOriginalPhotoPreview] = useState<string | null>(null);

  // Admin Supervision States (PDF Requirements)
  const [adminStores, setAdminStores] = useState<StoreAdminRecord[]>(MOCK_ADMIN_STORES);
  const [adminClients, setAdminClients] = useState<ClientAdminRecord[]>(MOCK_ADMIN_CLIENTS);
  const [adminCouriers, setAdminCouriers] = useState<CourierAdminRecord[]>(MOCK_ADMIN_COURIERS);
  const [adminAuditLogs, setAdminAuditLogs] = useState<AdminAuditLogEntry[]>(MOCK_ADMIN_AUDIT_LOGS);
  const [currentAdminRole, setCurrentAdminRole] = useState<AdminRoleType>('super_admin');
  const [selectedAdminMerchantId, setSelectedAdminMerchantId] = useState<string | null>('store-1');
  const [selectedAdminClientId, setSelectedAdminClientId] = useState<string | null>('cli-1');
  const [selectedAdminCourierId, setSelectedAdminCourierId] = useState<string | null>('cour-1');
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>(MOCK_ADMIN_NOTIFICATIONS);

  // Derive role or allow setting
  const currentRole: UserRole = useMemo(() => {
    if (currentScreen.startsWith('public-')) return 'public';
    if (currentScreen.startsWith('client-')) return 'client';
    if (currentScreen.startsWith('merchant-')) return 'merchant';
    if (currentScreen.startsWith('courier-')) return 'courier';
    if (currentScreen.startsWith('admin-')) return 'admin';
    return 'public';
  }, [currentScreen]);

  const setCurrentRole = (role: UserRole) => {
    switch (role) {
      case 'public':
        setCurrentScreenState('public-landing');
        break;
      case 'client':
        setCurrentScreenState('client-home');
        break;
      case 'merchant':
        setCurrentScreenState('merchant-dashboard');
        break;
      case 'courier':
        setCurrentScreenState('courier-available');
        break;
      case 'admin':
        setCurrentScreenState('admin-orders');
        break;
    }
  };

  const setCurrentScreen = (id: ScreenId) => {
    setCurrentScreenState(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart actions
  const addToCart = (product: Product, variantId?: string, qty: number = 1) => {
    setCart((prev) => {
      const variant = product.variants?.find((v) => v.id === variantId);
      const price = variant ? variant.price : product.price;
      const label = variant ? variant.label : undefined;

      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variantId === variantId
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          variantId,
          variantLabel: label,
          quantity: qty,
          unitPrice: price,
        },
      ];
    });
  };

  const updateCartQty = (productId: string, variantId: string | undefined, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.variantId === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.variantId === variantId))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalDh = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const placeOrder = (paymentMethod: 'cod' | 'karna', note?: string): Order => {
    const subtotal = cartTotalDh;
    const deliveryFee = subtotal >= selectedStore.freeDeliveryThresholdDh ? 0 : selectedStore.deliveryFeeDh;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      orderNumber: `SH-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'À l\'instant',
      storeId: selectedStore.id,
      storeName: selectedStore.name,
      customerName: 'Karim Bennani',
      customerPhone: '+212 6 61 88 23 11',
      customerAddress: 'Immeuble Yasmina, Apt 4 (Bourgogne)',
      addressLabel: 'Domicile',
      customerNote: note || 'À livrer dès que possible avec le pain chaud',
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        quantity: c.quantity,
        pricePerUnit: c.unitPrice,
        totalPrice: c.unitPrice * c.quantity,
        variantLabel: c.variantLabel,
      })),
      subtotalDh: subtotal,
      deliveryFeeDh: deliveryFee,
      totalDh: total,
      paymentMethod,
      status: 'pending',
      courierName: 'Hamza El Fassi (Moto 103)',
      courierPhone: '+212 6 54 21 88 90',
      courierType: 'pro',
      etaMinutes: selectedStore.deliveryTimeMinutes,
      driverLat: selectedStore.lat + 0.001,
      driverLng: selectedStore.lng + 0.001,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // If paid via Karna, register in Karim's Karna book
    if (paymentMethod === 'karna') {
      setKarnaEntries((prev) =>
        prev.map((entry) => {
          if (entry.clientId === 'user-karim') {
            const nextDebt = entry.currentDebtDh + total;
            return {
              ...entry,
              currentDebtDh: nextDebt,
              lastOrderDate: 'Aujourd\'hui',
              history: [
                {
                  id: `h-${Date.now()}`,
                  date: 'Aujourd\'hui',
                  description: `Commande ${newOrder.orderNumber} (${cart.length} articles)`,
                  amountDh: total,
                  balanceAfterDh: nextDebt,
                  receiptRef: newOrder.orderNumber,
                },
                ...entry.history,
              ],
            };
          }
          return entry;
        })
      );
    }

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    if (activeOrder.id === orderId) {
      setActiveOrder((prev) => ({ ...prev, status }));
    }
  };

  const addKarnaPayment = (karnaId: string, amountDh: number, receipt?: string) => {
    setKarnaEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === karnaId) {
          const nextDebt = Math.max(0, entry.currentDebtDh - amountDh);
          return {
            ...entry,
            currentDebtDh: nextDebt,
            lastPaymentDate: 'Aujourd\'hui',
            history: [
              {
                id: `pay-${Date.now()}`,
                date: 'Aujourd\'hui',
                description: receipt ? `Règlement espèces (${receipt})` : 'Règlement au comptoir',
                amountDh: -amountDh,
                balanceAfterDh: nextDebt,
              },
              ...entry.history,
            ],
          };
        }
        return entry;
      })
    );
  };

  const acceptMission = (missionId: string) => {
    setCourierMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, status: 'accepted' } : m))
    );
  };

  const completeMission = (missionId: string) => {
    setCourierMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, status: 'delivered' } : m))
    );
  };

  const addReview = (rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      storeId: selectedStore.id,
      customerName: 'Karim Bennani',
      rating,
      date: 'À l\'instant',
      comment,
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const processGroceryInput = (input: string, source: 'text' | 'photo', photoUrl?: string | null) => {
    setOrderReviewSource(source);
    setOriginalInputText(input);
    if (photoUrl !== undefined) {
      setOriginalPhotoPreview(photoUrl);
    }

    const rawItems = input
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parsed: DetectedOrderItem[] = rawItems.map((raw, idx) => {
      const qtyMatch = raw.match(/^(\d+)\s*(?:x|\*)?\s*(.*)$/i);
      let qty = 1;
      let cleanText = raw.toLowerCase();

      if (qtyMatch) {
        qty = parseInt(qtyMatch[1], 10) || 1;
        cleanText = qtyMatch[2].trim().toLowerCase();
      }

      cleanText = cleanText
        .replace(/^(de l'|d'|du|des|le|la|les|un|une)\s+/i, '')
        .trim();

      if (cleanText.includes('lait') || cleanText.includes('hlib') || cleanText.includes('centrale')) {
        const p = products.find((x) => x.id === 'prod-13') || products.find((x) => x.name.toLowerCase().includes('lait'));
        return {
          id: `item-${idx}-${Date.now()}`,
          originalText: raw,
          matchedProduct: p,
          confidence: 'high' as const,
          quantity: qty,
        };
      }

      if (cleanText.includes('pain') || cleanText.includes('khobz')) {
        const p = products.find((x) => x.id === 'prod-6') || products.find((x) => x.name.toLowerCase().includes('pain'));
        return {
          id: `item-${idx}-${Date.now()}`,
          originalText: raw,
          matchedProduct: p,
          confidence: 'high' as const,
          quantity: qty,
        };
      }

      if (cleanText.includes('yaourt') || cleanText.includes('raibi') || cleanText.includes('danone')) {
        const p = products.find((x) => x.id === 'prod-15') || products.find((x) => x.id === 'prod-2');
        return {
          id: `item-${idx}-${Date.now()}`,
          originalText: raw,
          matchedProduct: p,
          confidence: 'high' as const,
          quantity: qty,
        };
      }

      if (cleanText.includes('sucre') || cleanText.includes('sekkar')) {
        const sugar1 = products.find((x) => x.id === 'prod-10') || products.find((x) => x.name.toLowerCase().includes('sucre'));
        const sugar2 = products.find((x) => x.id === 'prod-14');
        return {
          id: `item-${idx}-${Date.now()}`,
          originalText: raw,
          matchedProduct: sugar1,
          confidence: 'medium' as const,
          quantity: qty,
          suggestions: [sugar1, sugar2].filter(Boolean) as Product[],
        };
      }

      if (cleanText.includes('huile') || cleanText.includes('zit')) {
        return {
          id: `item-${idx}-${Date.now()}`,
          originalText: raw,
          matchedProduct: undefined,
          confidence: 'low' as const,
          quantity: qty,
          suggestions: products.slice(0, 4),
        };
      }

      const directMatch = products.find((p) => p.name.toLowerCase().includes(cleanText));
      if (directMatch) {
        return {
          id: `item-${idx}-${Date.now()}`,
          originalText: raw,
          matchedProduct: directMatch,
          confidence: 'high' as const,
          quantity: qty,
        };
      }

      return {
        id: `item-${idx}-${Date.now()}`,
        originalText: raw,
        matchedProduct: undefined,
        confidence: 'low' as const,
        quantity: qty,
        suggestions: products.slice(0, 4),
      };
    });

    setOrderReviewItems(parsed);
    setCurrentScreen('client-order-review');
  };

  const addReviewedItemsToCart = (items: DetectedOrderItem[]) => {
    items.forEach((it) => {
      if (it.matchedProduct && it.quantity > 0) {
        addToCart(it.matchedProduct, undefined, it.quantity);
      }
    });
    setCurrentScreen('client-cart');
  };

  // --- Admin Supervision Actions (PDF Specification) ---
  const currentAdminName = useMemo(() => {
    switch (currentAdminRole) {
      case 'super_admin':
        return 'Admin Hicham (Super Admin)';
      case 'moderator':
        return 'Admin Sarah (Modérateur)';
      case 'support':
        return 'Admin Amine (Support)';
    }
  }, [currentAdminRole]);

  const logAdminAudit = (
    action: string,
    targetType: 'merchant' | 'courier' | 'client' | 'system',
    targetName: string,
    reason: string,
    notes?: string
  ) => {
    const newEntry: AdminAuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: 'À l\'instant',
      adminName: currentAdminName,
      adminRole: currentAdminRole,
      action,
      targetType,
      targetName,
      reason,
      notes,
    };
    setAdminAuditLogs((prev) => [newEntry, ...prev]);
  };

  const dispatchAdminNotification = (
    recipientType: 'merchant' | 'client' | 'courier',
    recipientId: string,
    recipientName: string,
    title: string,
    message: string,
    reason: string
  ) => {
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      recipientType,
      recipientId,
      recipientName,
      title,
      message,
      reason,
      timestamp: 'À l\'instant',
      read: false,
    };
    setAdminNotifications((prev) => [newNotif, ...prev]);
  };

  const validateStoreAdmin = (storeId: string, reason: string) => {
    setAdminStores((prev) =>
      prev.map((s) => {
        if (s.id === storeId) {
          return {
            ...s,
            status: 'active',
            validatedBy: currentAdminName,
            validatedAt: 'Aujourd\'hui',
            validationReason: reason,
          };
        }
        return s;
      })
    );
    const store = adminStores.find((s) => s.id === storeId);
    logAdminAudit('Agrément & Validation Hanout', 'merchant', store?.name || storeId, reason);
    dispatchAdminNotification(
      'merchant',
      storeId,
      store?.name || 'Commerçant',
      'Votre commerce a été validé et agréé !',
      `Félicitations, votre hanout « ${store?.name || ''} » a été activé sur Smart Hanout. Votre catalogue est désormais ouvert aux commandes des clients du quartier.`,
      reason
    );
  };

  const suspendStoreAdmin = (
    storeId: string,
    reason: MerchantSuspensionReason | string,
    duration: 'temporary_7d' | 'definitive',
    notes?: string
  ) => {
    setAdminStores((prev) =>
      prev.map((s) => {
        if (s.id === storeId) {
          return {
            ...s,
            status: 'suspended',
            suspensionHistory: [
              {
                id: `susp-${Date.now()}`,
                date: 'Aujourd\'hui',
                reason,
                duration,
                admin: currentAdminName,
                notes,
              },
              ...s.suspensionHistory,
            ],
          };
        }
        return s;
      })
    );
    const store = adminStores.find((s) => s.id === storeId);
    logAdminAudit(
      duration === 'definitive' ? 'Suspension définitive Hanout' : 'Suspension temporaire 7j',
      'merchant',
      store?.name || storeId,
      reason,
      notes
    );
    dispatchAdminNotification(
      'merchant',
      storeId,
      store?.name || 'Commerçant',
      `Commerce suspendu (${duration === 'definitive' ? 'définitif' : '7 jours'})`,
      `Votre boutique a été suspendue par la modération. Motif standardisé : ${reason}. ${notes ? `Précisions : ${notes}` : ''}`,
      reason
    );
  };

  const reactivateStoreAdmin = (storeId: string) => {
    setAdminStores((prev) =>
      prev.map((s) => (s.id === storeId ? { ...s, status: 'active' } : s))
    );
    const store = adminStores.find((s) => s.id === storeId);
    logAdminAudit('Levée de suspension Hanout', 'merchant', store?.name || storeId, 'Dossier régularisé');
    dispatchAdminNotification(
      'merchant',
      storeId,
      store?.name || 'Commerçant',
      'Réactivation de votre boutique',
      `La suspension de votre commerce « ${store?.name || ''} » a été levée. Votre vitrine est à nouveau active.`,
      'Dossier régularisé'
    );
  };

  const suspendClientAdmin = (
    clientId: string,
    reason: ClientSuspensionReason | string,
    duration: 'temporary_7d' | 'definitive',
    notes?: string
  ) => {
    setAdminClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            status: duration === 'temporary_7d' ? 'suspended_temp' : 'suspended_perm',
            tempSuspensionEndsAt: duration === 'temporary_7d' ? 'Dans 7 jours (automatique)' : undefined,
            suspensionReason: reason,
          };
        }
        return c;
      })
    );
    const client = adminClients.find((c) => c.id === clientId);
    logAdminAudit(
      duration === 'definitive' ? 'Blocage permanent Client' : 'Suspension temporaire 7j Client',
      'client',
      client?.name || clientId,
      reason,
      notes
    );
    dispatchAdminNotification(
      'client',
      clientId,
      client?.name || 'Client',
      `Compte client restreint (${duration === 'definitive' ? 'définitif' : '7 jours'})`,
      `Votre compte a été restreint. Motif : ${reason}. Pour toute réclamation, contactez le support.`,
      reason
    );
  };

  const reactivateClientAdmin = (clientId: string) => {
    setAdminClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: 'active', suspensionReason: undefined } : c))
    );
    const client = adminClients.find((c) => c.id === clientId);
    logAdminAudit('Réactivation Compte Client', 'client', client?.name || clientId, 'Vérification effectuée');
    dispatchAdminNotification(
      'client',
      clientId,
      client?.name || 'Client',
      'Votre compte a été réactivé',
      'Votre accès à la commande en ligne et aux hanouts du quartier a été rétabli avec succès.',
      'Rétablissement'
    );
  };

  const exportClientDataAdmin = (clientId: string) => {
    const client = adminClients.find((c) => c.id === clientId);
    if (!client) return;
    const payload = JSON.stringify(client, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `archive_cndp_${client.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    a.click();
    logAdminAudit('Export Données Personnelles CNDP', 'client', client.name, 'Demande de portabilité loi 09-08');
  };

  const validateCourierAdmin = (courierId: string, reason: string) => {
    setAdminCouriers((prev) =>
      prev.map((c) => {
        if (c.id === courierId) {
          return {
            ...c,
            status: 'active',
            typeDetails: {
              ...c.typeDetails,
              isResidencyVerified: true,
            },
          };
        }
        return c;
      })
    );
    const cour = adminCouriers.find((c) => c.id === courierId);
    logAdminAudit('Validation & Agrément Livreur/Concierge', 'courier', cour?.name || courierId, reason);
    dispatchAdminNotification(
      'courier',
      courierId,
      cour?.name || 'Livreur',
      'Agrément livreur validé !',
      'Votre profil livreur/concierge a été validé. Vous pouvez désormais accepter des courses sur votre secteur.',
      reason
    );
  };

  const suspendCourierAdmin = (
    courierId: string,
    reason: CourierSuspensionReason | string,
    notes?: string
  ) => {
    setAdminCouriers((prev) =>
      prev.map((c) => {
        if (c.id === courierId) {
          return {
            ...c,
            status: 'suspended',
            suspensions: [
              {
                id: `csusp-${Date.now()}`,
                date: 'Aujourd\'hui',
                reason,
                admin: currentAdminName,
                duration: 'Indéterminée (Examen support)',
              },
              ...c.suspensions,
            ],
          };
        }
        return c;
      })
    );
    const cour = adminCouriers.find((c) => c.id === courierId);
    logAdminAudit('Suspension Livreur', 'courier', cour?.name || courierId, reason, notes);
    dispatchAdminNotification(
      'courier',
      courierId,
      cour?.name || 'Livreur',
      'Suspension temporaire de votre compte livreur',
      `Votre compte coursier a été suspendu pour le motif suivant : ${reason}. Veuillez contacter le support.`,
      reason
    );
  };

  const reactivateCourierAdmin = (courierId: string) => {
    setAdminCouriers((prev) =>
      prev.map((c) => (c.id === courierId ? { ...c, status: 'active' } : c))
    );
    const cour = adminCouriers.find((c) => c.id === courierId);
    logAdminAudit('Réactivation Livreur', 'courier', cour?.name || courierId, 'Clôture litige');
    dispatchAdminNotification(
      'courier',
      courierId,
      cour?.name || 'Livreur',
      'Compte coursier réactivé',
      'Vous pouvez à nouveau vous connecter et recevoir des propositions de livraison.',
      'Clôture litige'
    );
  };

  const deactivateProductAdmin = (
    productId: string,
    storeId: string,
    reason: ProductAdminDeactivationReason | string,
    notes?: string
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              isActive: false,
              isDeactivatedByAdmin: true,
              deactivationReason: reason,
              deactivatedAt: 'Aujourd\'hui',
            }
          : p
      )
    );
    const prod = products.find((p) => p.id === productId);
    const store = adminStores.find((s) => s.id === storeId);
    logAdminAudit(
      'Désactivation Produit',
      'merchant',
      `${store?.name || storeId} : ${prod?.name || productId}`,
      reason,
      notes
    );
    dispatchAdminNotification(
      'merchant',
      storeId,
      store?.name || 'Commerçant',
      `Produit retiré de la vente : ${prod?.name || 'Article'}`,
      `Le produit « ${prod?.name || productId} » a été désactivé par l'administration. Motif obligatoire : ${reason}. ${notes ? `Note : ${notes}` : ''}`,
      reason
    );
  };

  const reactivateProductAdmin = (productId: string, storeId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              isActive: true,
              isDeactivatedByAdmin: false,
              deactivationReason: undefined,
            }
          : p
      )
    );
    const prod = products.find((p) => p.id === productId);
    const store = adminStores.find((s) => s.id === storeId);
    logAdminAudit(
      'Réactivation Produit',
      'merchant',
      `${store?.name || storeId} : ${prod?.name || productId}`,
      'Conformité rétablie'
    );
    dispatchAdminNotification(
      'merchant',
      storeId,
      store?.name || 'Commerçant',
      `Produit réactivé : ${prod?.name || 'Article'}`,
      `Le produit « ${prod?.name || productId} » a été réactivé avec succès dans votre catalogue.`,
      'Conformité rétablie'
    );
  };

  const maskReviewAdmin = (
    reviewId: string,
    storeId: string,
    reason: ReviewMaskReason | string,
    notes?: string
  ) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              isMaskedByAdmin: true,
              maskReason: reason,
              maskedAt: 'Aujourd\'hui',
            }
          : r
      )
    );
    const rev = reviews.find((r) => r.id === reviewId);
    logAdminAudit('Masquage Avis Client', 'client', `Avis #${reviewId} de ${rev?.customerName || 'Client'}`, reason, notes);
  };

  const unmaskReviewAdmin = (reviewId: string, storeId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              isMaskedByAdmin: false,
              maskReason: undefined,
            }
          : r
      )
    );
    logAdminAudit('Rétablissement Avis Client', 'client', `Avis #${reviewId}`, 'Levée de modération');
  };

  const verifyCourierDocumentAdmin = (
    courierId: string,
    docId: string,
    isValid: boolean,
    rejectionReason?: string
  ) => {
    setAdminCouriers((prev) =>
      prev.map((c) => {
        if (c.id === courierId) {
          const updatedDocs = c.documents?.map((d) =>
            d.id === docId
              ? {
                  ...d,
                  status: (isValid ? 'verified' : 'rejected') as 'verified' | 'rejected',
                  rejectionReason: isValid ? undefined : rejectionReason,
                  verifiedAt: isValid ? 'Aujourd\'hui' : undefined,
                }
              : d
          );
          return { ...c, documents: updatedDocs };
        }
        return c;
      })
    );
    const cour = adminCouriers.find((c) => c.id === courierId);
    logAdminAudit(
      isValid ? 'Validation Document Livreur' : 'Rejet Document Livreur',
      'courier',
      cour?.name || courierId,
      isValid ? 'Document vérifié et conforme' : rejectionReason || 'Document non conforme'
    );
    dispatchAdminNotification(
      'courier',
      courierId,
      cour?.name || 'Livreur',
      isValid ? 'Document vérifié' : 'Document rejeté',
      isValid
        ? 'Votre document d\'inscription a été vérifié et approuvé.'
        : `Votre document n'a pas pu être validé. Motif : ${rejectionReason || 'Non conforme'}.`,
      isValid ? 'Vérifié' : rejectionReason || 'Rejet'
    );
  };

  const reassignOrderCourier = (
    orderId: string,
    courierName: string,
    courierPhone: string,
    courierType?: 'pro' | 'employee' | 'concierge'
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedTimeline = ord.timeline
            ? [
                ...ord.timeline,
                {
                  stage: 'Réaffectation Livreur',
                  timestamp: 'À l\'instant',
                  done: true,
                  description: `Nouveau coursier assigné : ${courierName} (${courierPhone})`,
                },
              ]
            : undefined;
          return {
            ...ord,
            courierName,
            courierPhone,
            courierType: courierType || ord.courierType || 'pro',
            status: ord.status === 'pending' ? 'preparing' : ord.status,
            alertFlag: ord.alertFlag?.type === 'unassigned' ? undefined : ord.alertFlag,
            timeline: updatedTimeline,
          };
        }
        return ord;
      })
    );
    logAdminAudit('Réaffectation Livreur', 'courier', courierName, `Commande ${orderId}`, `Affecté à ${courierName}`);
  };

  const resolveOrderAlert = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, alertFlag: undefined } : ord))
    );
    logAdminAudit('Résolution Alerte Commande', 'system', orderId, 'Alerte levée manuellement par superviseur');
  };

  const flagOrderAlert = (
    orderId: string,
    alert: {
      type: 'delay' | 'address' | 'breakdown' | 'karna_limit' | 'unassigned';
      message: string;
      severity: 'warning' | 'critical';
    }
  ) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, alertFlag: alert } : ord))
    );
    logAdminAudit('Signalement Incident Commande', 'system', orderId, alert.message);
  };

  const cancelOrderAdmin = (orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'cancelled',
              timeline: ord.timeline
                ? [
                    ...ord.timeline,
                    {
                      stage: 'Annulation Administrative',
                      timestamp: 'À l\'instant',
                      done: true,
                      description: `Motif : ${reason}`,
                    },
                  ]
                : undefined,
            }
          : ord
      )
    );
    logAdminAudit('Annulation Commande Superviseur', 'system', orderId, reason);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        currentRole,
        setCurrentRole,
        stores,
        selectedStore,
        setSelectedStore,
        products,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotalDh,
        cartItemCount,
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        updateOrderStatus,
        reassignOrderCourier,
        resolveOrderAlert,
        flagOrderAlert,
        cancelOrderAdmin,
        karnaEntries,
        addKarnaPayment,
        courierMissions,
        acceptMission,
        completeMission,
        reviews,
        addReview,
        isScreenSwitcherOpen,
        setIsScreenSwitcherOpen,
        orderReviewItems,
        setOrderReviewItems,
        orderReviewSource,
        originalInputText,
        originalPhotoPreview,
        processGroceryInput,
        addReviewedItemsToCart,
        // Admin
        adminStores,
        adminClients,
        adminCouriers,
        adminAuditLogs,
        adminNotifications,
        currentAdminRole,
        setCurrentAdminRole,
        selectedAdminMerchantId,
        setSelectedAdminMerchantId,
        selectedAdminClientId,
        setSelectedAdminClientId,
        selectedAdminCourierId,
        setSelectedAdminCourierId,
        validateStoreAdmin,
        suspendStoreAdmin,
        reactivateStoreAdmin,
        suspendClientAdmin,
        reactivateClientAdmin,
        exportClientDataAdmin,
        validateCourierAdmin,
        suspendCourierAdmin,
        reactivateCourierAdmin,
        deactivateProductAdmin,
        reactivateProductAdmin,
        maskReviewAdmin,
        unmaskReviewAdmin,
        verifyCourierDocumentAdmin,
        dispatchAdminNotification,
        logAdminAudit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
