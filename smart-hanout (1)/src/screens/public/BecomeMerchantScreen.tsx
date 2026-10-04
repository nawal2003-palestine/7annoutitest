import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Store, TrendingUp, CheckCircle, Calculator, Phone, MapPin, Send } from 'lucide-react';

export const BecomeMerchantScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [dailyOrders, setDailyOrders] = useState<number>(25);
  const [avgBasketDh, setAvgBasketDh] = useState<number>(45);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Revenue simulator
  const monthlyRevenueBoostDh = Math.round(dailyOrders * avgBasketDh * 30 * 0.18);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 text-left">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="font-kalam text-lg text-[var(--rust)] font-bold">Moul Lhanout Partenaire</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
          Rejoignez le premier réseau marocain d'épiceries connectées
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Gardez votre indépendance, touchez de nouveaux voisins et sécurisez vos créances Karna.
        </p>
      </div>

      <MoroccanStarBorder />

      {/* Simulator + Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Simulator */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[var(--chalkboard)] text-white shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-white/20 pb-3">
            <Calculator className="w-5 h-5 text-[var(--amber-gold)]" />
            <h3 className="font-bold text-base text-white">Simulateur de Revenus Supplémentaires</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1">
                <span>Commandes en ligne estimées par jour :</span>
                <span className="font-bold text-[var(--amber-gold)] font-mono">{dailyOrders} cmd/j</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full accent-[var(--rust)] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1">
                <span>Panier moyen par commande :</span>
                <span className="font-bold text-[var(--amber-gold)] font-mono">{avgBasketDh} DH</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                value={avgBasketDh}
                onChange={(e) => setAvgBasketDh(Number(e.target.value))}
                className="w-full accent-[var(--rust)] cursor-pointer"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-center space-y-1">
            <span className="text-xs text-stone-300">Bénéfice net estimé additionnel :</span>
            <div className="text-3xl font-extrabold text-[var(--amber-gold)] font-mono">
              +{monthlyRevenueBoostDh.toLocaleString()} DH <span className="text-sm font-sans">/ mois</span>
            </div>
            <p className="text-[11px] text-stone-400">
              Soit environ +{(monthlyRevenueBoostDh * 12).toLocaleString()} DH de rentabilité annuelle.
            </p>
          </div>

          <div className="space-y-2 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tablette ou application mobile offerte au démarrage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Assistance d'un conseiller sur place dans votre hanout</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Numérisation gratuite de votre carnet de Karna existant</span>
            </div>
          </div>
        </div>

        {/* Lead Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[var(--ink)]">Inscrivez votre Hanout en 2 minutes</h3>
            <p className="text-xs text-[var(--ink-muted)]">
              Un représentant Smart Hanout vous contactera par téléphone ou viendra boire un thé à votre boutique.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-xl bg-[var(--moroccan-green-light)] border border-[var(--moroccan-green)]/30 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-[var(--moroccan-green)] mx-auto" />
              <h4 className="font-bold text-base text-[var(--moroccan-green)]">Demande reçue avec succès !</h4>
              <p className="text-xs text-[var(--ink)]">
                Marhaba bik ! Notre délégué commercial de votre ville vous appellera sous 24h.
              </p>
              <button
                onClick={() => setCurrentScreen('merchant-dashboard')}
                className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] text-white text-xs font-bold hover:bg-[var(--moroccan-green-hover)] transition-colors cursor-pointer"
              >
                Tester l'interface commerçant dès maintenant
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Nom de l'épicerie / Hanout</label>
                  <input
                    required
                    defaultValue="Épicerie Al Baraka"
                    placeholder="Ex: Hanout Ba Driss"
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Nom du gérant / propriétaire</label>
                  <input
                    required
                    defaultValue="Si Mohamed"
                    placeholder="Votre nom complet"
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Téléphone portable (+212)</label>
                  <input
                    required
                    defaultValue="06 61 00 00 00"
                    placeholder="06 XX XX XX XX"
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Ville</label>
                  <select className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]">
                    <option>Casablanca</option>
                    <option>Rabat - Salé</option>
                    <option>Marrakech</option>
                    <option>Tanger</option>
                    <option>Fès</option>
                    <option>Agadir</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)]">Quartier & Adresse exacte</label>
                <input
                  required
                  defaultValue="Maarif, Rue Ibn Kathir (près de la pharmacie)"
                  placeholder="Quartier et repère bien connu du derb"
                  className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[var(--wall-dark)] text-[var(--ink-muted)] space-y-1">
                <span className="font-bold text-[var(--ink)]">Avez-vous déjà un carnet de Karna papier ?</span>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="hasKarna" defaultChecked className="accent-[var(--rust)]" />
                    <span>Oui, avec mes clients habituels</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="hasKarna" className="accent-[var(--rust)]" />
                    <span>Non, seulement au comptant</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma demande d'adhésion</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
