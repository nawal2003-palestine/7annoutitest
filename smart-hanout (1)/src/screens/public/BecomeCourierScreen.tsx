import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Bike, Building, CheckCircle, Wallet, MapPin, Send, ShieldCheck } from 'lucide-react';

export const BecomeCourierScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [courierType, setCourierType] = useState<'pro' | 'concierge'>('pro');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 text-left">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="font-kalam text-lg text-[var(--rust)] font-bold">Rejoindre l'Équipe Terrain</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
          Devenez Livreur Partenaire ou Concierge Référent
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Des trajets courts au sein même de votre quartier. Livrez à pied, à vélo ou à moto,
          sans stress et avec des gains garantis chaque semaine.
        </p>
      </div>

      <MoroccanStarBorder />

      {/* Dual Role Picker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => setCourierType('pro')}
          className={`p-6 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
            courierType === 'pro'
              ? 'bg-white border-[var(--rust)] shadow-md'
              : 'bg-white/60 border-[var(--border-warm)] hover:border-[var(--rust)]/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center">
              <Bike className="w-6 h-6" />
            </div>
            {courierType === 'pro' && (
              <span className="text-xs font-bold text-[var(--rust)] bg-[var(--rust-light)] px-2.5 py-1 rounded-full">
                Sélectionné
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[var(--ink)]">Livreur Moto / Vélo</h3>
          <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
            Pour les coursiers indépendants. Courses courtes (500m à 2km max), paiement direct par course
            (12 à 20 DH selon distance) + 100% des pourboires.
          </p>
        </div>

        <div
          onClick={() => setCourierType('concierge')}
          className={`p-6 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
            courierType === 'concierge'
              ? 'bg-white border-[var(--moroccan-green)] shadow-md'
              : 'bg-white/60 border-[var(--border-warm)] hover:border-[var(--moroccan-green)]/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
            {courierType === 'concierge' && (
              <span className="text-xs font-bold text-[var(--moroccan-green)] bg-[var(--moroccan-green-light)] px-2.5 py-1 rounded-full">
                Sélectionné
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[var(--ink)]">Concierge / Gardien d'Immeuble</h3>
          <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
            Gagnez un revenu d'appoint en montant les courses du hanout du coin aux résidents de votre
            immeuble. Zéro moyen de transport requis, confiance immédiate.
          </p>
        </div>
      </div>

      {/* Form & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-4">
          <h4 className="font-bold text-base text-[var(--ink)]">Avantages Smart Hanout</h4>
          <div className="space-y-3 text-xs text-[var(--ink-muted)]">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-4 h-4 text-[var(--moroccan-green)] shrink-0" />
              <span>Paiement hebdomadaire par virement ou Cash Plus</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[var(--rust)] shrink-0" />
              <span>Rayon limité à votre propre quartier : zéro embouteillage</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[var(--shutter-blue)] shrink-0" />
              <span>Assurance accident incluse sur chaque trajet actif</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[var(--border-warm)] space-y-1">
            <div className="font-kalam text-lg text-[var(--rust)] font-bold">
              Gains moyens constatés
            </div>
            <p className="text-2xl font-extrabold font-mono text-[var(--ink)]">
              3 500 à 6 000 DH <span className="text-xs font-sans font-normal text-[var(--ink-muted)]">/ mois</span>
            </p>
            <p className="text-[11px] text-[var(--ink-muted)]">Selon vos disponibilités et horaires choisis.</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[var(--ink)]">Postuler en quelques clics</h3>
            <p className="text-xs text-[var(--ink-muted)]">
              Remplissez ce formulaire court pour être activé sous 48h après vérification de votre CIN.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-[var(--moroccan-green-light)] border border-[var(--moroccan-green)]/30 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-[var(--moroccan-green)] mx-auto" />
              <h4 className="font-bold text-base text-[var(--moroccan-green)]">Dossier pré-enregistré !</h4>
              <p className="text-xs text-[var(--ink)]">
                Notre coordinateur de flotte vous contactera par WhatsApp pour valider votre pièce d'identité.
              </p>
              <button
                onClick={() => setCurrentScreen('courier-available')}
                className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] text-white text-xs font-bold hover:bg-[var(--moroccan-green-hover)] transition-colors cursor-pointer"
              >
                Accéder à l'écran de missions livreur
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Nom complet</label>
                  <input
                    required
                    defaultValue="Hamza El Fassi"
                    placeholder="Votre prénom et nom"
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Téléphone (+212)</label>
                  <input
                    required
                    defaultValue="06 54 21 88 90"
                    placeholder="06 XX XX XX XX"
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Ville d'intervention</label>
                  <select className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]">
                    <option>Casablanca</option>
                    <option>Rabat</option>
                    <option>Marrakech</option>
                    <option>Tanger</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[var(--ink)]">Quartier de résidence</label>
                  <input
                    required
                    defaultValue="Bourgogne"
                    placeholder="Ex: Bourgogne, Maarif, Agdal..."
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[var(--ink)]">Moyen de déplacement</label>
                <select className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)] focus:outline-hidden focus:border-[var(--rust)]">
                  <option>Moto / Scooter (50cc ou 125cc)</option>
                  <option>Vélo / Vélo électrique</option>
                  <option>À pied (uniquement pour concierges et résidences)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma candidature livreur</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
