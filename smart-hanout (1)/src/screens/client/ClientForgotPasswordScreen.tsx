import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Phone, ArrowLeft, Send, CheckCircle } from 'lucide-react';

export const ClientForgotPasswordScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [phone, setPhone] = useState('06 61 88 23 11');
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">Mot de passe oublié</h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Recevez un code de sécurité par SMS pour réinitialiser votre accès
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        {sent ? (
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-[var(--moroccan-green)] mx-auto" />
            <h3 className="font-bold text-sm text-[var(--ink)]">Code SMS envoyé à {phone}</h3>
            <p className="text-xs text-[var(--ink-muted)]">
              Entrez le code à 4 chiffres reçu sur votre mobile pour choisir votre nouveau mot de passe.
            </p>
            <div className="flex justify-center gap-2">
              {['4', '9', '2', '0'].map((digit, i) => (
                <input
                  key={i}
                  defaultValue={digit}
                  maxLength={1}
                  className="w-10 h-12 text-center text-lg font-bold border border-[var(--border-warm)] rounded-xl bg-[var(--wall)] text-[var(--ink)] font-mono"
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentScreen('client-login')}
              className="w-full py-2.5 rounded-xl bg-[var(--moroccan-green)] text-white text-xs font-bold hover:bg-[var(--moroccan-green-hover)] transition-colors cursor-pointer"
            >
              Valider et me connecter
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
                Numéro de téléphone marocain (+212)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06 XX XX XX XX"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Recevoir le code par SMS</span>
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-[var(--border-warm)] text-center">
          <button
            onClick={() => setCurrentScreen('client-login')}
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
