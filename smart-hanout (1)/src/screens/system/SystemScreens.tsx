import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Store, ShieldAlert, AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react';

export const System404Screen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center mx-auto text-2xl font-bold">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          Ruelle Introuvable !
        </h1>
        <p className="font-kalam text-sm text-[var(--rust)]">
          « Wa9ila dert chi dorra ghalta f derb »
        </p>
        <p className="text-xs text-[var(--ink-muted)]">
          Cette page ou ce produit n'existe plus ou a été déplacé dans un autre hanout.
        </p>
      </div>

      <MoroccanStarBorder />

      <button
        onClick={() => setCurrentScreen('client-home')}
        className="px-6 py-3 rounded-xl bg-[var(--rust)] text-white font-bold text-xs hover:bg-[var(--rust-hover)] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
      >
        <Home className="w-4 h-4" />
        <span>Retourner au Hanout du quartier</span>
      </button>
    </div>
  );
};

export const System403Screen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl font-bold">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          Accès Réservé (403)
        </h1>
        <p className="font-kalam text-sm text-[var(--amber-gold)]">
          « Had l-bab masdoud l-ghayr l-moukhtassine »
        </p>
        <p className="text-xs text-[var(--ink-muted)]">
          Vous n'avez pas les autorisations nécessaires pour accéder à cet espace de gestion.
        </p>
      </div>

      <MoroccanStarBorder />

      <button
        onClick={() => setCurrentScreen('public-landing')}
        className="px-6 py-3 rounded-xl bg-[var(--ink)] text-white font-bold text-xs hover:bg-black transition-colors inline-flex items-center gap-2 cursor-pointer"
      >
        <Home className="w-4 h-4" />
        <span>Retourner à la vitrine d'accueil</span>
      </button>
    </div>
  );
};

export const SystemSuspendedScreen: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-800 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          Compte Temporairement Suspendu
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Une irrégularité ou un solde Karna anormalement élevé a entraîné la mise en pause préventive de votre compte.
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] text-xs text-[var(--ink)] space-y-2">
        <span className="font-bold block">Contactez l'assistance Smart Hanout :</span>
        <div className="flex items-center justify-center gap-1.5 font-mono font-bold text-[var(--rust)]">
          <Phone className="w-4 h-4" />
          <span>+212 5 22 99 88 77</span>
        </div>
      </div>
    </div>
  );
};

export const System500Screen: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          Interruption Technique (500)
        </h1>
        <p className="font-kalam text-sm text-[var(--rust)]">
          « Chwya dial sber, rani kan9ado l-khetra »
        </p>
        <p className="text-xs text-[var(--ink-muted)]">
          Nos serveurs à Casablanca effectuent une mise à niveau momentanée. Vos données et votre carnet de Karna sont en parfaite sécurité.
        </p>
      </div>

      <MoroccanStarBorder />

      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 rounded-xl bg-[var(--rust)] text-white font-bold text-xs hover:bg-[var(--rust-hover)] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Réessayer la connexion</span>
      </button>
    </div>
  );
};
