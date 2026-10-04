import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Heart, ShieldCheck, Users, Store, ArrowRight, Award } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 text-left">
      {/* Top Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="font-kalam text-lg text-[var(--rust)] font-bold">Notre Raison d'Être</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
          Sauvegarder et réinventer le Hanout marocain
        </h1>
        <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
          Le hanout n'est pas un simple commerce. C'est le cœur battant du quartier marocain, le gardien
          des clés, la mémoire du derb et le premier garant de la solidarité quotidienne.
        </p>
      </div>

      <MoroccanStarBorder />

      {/* Origin Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--wall-dark)] text-xs font-semibold text-[var(--ink)]">
            L'histoire de Smart Hanout
          </div>
          <h2 className="text-2xl font-bold text-[var(--ink)]">
            Né dans une ruelle de Bourgogne à Casablanca
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
            Face à l'arrivée massive des applications de livraison standardisées et des supermarchés
            étrangers, nos petits commerçants perdaient pied. Pourtant, personne ne connaît mieux nos
            familles et nos besoins que Ba Driss ou Si Mohamed.
          </p>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
            Nous avons créé <strong>Smart Hanout</strong> pour donner à ces commerçants les outils digitaux
            les plus avancés (gestion de stock, traçabilité des commandes, paiements) tout en respectant
            leurs usages séculaires, à commencer par le <strong>Karna</strong> (crédit de confiance).
          </p>
        </div>

        {/* Handcrafted Quote Box */}
        <div className="p-8 rounded-2xl bg-[var(--karna-paper)] border border-[var(--border-warm)] shadow-md space-y-4">
          <div className="font-kalam text-xl text-[var(--rust)] leading-relaxed">
            « Quand une mère de famille n'a pas assez d'argent à la fin du mois, elle ne va pas au supermarché.
            Elle va chez son hanoutier qui lui dit "Kteb f l-karna, hta l-chher jay". Cette confiance humaine
            est irremplaçable. Notre devoir était de la numériser avec dignité. »
          </div>
          <div className="pt-3 border-t border-[var(--border-warm)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
            <span className="font-bold text-[var(--ink)]">Les Fondateurs de Smart Hanout</span>
            <span className="font-mono">Casablanca • 2026</span>
          </div>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-[var(--ink)]">Nos 4 Piliers Fondamentaux</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[var(--border-warm)] space-y-2">
            <Store className="w-6 h-6 text-[var(--rust)]" />
            <h4 className="text-sm font-bold text-[var(--ink)]">100% Proximité</h4>
            <p className="text-xs text-[var(--ink-muted)]">
              Chaque dirham dépensé va directement au commerçant indépendant de votre rue.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[var(--border-warm)] space-y-2">
            <Heart className="w-6 h-6 text-[var(--moroccan-green)]" />
            <h4 className="text-sm font-bold text-[var(--ink)]">Confiance & Karna</h4>
            <p className="text-xs text-[var(--ink-muted)]">
              Le carnet de crédit séculaire maintenant consigné sans ratures ni pertes de données.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[var(--border-warm)] space-y-2">
            <Users className="w-6 h-6 text-[var(--shutter-blue)]" />
            <h4 className="text-sm font-bold text-[var(--ink)]">Inclusion des Concierges</h4>
            <p className="text-xs text-[var(--ink-muted)]">
              Les gardiens et concierges d'immeubles peuvent livrer leurs résidents et arrondir leurs fins de mois.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[var(--border-warm)] space-y-2">
            <Award className="w-6 h-6 text-[var(--amber-gold)]" />
            <h4 className="text-sm font-bold text-[var(--ink)]">Prix Justes Comptoir</h4>
            <p className="text-xs text-[var(--ink-muted)]">
              Zéro marge abusive sur les produits de première nécessité (pain, lait, thé, huile).
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="p-6 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-[var(--ink)]">Envie de soutenir votre quartier ?</h4>
          <p className="text-xs text-[var(--ink-muted)]">Découvrez les hanouts actifs autour de vous</p>
        </div>
        <button
          onClick={() => setCurrentScreen('client-home')}
          className="px-5 py-2.5 rounded-xl bg-[var(--rust)] text-white text-xs font-bold hover:bg-[var(--rust-hover)] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Accéder aux Commerces</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
