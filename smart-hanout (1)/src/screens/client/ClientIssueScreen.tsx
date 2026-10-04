import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { AlertTriangle, ArrowLeft, Send, CheckCircle, Phone } from 'lucide-react';

export const ClientIssueScreen: React.FC = () => {
  const { activeOrder, setCurrentScreen } = useApp();
  const [issueType, setIssueType] = useState('missing_item');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <button
          onClick={() => setCurrentScreen('client-tracking')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au suivi de commande</span>
        </button>
        <h1 className="text-2xl font-extrabold text-[var(--ink)] mt-2">
          Signaler un Problème ou Annuler
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Commande n° {activeOrder.orderNumber} • {activeOrder.storeName}
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        {submitted ? (
          <div className="p-6 rounded-2xl bg-[var(--moroccan-green-light)] border border-[var(--moroccan-green)]/30 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-[var(--moroccan-green)] mx-auto" />
            <h3 className="font-bold text-base text-[var(--moroccan-green)]">
              Signalement transmis à {activeOrder.storeName}
            </h3>
            <p className="text-xs text-[var(--ink)]">
              Votre réclamation a été notifiée au commerçant et à notre service d'assistance. Vous
              serez remboursé ou livré du produit manquant sous 20 minutes.
            </p>
            <button
              onClick={() => setCurrentScreen('client-home')}
              className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] text-white text-xs font-bold hover:bg-[var(--moroccan-green-hover)] transition-colors cursor-pointer"
            >
              Retour à l'accueil
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
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Nature du problème rencontré
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              >
                <option value="missing_item">Produit manquant dans le sac</option>
                <option value="damaged">Produit endommagé ou renversé</option>
                <option value="delay">Retard important de livraison</option>
                <option value="wrong_item">Article différent de celui commandé</option>
                <option value="cancel">Demande d'annulation avant acceptation</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Détails explicatifs
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Expliquez ce qui ne va pas (ex: il manque 2 Raïbi sur les 4 commandés)..."
                className="w-full p-3 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--wall-dark)] text-xs text-[var(--ink-muted)] flex items-center justify-between">
              <span>Besoin d'aide immédiate par téléphone ?</span>
              <a
                href="tel:+212522998877"
                className="font-bold text-[var(--rust)] flex items-center gap-1 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+212 5 22 99 88 77</span>
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Transmettre ma réclamation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
