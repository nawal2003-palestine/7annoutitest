import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { ShieldCheck, FileText, Lock, Globe } from 'lucide-react';

export const LegalScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-left">
      <div className="text-center space-y-2">
        <span className="font-kalam text-lg text-[var(--rust)] font-bold">Cadre Juridique Marocain</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Mentions Légales, CGU & Confidentialité
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Dernière mise à jour : 1er Octobre 2026 — Conforme CNDP & Loi 09-08
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-6 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[var(--rust)]" />
            <span>1. Éditeur de la Plateforme</span>
          </h2>
          <p>
            Le service <strong>Smart Hanout</strong> est édité par la société <em>Smart Hanout SARL AU</em>,
            société de droit marocain immatriculée au Registre de Commerce de Casablanca sous le n° 542190,
            IF n° 48102941, Patente n° 3519820, siège social : Boulevard d'Anfa, Casablanca, Maroc.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[var(--moroccan-green)]" />
            <span>2. Protection des Données Personnelles (Loi n° 09-08 - CNDP)</span>
          </h2>
          <p>
            Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques
            à l'égard du traitement des données à caractère personnel, les données collectées (nom,
            numéro de téléphone marocain, géolocalisation pour la livraison, historique des commandes)
            sont strictement réservées au traitement logistique des commandes et au carnet de Karna.
          </p>
          <p>
            Ce traitement a fait l'objet d'une déclaration préalable auprès de la <strong>CNDP (Commission
            Nationale de contrôle de la protection des Données à caractère Personnel)</strong> sous le récépissé
            n° D-W-2026/8921.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[var(--amber-gold)]" />
            <span>3. Régime du Carnet de Karna (Crédit Client)</span>
          </h2>
          <p>
            Le système de crédit différé dit <strong>« Karna »</strong> constitue une facilité de paiement
            consentie à titre gracieux et de confiance mutuelle par le commerçant indépendant (moul lhanout)
            au profit exclusif de ses clients réguliers. Smart Hanout agit uniquement en tant que tiers
            technologique d'enregistrement et de transparence, sans intermédiaire financier ou taux d'intérêt usuraire.
          </p>
          <p>
            Le client s'engage sur l'honneur à régler les montants inscrits dans son Karna selon les modalités
            convenues directement avec son commerçant (généralement en fin de mois civil).
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--shutter-blue)]" />
            <span>4. Suivi Géographique & Positionnement des Livreurs</span>
          </h2>
          <p>
            La localisation GPS transmise lors de la livraison est temporaire et cesse dès la validation de la remise
            de commande en main propre. Aucune conservation permanente des trajets n'est exploitée à des fins
            commerciales tierces.
          </p>
        </section>
      </div>
    </div>
  );
};
