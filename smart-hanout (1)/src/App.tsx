/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import {
  ScreenSwitcherModal,
  FloatingNavigatorBar,
} from './components/common/ScreenSwitcherModal';

// Public screens
import { LandingScreen } from './screens/public/LandingScreen';
import { AboutScreen } from './screens/public/AboutScreen';
import { HowItWorksScreen } from './screens/public/HowItWorksScreen';
import { BecomeMerchantScreen } from './screens/public/BecomeMerchantScreen';
import { BecomeCourierScreen } from './screens/public/BecomeCourierScreen';
import { ContactFaqScreen } from './screens/public/ContactFaqScreen';
import { LegalScreen } from './screens/public/LegalScreen';

// Client screens
import { ClientLoginScreen } from './screens/client/ClientLoginScreen';
import { ClientRegisterScreen } from './screens/client/ClientRegisterScreen';
import { ClientForgotPasswordScreen } from './screens/client/ClientForgotPasswordScreen';
import { ClientHomeScreen } from './screens/client/ClientHomeScreen';
import { ClientStoreScreen } from './screens/client/ClientStoreScreen';
import { ClientProductScreen } from './screens/client/ClientProductScreen';
import { ClientCartScreen } from './screens/client/ClientCartScreen';
import { ClientCheckoutScreen } from './screens/client/ClientCheckoutScreen';
import { ClientTrackingScreen } from './screens/client/ClientTrackingScreen';
import { ClientOrderDetailScreen } from './screens/client/ClientOrderDetailScreen';
import { ClientOrderHistoryScreen } from './screens/client/ClientOrderHistoryScreen';
import { ClientIssueScreen } from './screens/client/ClientIssueScreen';
import { ClientFavoritesScreen } from './screens/client/ClientFavoritesScreen';
import { ClientProfileScreen } from './screens/client/ClientProfileScreen';
import { ClientAddressesScreen } from './screens/client/ClientAddressesScreen';
import { ClientNotificationsScreen } from './screens/client/ClientNotificationsScreen';
import { ClientSecurityScreen } from './screens/client/ClientSecurityScreen';
import { ClientOrderReviewScreen } from './screens/client/ClientOrderReviewScreen';

// Merchant screens
import { MerchantAuthScreen } from './screens/merchant/MerchantAuthScreen';
import { MerchantForgotScreen } from './screens/merchant/MerchantForgotScreen';
import { MerchantDashboardScreen } from './screens/merchant/MerchantDashboardScreen';
import { MerchantAnalyticsScreen } from './screens/merchant/MerchantAnalyticsScreen';
import { MerchantProductsScreen } from './screens/merchant/MerchantProductsScreen';
import { MerchantStockScreen } from './screens/merchant/MerchantStockScreen';
import { MerchantOrdersScreen } from './screens/merchant/MerchantOrdersScreen';
import { MerchantOrderDetailScreen } from './screens/merchant/MerchantOrderDetailScreen';
import { MerchantKarnaScreen } from './screens/merchant/MerchantKarnaScreen';
import { MerchantDeliveryZoneScreen } from './screens/merchant/MerchantDeliveryZoneScreen';
import { MerchantStoreProfileScreen } from './screens/merchant/MerchantStoreProfileScreen';
import { MerchantReviewsScreen } from './screens/merchant/MerchantReviewsScreen';
import { MerchantTeamScreen } from './screens/merchant/MerchantTeamScreen';
import { MerchantSecurityScreen } from './screens/merchant/MerchantSecurityScreen';

// Courier screens
import {
  CourierAuthScreen,
  CourierForgotScreen,
} from './screens/courier/CourierAuthScreen';
import {
  CourierAvailableScreen,
  CourierMissionDetailScreen,
} from './screens/courier/CourierAvailableScreen';
import {
  CourierActiveDeliveryScreen,
  CourierConfirmScreen,
} from './screens/courier/CourierActiveDeliveryScreen';
import {
  CourierIssueScreen,
  CourierEarningsScreen,
} from './screens/courier/CourierEarningsScreen';
import {
  CourierProfileScreen,
  CourierSecurityScreen,
} from './screens/courier/CourierProfileScreen';

// Admin screens
import { AdminAuthScreen } from './screens/admin/AdminAuthScreen';
import {
  AdminOrdersScreen,
  AdminStoresScreen,
  AdminMerchantDetailScreen,
  AdminCouriersScreen,
  AdminCourierDetailScreen,
  AdminUsersScreen,
  AdminClientDetailScreen,
} from './screens/admin/AdminCoreScreens';
import {
  AdminSupportScreen,
  AdminStatsScreen,
  AdminReviewsScreen,
  AdminRolesScreen,
  AdminZonesScreen,
  AdminAuditScreen,
  AdminSecurityScreen,
} from './screens/admin/AdminExtendedScreens';

// System screens
import {
  System404Screen,
  System403Screen,
  SystemSuspendedScreen,
  System500Screen,
} from './screens/system/SystemScreens';

