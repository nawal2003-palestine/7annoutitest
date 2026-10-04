import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Phone, ArrowLeft, Send, CheckCircle } from 'lucide-react';

export const MerchantForgotScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [phone, setPhone] = useState('06 61 24 89 12');
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">Récupération Hanoutier</h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Recevez votre code de réinitialisation commerçant par SMS
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        {sent ? (
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-[var(--moroccan-green)] mx-auto" />
            <h3 className="font-bold text-sm text-[var(--ink)]">SMS envoyé à {phone}</h3>
            <p className="text-xs text-[var(--ink-muted)]">
              Entrez le code à 4 chiffres envoyé sur la ligne de votre boutique.
            </p>
            <div className="flex justify-center gap-2">
              {['7', '3', '1', '9'].map((digit, i) => (
                <input
                  key={i}
                  defaultValue={digit}
                  maxLength={1}
                  className="w-10 h-12 text-center text-lg font-bold border border-[var(--border-warm)] rounded-xl bg-[var(--wall)] font-mono"
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentScreen('merchant-dashboard')}
              className="w-full py-2.5 rounded-xl bg-[var(--moroccan-green)] text-white text-xs font-bold hover:bg-[var(--moroccan-green-hover)] transition-colors cursor-pointer"
            >
              Réinitialiser et ouvrir le Dashboard
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Numéro du hanoutier (+212)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Recevoir le code PIN par SMS</span>
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-[var(--border-warm)] text-center">
          <button
            onClick={() => setCurrentScreen('merchant-auth')}
            className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour à la connexion</span>
          </button>
        </div>
      </div>
    </div>
  );
};
