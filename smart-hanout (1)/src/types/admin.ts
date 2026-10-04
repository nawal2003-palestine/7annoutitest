export type AdminRoleType = 'super_admin' | 'moderator' | 'support';

export type MerchantSuspensionReason =
  | 'Fraude'
  | 'Plaintes répétées'
  | 'Produits non conformes'
  | 'Documents invalides'
  | 'Comportement inapproprié';

export type CourierSuspensionReason =
  | 'Incident de sécurité'
  | 'Retards répétés'
  | 'Fraude (fausse confirmation de livraison)'
  | 'Comportement inapproprié';

export type ClientSuspensionReason =
  | 'Taux d\'annulation anormalement élevé'
  | 'Plusieurs comptes liés au même téléphone / appareil'
  | 'Défauts de paiement Karna répétés'
  | 'Fraude ou réclamation abusive'
  | 'Comportement inapproprié envers les livreurs';

export type ProductAdminDeactivationReason =
  | 'Contenu inapproprié'
  | 'Produit interdit'
  | 'Signalement client'
  | 'Autre';

export type ReviewMaskReason =
  | 'Propos diffamatoires ou injurieux'
  | 'Faux avis / Spam'
  | 'Hors sujet'
  | 'Autre';

export interface CourierVerificationDocument {
  id: string;
  type: 'cin' | 'driving_license' | 'residence_proof' | 'vehicle_registration';
  label: string;
  submittedAt: string;
  status: 'verified' | 'pending' | 'rejected';
  rejectionReason?: string;
  verifiedAt?: string;
}

export interface AdminNotification {
  id: string;
  recipientType: 'merchant' | 'client' | 'courier';
  recipientId: string;
  recipientName: string;
  title: string;
  message: string;
  reason: string;
  timestamp: string;
  read: boolean;
}

export interface StoreAdminRecord {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  openingHours?: string;
  ownerName: string;
  ownerCin: string;
  rcNumber?: string; // Optionnel (souvent absent pour les petits hanouts)
  phone: string;
  phoneVerified: boolean;
  city: string;
  neighborhood: string;
  address: string;
  status: 'pending' | 'active' | 'suspended';
  validationReason?: string;
  validatedBy?: string;
  validatedAt?: string;
  storeMembers: {
    id: string;
    name: string;
    role: string;
    phone: string;
  }[];
  activity: {
    registeredAt: string;
    lastLogin: string;
    lastOrderReceived: string;
  };
  kpis: {
    totalOrders: number;
    totalRevenueDh: number;
    rating: number;
    cancellationRatePct: number;
    avgPrepTimeMin: number;
  };
  karnaExposure: {
    totalDebtDh: number;
    clientCount: number;
    maxAllowedExposureDh: number;
    isHighRisk: boolean;
  };
  suspensionHistory: {
    id: string;
    date: string;
    reason: MerchantSuspensionReason | string;
    duration: 'temporary_7d' | 'definitive';
    admin: string;
    notes?: string;
  }[];
}

export interface ClientAdminRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  registeredAt: string;
  city: string;
  neighborhood: string;
  address: string;
  totalSpentDh: number;
  totalOrders: number;
  cancellationRatePct: number;
  multiAccountsDetected: string[];
  registeredAddresses?: {
    id: string;
    label: string;
    address: string;
    city: string;
    isDefault: boolean;
  }[];
  karnaExposure: {
    totalMultiHanoutDebtDh: number;
    accounts: {
      storeId: string;
      storeName: string;
      debtDh: number;
      limitDh: number;
      defaultPaymentsCount: number;
    }[];
    hasRepeatedDefaults: boolean;
  };
  status: 'active' | 'suspended_temp' | 'suspended_perm';
  tempSuspensionEndsAt?: string;
  suspensionReason?: string;
  reviewsCount: number;
  openSupportTicketsCount: number;
}

export interface CourierAdminRecord {
  id: string;
  name: string;
  phone: string;
  cin: string;
  type: 'pro' | 'employee' | 'concierge';
  typeDetails: {
    vehicle?: string;
    plateNumber?: string;
    workZone?: string;
    attachedStoreName?: string;
    residenceBuildingAddress?: string;
    isResidencyVerified?: boolean;
  };
  documents?: CourierVerificationDocument[];
  status: 'pending' | 'active' | 'suspended';
  trustMetrics: {
    onTimeDeliveryRatePct: number;
    rating: number;
    totalDeliveries: number;
    totalEarningsDh?: number;
    monthlyEarningsDh?: number;
  };
  incidentsByCourier: {
    id: string;
    date: string;
    orderNumber: string;
    reason: 'client_absent' | 'adresse_introuvable' | 'interphone_hs' | 'panne';
    details: string;
  }[];
  incidentsReportedAgainstCourier: {
    id: string;
    date: string;
    orderNumber: string;
    clientName: string;
    reason: 'retard_excessif' | 'colis_abime' | 'impoli' | 'fausse_confirmation';
    details: string;
    severity: 'low' | 'high';
  }[];
  suspensions: {
    id: string;
    date: string;
    reason: CourierSuspensionReason | string;
    admin: string;
    duration: string;
  }[];
}

export interface AdminAuditLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  adminRole: AdminRoleType;
  action: string;
  targetType: 'merchant' | 'courier' | 'client' | 'system';
  targetName: string;
  reason: string;
  notes?: string;
}