const ScreenRenderer: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    // 1. Public (7)
    case 'public-landing':
      return <LandingScreen />;
    case 'public-about':
      return <AboutScreen />;
    case 'public-how-it-works':
      return <HowItWorksScreen />;
    case 'public-become-merchant':
      return <BecomeMerchantScreen />;
    case 'public-become-courier':
      return <BecomeCourierScreen />;
    case 'public-contact-faq':
      return <ContactFaqScreen />;
    case 'public-legal':
      return <LegalScreen />;

    // 2. Client (17)
    case 'client-login':
      return <ClientLoginScreen />;
    case 'client-register':
      return <ClientRegisterScreen />;
    case 'client-forgot-password':
      return <ClientForgotPasswordScreen />;
    case 'client-home':
      return <ClientHomeScreen />;
    case 'client-store':
      return <ClientStoreScreen />;
    case 'client-product':
      return <ClientProductScreen />;
    case 'client-cart':
      return <ClientCartScreen />;
    case 'client-checkout':
      return <ClientCheckoutScreen />;
    case 'client-tracking':
      return <ClientTrackingScreen />;
    case 'client-order-detail':
      return <ClientOrderDetailScreen />;
    case 'client-order-history':
      return <ClientOrderHistoryScreen />;
    case 'client-issue':
      return <ClientIssueScreen />;
    case 'client-favorites':
      return <ClientFavoritesScreen />;
    case 'client-profile':
      return <ClientProfileScreen />;
    case 'client-addresses':
      return <ClientAddressesScreen />;
    case 'client-notifications':
      return <ClientNotificationsScreen />;
    case 'client-security':
      return <ClientSecurityScreen />;
    case 'client-order-review':
      return <ClientOrderReviewScreen />;

    // 3. Merchant (14)
    case 'merchant-auth':
      return <MerchantAuthScreen />;
    case 'merchant-forgot':
      return <MerchantForgotScreen />;
    case 'merchant-dashboard':
      return <MerchantDashboardScreen />;
    case 'merchant-analytics':
      return <MerchantAnalyticsScreen />;
    case 'merchant-products':
      return <MerchantProductsScreen />;
    case 'merchant-stock':
      return <MerchantStockScreen />;
    case 'merchant-orders':
      return <MerchantOrdersScreen />;
    case 'merchant-order-detail':
      return <MerchantOrderDetailScreen />;
    case 'merchant-karna':
      return <MerchantKarnaScreen />;
    case 'merchant-delivery-zone':
      return <MerchantDeliveryZoneScreen />;
    case 'merchant-store-profile':
      return <MerchantStoreProfileScreen />;
    case 'merchant-reviews':
      return <MerchantReviewsScreen />;
    case 'merchant-team':
      return <MerchantTeamScreen />;
    case 'merchant-security':
      return <MerchantSecurityScreen />;

    // 4. Courier (10)
    case 'courier-auth':
      return <CourierAuthScreen />;
    case 'courier-forgot':
      return <CourierForgotScreen />;
    case 'courier-available':
      return <CourierAvailableScreen />;
    case 'courier-mission-detail':
      return <CourierMissionDetailScreen />;
    case 'courier-active-delivery':
      return <CourierActiveDeliveryScreen />;
    case 'courier-confirm':
      return <CourierConfirmScreen />;
    case 'courier-issue':
      return <CourierIssueScreen />;
    case 'courier-earnings':
      return <CourierEarningsScreen />;
    case 'courier-profile':
      return <CourierProfileScreen />;
    case 'courier-security':
      return <CourierSecurityScreen />;

    // 5. Admin (15)
    case 'admin-auth':
      return <AdminAuthScreen />;
    case 'admin-stores':
      return <AdminStoresScreen />;
    case 'admin-merchant-detail':
      return <AdminMerchantDetailScreen />;
    case 'admin-couriers':
      return <AdminCouriersScreen />;
    case 'admin-courier-detail':
      return <AdminCourierDetailScreen />;
    case 'admin-users':
      return <AdminUsersScreen />;
    case 'admin-client-detail':
      return <AdminClientDetailScreen />;
    case 'admin-orders':
      return <AdminOrdersScreen />;
    case 'admin-support':
      return <AdminSupportScreen />;
    case 'admin-stats':
      return <AdminStatsScreen />;
    case 'admin-reviews':
      return <AdminReviewsScreen />;
    case 'admin-roles':
      return <AdminRolesScreen />;
    case 'admin-zones':
      return <AdminZonesScreen />;
    case 'admin-audit':
      return <AdminAuditScreen />;
    case 'admin-security':
      return <AdminSecurityScreen />;

    // 6. System (4)
    case 'system-404':
      return <System404Screen />;
    case 'system-403':
      return <System403Screen />;
    case 'system-suspended':
      return <SystemSuspendedScreen />;
    case 'system-500':
      return <System500Screen />;

    default:
      return <LandingScreen />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[var(--wall)] text-[var(--ink)] antialiased font-sans selection:bg-[var(--rust)] selection:text-white">
        <Header />
        <main className="flex-1 pb-16">
          <ScreenRenderer />
        </main>
        <Footer />

        {/* Global 64-Screen Switcher & Floating Navigation Dock */}
        <ScreenSwitcherModal />
        <FloatingNavigatorBar />
      </div>
    </AppProvider>
  );
}
