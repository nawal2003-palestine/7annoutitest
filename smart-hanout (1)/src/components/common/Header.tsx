import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, ScreenId } from '../../types';
import { SCREEN_REGISTRY } from '../../data/mockData';
import {
  ShoppingBag,
  Store as StoreIcon,
  Bike,
  ShieldCheck,
  Compass,
  MapPin,
  ChevronDown,
  Layers,
  Search,
  Bell,
  BookOpen,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    currentRole,
    setCurrentRole,
    cartItemCount,
    cartTotalDh,
    selectedStore,
    setIsScreenSwitcherOpen,
  } = useApp();

  const currentMeta = SCREEN_REGISTRY.find((s) => s.id === currentScreen);

  const roleButtons: { role: UserRole; label: string; icon: React.ReactNode; defaultScreen: ScreenId }[] = [
    { role: 'public', label: 'Vitrine', icon: <Compass className="w-3.5 h-3.5" />, defaultScreen: 'public-landing' },
    { role: 'client', label: 'Espace Client', icon: <ShoppingBag className="w-3.5 h-3.5" />, defaultScreen: 'client-home' },
    { role: 'merchant', label: 'Moul Lhanout', icon: <StoreIcon className="w-3.5 h-3.5" />, defaultScreen: 'merchant-dashboard' },
    { role: 'courier', label: 'Livreur / Concierge', icon: <Bike className="w-3.5 h-3.5" />, defaultScreen: 'courier-available' },
    { role: 'admin', label: 'Supervision Admin', icon: <ShieldCheck className="w-3.5 h-3.5" />, defaultScreen: 'admin-orders' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--wall)] border-b border-[var(--border-warm)] shadow-xs">
      {/* Top micro-bar: Neighborhood & Karna Notice */}
      <div className="bg-[var(--wall-dark)] px-4 py-1.5 text-xs border-b border-[var(--border-warm)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium text-[var(--ink)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--rust)]" />
            <span>Casablanca</span>
            <span className="text-[var(--ink-muted)]">• Bourgogne & Maarif</span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] border border-[var(--moroccan-green)]/30">
            ✓ 4 Hanouts ouverts maintenant
          </span>
        </div>

        {/* 64 screens quick indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsScreenSwitcherOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded font-mono text-xs font-semibold bg-[var(--rust)] text-white hover:bg-[var(--rust-hover)] transition-all cursor-pointer shadow-xs"
            title="Ouvrir le navigateur des 64 écrans complets"
          >
            <Layers className="w-3 h-3" />
            <span>64 Écrans Spécifiés</span>
            <span className="bg-white/20 px-1 rounded text-[10px] uppercase tracking-wider">
              {currentMeta?.badge || 'Index'}
            </span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div
          onClick={() => setCurrentScreen('public-landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--rust)] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            {/* Custom Moroccan shop stall silhouette */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
              <path d="M2 9h20" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[var(--ink)]">
                Smart<span className="text-[var(--rust)]">Hanout</span>
              </span>
              <span className="font-kalam text-xs font-bold text-[var(--amber-gold)] bg-[var(--amber-gold-light)] px-1.5 py-0.5 rounded border border-[var(--amber-gold)]/30">
                الحانوت الذكي
              </span>
            </div>
            <p className="text-[11px] text-[var(--ink-muted)] leading-none font-medium">
              Le commerce de quartier digitalisé
            </p>
          </div>
        </div>

        {/* Role tabs bar */}
        <nav className="hidden lg:flex items-center bg-[var(--wall-dark)] p-1 rounded-xl border border-[var(--border-warm)] gap-1">
          {roleButtons.map((btn) => {
            const isActive = currentRole === btn.role;
            return (
              <button
                key={btn.role}
                onClick={() => {
                  setCurrentRole(btn.role);
                  setCurrentScreen(btn.defaultScreen);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[var(--rust)] shadow-xs border border-[var(--border-warm)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-white/50'
                }`}
              >
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right action tools: Karna Book quick link, Cart, Notifications */}
        <div className="flex items-center gap-2">
          {/* Quick Karna access */}
          <button
            onClick={() => setCurrentScreen('merchant-karna')}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-[var(--amber-gold)]/40 bg-[var(--karna-paper)] text-[var(--ink)] hover:border-[var(--amber-gold)] transition-colors cursor-pointer"
            title="Consulter le Carnet de Karna (crédit client)"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--amber-gold)]" />
            <span className="font-kalam text-sm font-bold text-[var(--rust)]">Carnet Karna</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setCurrentScreen('client-notifications')}
            className="p-2 rounded-lg border border-[var(--border-warm)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--wall-dark)] transition-colors relative cursor-pointer"
            title="Notifications du quartier"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--rust)]" />
          </button>

          {/* Cart */}
          <button
            onClick={() => setCurrentScreen('client-cart')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--rust)] text-white hover:bg-[var(--rust-hover)] transition-all font-semibold text-xs shadow-xs cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[var(--amber-gold)] text-[var(--ink)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Panier:</span>
            <span className="font-mono">{cartTotalDh.toFixed(2)} DH</span>
          </button>
        </div>
      </div>

      {/* Mobile role pill scroller */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-1.5 overflow-x-auto bg-[var(--wall-dark)] border-t border-[var(--border-warm)]">
        {roleButtons.map((btn) => (
          <button
            key={btn.role}
            onClick={() => {
              setCurrentRole(btn.role);
              setCurrentScreen(btn.defaultScreen);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap cursor-pointer ${
              currentRole === btn.role
                ? 'bg-[var(--rust)] text-white'
                : 'text-[var(--ink-muted)] hover:bg-white/60'
            }`}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
