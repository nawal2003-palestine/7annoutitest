import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  ShoppingBag,
  Store,
  Bike,
  CheckCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Smartphone,
  PackageCheck,
  CreditCard,
} from 'lucide-react';

export const HowItWorksScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState<'client' | 'merchant' | 'courier'>('client');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 text-left">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="font-kalam text-lg text-[var(--rust)] font-bold">Simple, Rapide & Familier</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
          Comment fonctionne Smart Hanout ?
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Choisissez votre parcours pour comprendre comment la plateforme simplifie votre quotidien.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] gap-2">
          <button
            onClick={() => setActiveTab('client')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'client'
                ? 'bg-white text-[var(--rust)] shadow-sm'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pour le Client</span>
          </button>
          <button
            onClick={() => setActiveTab('merchant')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'merchant'
                ? 'bg-white text-[var(--rust)] shadow-sm'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Pour le Commerçant</span>
          </button>
          <button
            onClick={() => setActiveTab('courier')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'courier'
                ? 'bg-white text-[var(--rust)] shadow-sm'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Pour le Livreur / Concierge</span>
          </button>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Tab 1: Client */}
      {activeTab === 'client' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-full bg-[var(--rust-light)] text-[var(--rust)] font-mono font-bold flex items-center justify-center text-sm">
                1
              </span>
              <h3 className="font-bold text-sm text-[var(--ink)]">Trouvez votre Hanout</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Géolocalisez les épiceries ouvertes dans votre derb à Casablanca, Rabat ou Marrakech.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-full bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] font-mono font-bold flex items-center justify-center text-sm">
                2
              </span>
              <h3 className="font-bold text-sm text-[var(--ink)]">Remplissez le Panier</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Khobz chaud, Raïbi, Atay Sultan, légumes ou produits d'hygiène aux prix exacts du comptoir.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-full bg-[var(--amber-gold-light)] text-[var(--amber-gold)] font-mono font-bold flex items-center justify-center text-sm">
                3
              </span>
              <h3 className="font-bold text-sm text-[var(--ink)]">Payez Cash ou Karna</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Payez à la remise du colis en espèces ou demandez l'inscription sur votre carnet Karna habituel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-full bg-[var(--shutter-blue-light)] text-[var(--shutter-blue)] font-mono font-bold flex items-center justify-center text-sm">
                4
              </span>
              <h3 className="font-bold text-sm text-[var(--ink)]">Livré en 15 min</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Suivez votre livreur en temps réel sur la carte interactive jusqu'au pied de votre immeuble.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setCurrentScreen('client-home')}
              className="px-6 py-3 rounded-xl bg-[var(--rust)] text-white text-xs font-bold hover:bg-[var(--rust-hover)] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Commencer mes courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Merchant */}
      {activeTab === 'merchant' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3">
              <Smartphone className="w-8 h-8 text-[var(--rust)]" />
              <h3 className="font-bold text-base text-[var(--ink)]">Interface ultra-simple</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Pas besoin d'être un génie de l'informatique. Gros boutons, sonnette marocaine d'arrivée de commande et affichage clair en Darija et Français.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3">
              <BookOpen className="w-8 h-8 text-[var(--amber-gold)]" />
              <h3 className="font-bold text-base text-[var(--ink)]">Le Karna sans les erreurs</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Fini le carnet papier qui s'égare avec le thé renversé. Les dettes de vos clients sont consignées, avec alerte de plafond et reçus automatiques.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3">
              <PackageCheck className="w-8 h-8 text-[var(--moroccan-green)]" />
              <h3 className="font-bold text-base text-[var(--ink)]">Gestion de stock en direct</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Alertes automatiques quand il ne reste que 5 paquets de thé ou 2 bouteilles d'huile. Ne soyez plus jamais en rupture de stock.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setCurrentScreen('public-become-merchant')}
              className="px-6 py-3 rounded-xl bg-[var(--rust)] text-white text-xs font-bold hover:bg-[var(--rust-hover)] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Inscrire mon Hanout gratuitement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Courier */}
      {activeTab === 'courier' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3">
              <Clock className="w-8 h-8 text-[var(--shutter-blue)]" />
              <h3 className="font-bold text-base text-[var(--ink)]">Rayon ultra-court (derb)</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Pas besoin de traverser la ville. Vos courses se font dans un rayon de 500m à 1.5km autour de vous. À pied, à vélo ou en moto.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3">
              <CreditCard className="w-8 h-8 text-[var(--moroccan-green)]" />
              <h3 className="font-bold text-base text-[var(--ink)]">Revenus réguliers en DH</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Rémunération par course + pourboires des voisins. Les gains sont versés chaque semaine sur votre compte ou portefeuille Cash Plus / CIH.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3">
              <Bike className="w-8 h-8 text-[var(--amber-gold)]" />
              <h3 className="font-bold text-base text-[var(--ink)]">Idéal pour les Concierges</h3>
              <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                Gardien d'immeuble ? Livrez les habitants de votre résidence directement depuis le hanout d'en face et complétez vos revenus sans vous éloigner.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setCurrentScreen('public-become-courier')}
              className="px-6 py-3 rounded-xl bg-[var(--rust)] text-white text-xs font-bold hover:bg-[var(--rust-hover)] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Rejoindre la flotte du quartier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
