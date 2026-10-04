import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanChalkboard } from '../../components/common/MoroccanChalkboard';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  BookOpen,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Truck,
  HeartHandshake,
  Star,
} from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const { setCurrentScreen, stores, setSelectedStore } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 bg-gradient-to-b from-[var(--wall)] via-[var(--wall-dark)]/40 to-[var(--wall)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--rust-light)] border border-[var(--rust)]/30 text-xs font-semibold text-[var(--rust)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>La digitalisation respectueuse de nos quartiers</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--ink)] leading-tight">
                Votre <span className="text-[var(--rust)] underline decoration-[var(--amber-gold)] decoration-wavy decoration-2">Moul Lhanout</span> de quartier, désormais à portée de clic.
              </h1>

              <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-xl leading-relaxed">
                Pain chaud du four, thé Sultan, Raïbi frais et condiments livrés en 15 minutes par
                votre épicier ou le concierge de l'immeuble. Avec option{' '}
                <strong className="text-[var(--rust)] font-semibold">Carnet de Karna</strong> pour
                les habitués de confiance.
              </p>

              {/* Fast search bar */}
              <div className="p-2 bg-white rounded-2xl border-2 border-[var(--rust)] shadow-lg max-w-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <MapPin className="w-5 h-5 text-[var(--rust)] shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Votre quartier (ex: Bourgogne, Agdal, Guéliz...)"
                    className="w-full text-sm py-2 text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-hidden"
                  />
                </div>
                <button
                  onClick={() => setCurrentScreen('client-home')}
                  className="px-6 py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Search className="w-4 h-4" />
                  <span>Trouver mon Hanout</span>
                </button>
              </div>

              {/* Quick perks */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[var(--ink-muted)] pt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[var(--moroccan-green)]" />
                  <span>Livraison en 15-20 min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[var(--amber-gold)]" />
                  <span>Karna digital sécurisé</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--shutter-blue)]" />
                  <span>Mêmes prix qu'au comptoir</span>
                </div>
              </div>
            </div>

            {/* Right: Authentic Chalkboard & Day Specials */}
            <div className="lg:col-span-5 space-y-4">
              <MoroccanChalkboard
                title="L'Arrivage du Jour chez Ba Driss"
                subtitle="Tableau à craie — Rue Abou Ishak El Marouni"
              />

              {/* Live quick store badge */}
              <div
                onClick={() => {
                  setSelectedStore(stores[0]);
                  setCurrentScreen('client-store');
                }}
                className="p-3.5 bg-white rounded-xl border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--ink)]">{stores[0].name}</h4>
                    <p className="text-xs text-[var(--ink-muted)]">
                      {stores[0].neighborhood} • Ouvert maintenant
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--rust)] flex items-center gap-1">
                  Voir <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moroccan Hanout Values */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="font-kalam text-lg text-[var(--rust)] font-bold">
            Pourquoi Smart Hanout ?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Moderniser sans dénaturer l'âme du hanout marocain
          </h2>
          <p className="text-sm text-[var(--ink-muted)]">
            Nous ne remplaçons pas votre épicier par des entrepôts froids. Nous lui donnons les
            mêmes armes technologiques que les multinationales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--ink)]">Le Carnet de Karna Digital</h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              La tradition de confiance marocaine préservée : notez vos courses du mois en toute
              transparence, suivez votre solde en temps réel et réglez à la fin du mois.
            </p>
            <div className="font-kalam text-sm text-[var(--rust)] font-bold">
              « Kteb lia f lkarna a Ba Driss »
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--ink)]">Livraison Ultra-Locale (15 min)</h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Livré par le commis du hanout ou le concierge d'immeuble qui connaît déjà vos étages.
              Zéro perte de temps, suivi GPS en direct jusqu'à votre pas de porte.
            </p>
            <div className="font-kalam text-sm text-[var(--moroccan-green)] font-bold">
              « Wsal l-dar en un clin d’œil »
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--amber-gold-light)] text-[var(--amber-gold)] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[var(--ink)]">Soutien aux Commerces Locaux</h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              100% de la valeur reste dans votre quartier. Vous soutenez directement les familles et
              artisans de votre derb tout en profitant d'une app ultra moderne.
            </p>
            <div className="font-kalam text-sm text-[var(--amber-gold)] font-bold">
              « Baraka o Khayr f l-houma »
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stores in Neighbourhood */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-3">
          <div>
            <span className="font-kalam text-sm text-[var(--rust)] font-bold">Commerces de Proximité</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--ink)]">
              Les Hanouts les plus populaires autour de vous
            </h2>
          </div>
          <button
            onClick={() => setCurrentScreen('client-home')}
            className="text-xs font-bold text-[var(--rust)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Voir tous les hanouts <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stores.slice(0, 3).map((st) => (
            <div
              key={st.id}
              onClick={() => {
                setSelectedStore(st);
                setCurrentScreen('client-store');
              }}
              className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] hover:shadow-md transition-all cursor-pointer space-y-3 text-left group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-[var(--ink)] group-hover:text-[var(--rust)] transition-colors">
                    {st.name}
                  </h3>
                  <p className="text-xs text-[var(--ink-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--rust)]" />
                    <span>{st.neighborhood}, {st.city}</span>
                  </p>
                </div>
                <span className="px-2 py-1 rounded-lg bg-[var(--amber-gold-light)] text-[var(--amber-gold)] text-xs font-bold flex items-center gap-1 border border-[var(--amber-gold)]/20">
                  <Star className="w-3 h-3 fill-current" />
                  {st.rating}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--wall-dark)] text-xs text-[var(--ink)] italic font-kalam">
                {st.bannerNote}
              </div>

              <div className="pt-2 border-t border-[var(--border-warm)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--moroccan-green)]" />
                  {st.deliveryTimeMinutes} min
                </span>
                {st.hasKarna && (
                  <span className="px-2 py-0.5 rounded bg-[var(--rust-light)] text-[var(--rust)] font-semibold text-[11px]">
                    Karna Activé
                  </span>
                )}
                <span className="font-semibold text-[var(--ink)]">
                  Min {st.minOrderDh} DH
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual CTA: Client vs Commerçant */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-4 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--moroccan-green)]">
              Pour les habitants du quartier
            </span>
            <h3 className="text-2xl font-bold text-[var(--ink)]">
              Ne descendez plus pour une bouteille d'eau ou un paquet de thé
            </h3>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Accédez à l'ensemble du catalogue de votre hanout habituel. Vos habitudes, vos marques
              marocaines préférées, sans frais cachés.
            </p>
            <button
              onClick={() => setCurrentScreen('client-home')}
              className="px-5 py-2.5 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Commander Maintenant</span>
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-[#2A2118] text-white space-y-4 text-left shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--amber-gold)]">
              Vous êtes Moul Lhanout ?
            </span>
            <h3 className="text-2xl font-bold text-white font-kalam">
              Digitalisez votre commerce et augmentez votre chiffre d'affaires
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              Rejoignez le réseau Smart Hanout. Gérez facilement vos commandes, votre carnet de Karna,
              et vos stocks depuis un écran pensé spécialement pour vous.
            </p>
            <button
              onClick={() => setCurrentScreen('public-become-merchant')}
              className="px-5 py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <span>Rejoindre Smart Hanout (Gratuit)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
