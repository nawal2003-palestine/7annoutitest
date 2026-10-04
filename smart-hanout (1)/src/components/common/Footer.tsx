import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from './MoroccanStarBorder';
import { Phone, MapPin, Heart, Shield, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <footer className="mt-16 bg-[var(--wall-dark)] border-t border-[var(--border-warm)] text-[var(--ink)] pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Subtle decorative divider */}
        <MoroccanStarBorder className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--rust)] flex items-center justify-center text-white font-bold">
                SH
              </div>
              <span className="font-extrabold text-lg text-[var(--ink)]">
                Smart<span className="text-[var(--rust)]">Hanout</span>
              </span>
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              La digitalisation bienveillante du commerce de proximité au Maroc. Soutien direct
              aux moul lhanouts de quartier, circuits courts, suivi en direct et carnet de confiance (Karna).
            </p>
            <div className="font-kalam text-sm text-[var(--rust)]">
              « Chri men 3and weld lderb o 3awno »
            </div>
          </div>

          {/* Client & Public Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Clients & Visiteurs
            </h4>
            <ul className="text-xs space-y-1.5 text-[var(--ink-muted)]">
              <li>
                <button
                  onClick={() => setCurrentScreen('client-home')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Commander dans mon quartier
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('public-how-it-works')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Comment ça marche
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('client-favorites')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Paniers préférés (Ftour, Couscous)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('client-tracking')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Suivi de livraison en direct
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('public-about')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Notre histoire & Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Partenaires & Hanoutiers */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Moul Lhanout & Livreurs
            </h4>
            <ul className="text-xs space-y-1.5 text-[var(--ink-muted)]">
              <li>
                <button
                  onClick={() => setCurrentScreen('public-become-merchant')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer font-medium text-[var(--rust)]"
                >
                  Devenir Commerçant Partenaire
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('merchant-karna')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Fonctionnement du Karna digital
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('public-become-courier')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Devenir Livreur / Concierge d'immeuble
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('merchant-dashboard')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Espace Gestion Commerçant
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentScreen('courier-available')}
                  className="hover:text-[var(--rust)] transition-colors cursor-pointer"
                >
                  Espace Livreur
                </button>
              </li>
            </ul>
          </div>

          {/* Moroccan Support & Conformance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Support & Légal
            </h4>
            <div className="text-xs space-y-2 text-[var(--ink-muted)]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--moroccan-green)]" />
                <span>+212 5 22 99 88 77 (Casablanca)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[var(--amber-gold)]" />
                <span>Assistance 7j/7 de 07h à 23h30</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[var(--shutter-blue)]" />
                <span>Conforme CNDP & Loi 09-08 Maroc</span>
              </div>
            </div>
            <div className="pt-1">
              <button
                onClick={() => setCurrentScreen('public-legal')}
                className="text-xs text-[var(--ink-muted)] underline hover:text-[var(--rust)] cursor-pointer"
              >
                Mentions légales, CGU & Confidentialité
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-4 border-t border-[var(--border-warm)] flex flex-wrap items-center justify-between text-xs text-[var(--ink-muted)] gap-2">
          <div className="flex items-center gap-1">
            <span>© 2026 Smart Hanout Maroc. Conçu avec</span>
            <Heart className="w-3.5 h-3.5 text-[var(--rust)] fill-[var(--rust)]" />
            <span>pour les quartiers du Royaume.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px]">Casablanca • Rabat • Marrakech • Tanger</span>
            <button
              onClick={() => setCurrentScreen('admin-orders')}
              className="text-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)] font-mono"
            >
              [Accès Admin]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
