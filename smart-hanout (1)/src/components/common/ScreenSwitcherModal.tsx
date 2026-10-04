import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SCREEN_REGISTRY } from '../../data/mockData';
import { ScreenId, UserRole } from '../../types';
import {
  X,
  Search,
  CheckCircle2,
  ExternalLink,
  Compass,
  ShoppingBag,
  Store,
  Bike,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const ScreenSwitcherModal: React.FC = () => {
  const { currentScreen, setCurrentScreen, isScreenSwitcherOpen, setIsScreenSwitcherOpen } =
    useApp();
  const [search, setSearch] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');

  if (!isScreenSwitcherOpen) return null;

  const roles = [
    { id: 'all', label: 'Tous les 64 écrans', count: 64 },
    { id: 'public', label: 'Public (7)', count: 7, icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'client', label: 'Client (17)', count: 17, icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'merchant', label: 'Commerçant (14)', count: 14, icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'courier', label: 'Livreur (10)', count: 10, icon: <Bike className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Admin (12)', count: 12, icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'system', label: 'Système (4)', count: 4, icon: <AlertTriangle className="w-3.5 h-3.5" /> },
  ];

  const filteredScreens = SCREEN_REGISTRY.filter((screen) => {
    const matchesRole =
      selectedRoleFilter === 'all' || screen.role === selectedRoleFilter;
    const matchesSearch =
      screen.title.toLowerCase().includes(search.toLowerCase()) ||
      screen.description.toLowerCase().includes(search.toLowerCase()) ||
      screen.badge.toLowerCase().includes(search.toLowerCase()) ||
      screen.id.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'public':
        return 'text-[var(--shutter-blue)] bg-[var(--shutter-blue-light)] border-[var(--shutter-blue)]/30';
      case 'client':
        return 'text-[var(--moroccan-green)] bg-[var(--moroccan-green-light)] border-[var(--moroccan-green)]/30';
      case 'merchant':
        return 'text-[var(--rust)] bg-[var(--rust-light)] border-[var(--rust)]/30';
      case 'courier':
        return 'text-[var(--amber-gold)] bg-[var(--amber-gold-light)] border-[var(--amber-gold)]/30';
      case 'admin':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'system':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-[var(--ink)] bg-[var(--wall-dark)] border-[var(--border-warm)]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[var(--wall)] rounded-2xl border border-[var(--border-warm)] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[var(--wall-dark)] border-b border-[var(--border-warm)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--rust)] text-white flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[var(--ink)]">
                  Navigateur des 64 Écrans Spécifiés
                </h2>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--rust-light)] text-[var(--rust)] font-semibold border border-[var(--rust)]/30">
                  Total : 64/64 Écrans
                </span>
              </div>
              <p className="text-xs text-[var(--ink-muted)]">
                Accédez directement à n'importe quel écran des 4 interfaces + public + système
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsScreenSwitcherOpen(false)}
            className="p-2 rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--wall)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-[var(--border-warm)] bg-[var(--wall)] space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
            <input
              type="text"
              placeholder="Filtrer parmi les 64 écrans (ex: Karna, GPS, Stock, Facture, 404...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-[var(--border-warm)] bg-white text-[var(--ink)] placeholder-[var(--ink-muted)]/70 focus:outline-hidden focus:border-[var(--rust)] focus:ring-1 focus:ring-[var(--rust)]"
            />
          </div>

          {/* Role pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRoleFilter(r.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedRoleFilter === r.id
                    ? 'bg-[var(--rust)] text-white shadow-xs'
                    : 'bg-[var(--wall-dark)] text-[var(--ink)] hover:bg-white border border-[var(--border-warm)]'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Screens Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          <div className="text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider mb-2">
            Résultats ({filteredScreens.length} écrans affichés)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {filteredScreens.map((screen) => {
              const isActive = currentScreen === screen.id;
              return (
                <div
                  key={screen.id}
                  onClick={() => {
                    setCurrentScreen(screen.id);
                    setIsScreenSwitcherOpen(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 text-left ${
                    isActive
                      ? 'bg-white border-2 border-[var(--rust)] shadow-md ring-2 ring-[var(--rust)]/15'
                      : 'bg-white/80 hover:bg-white border-[var(--border-warm)] hover:border-[var(--rust)]/50 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${getRoleColor(
                          screen.role
                        )}`}
                      >
                        {screen.badge}
                      </span>
                      <h4
                        className={`text-sm font-bold ${
                          isActive ? 'text-[var(--rust)]' : 'text-[var(--ink)]'
                        }`}
                      >
                        {screen.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--ink-muted)] line-clamp-1">
                      {screen.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[var(--rust)] shrink-0 pt-0.5">
                    {isActive ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-[var(--rust)]">
                        <CheckCircle2 className="w-4 h-4" />
                        Actif
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[var(--ink-muted)] group-hover:text-[var(--rust)]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredScreens.length === 0 && (
            <div className="text-center py-10 text-[var(--ink-muted)]">
              Aucun écran ne correspond à « {search} »
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[var(--wall-dark)] border-t border-[var(--border-warm)] text-xs text-[var(--ink-muted)] flex items-center justify-between">
          <span className="font-kalam text-sm text-[var(--rust)] font-bold">
            Smart Hanout • Conforme au cahier des charges 64 écrans
          </span>
          <button
            onClick={() => setIsScreenSwitcherOpen(false)}
            className="px-3 py-1 rounded bg-[var(--ink)] text-white hover:bg-black font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export const FloatingNavigatorBar: React.FC = () => {
  const { currentScreen, setCurrentScreen, setIsScreenSwitcherOpen } = useApp();
  const currentIndex = SCREEN_REGISTRY.findIndex((s) => s.id === currentScreen);
  const currentMeta = SCREEN_REGISTRY[currentIndex] || SCREEN_REGISTRY[0];

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + SCREEN_REGISTRY.length) % SCREEN_REGISTRY.length;
    setCurrentScreen(SCREEN_REGISTRY[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % SCREEN_REGISTRY.length;
    setCurrentScreen(SCREEN_REGISTRY[nextIdx].id);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-[var(--ink)] text-white px-3 py-2 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 sm:gap-3 max-w-[94vw] text-xs">
      <button
        onClick={handlePrev}
        className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium flex items-center gap-1 cursor-pointer"
        title="Écran précédent"
      >
        <span>←</span>
        <span className="hidden md:inline">Précédent</span>
      </button>

      <div
        onClick={() => setIsScreenSwitcherOpen(true)}
        className="flex items-center gap-2 cursor-pointer hover:opacity-90 px-1"
        title="Cliquez pour ouvrir le sélecteur complet des 64 écrans"
      >
        <span className="font-mono text-[11px] font-bold text-[var(--amber-gold)] bg-white/10 px-2 py-0.5 rounded">
          {currentIndex + 1} / 64
        </span>
        <div className="flex flex-col text-left">
          <span className="font-bold text-white truncate max-w-[140px] sm:max-w-[220px]">
            {currentMeta.title}
          </span>
          <span className="text-[10px] text-stone-300 capitalize">{currentMeta.role}</span>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium flex items-center gap-1 cursor-pointer"
        title="Écran suivant"
      >
        <span className="hidden md:inline">Suivant</span>
        <span>→</span>
      </button>

      <button
        onClick={() => setIsScreenSwitcherOpen(true)}
        className="ml-1 px-2.5 py-1 rounded-lg bg-[var(--rust)] hover:bg-[var(--rust-hover)] font-bold text-white transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
      >
        <Layers className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Tous les 64</span>
      </button>
    </div>
  );
};
