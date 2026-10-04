import React, { useState } from 'react';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Lock, Tablet, ShieldCheck, CheckCircle } from 'lucide-react';

export const MerchantSecurityScreen: React.FC = () => {
  const [pinSaved, setPinSaved] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Sécurité & Terminal de Caisse
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Code PIN caissier et verrouillage du terminal commerçant
        </p>
      </div>

      <MoroccanStarBorder />

      {/* Quick PIN */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[var(--rust)]" />
          <span>Code PIN de Caisse Rapide (4 chiffres)</span>
        </h3>

        {pinSaved && (
          <div className="p-3 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Nouveau code PIN enregistré !</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPinSaved(true);
            setTimeout(() => setPinSaved(false), 2500);
          }}
          className="space-y-3 text-xs"
        >
          <div className="flex gap-2">
            {['1', '2', '3', '4'].map((_, i) => (
              <input
                key={i}
                type="password"
                maxLength={1}
                defaultValue="•"
                className="w-12 h-14 text-center text-xl font-bold font-mono rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold transition-colors cursor-pointer shadow-xs"
          >
            Mettre à jour le code PIN
          </button>
        </form>
      </div>

      {/* POS Device status */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
          <Tablet className="w-4 h-4 text-[var(--moroccan-green)]" />
          <span>Terminal Actif au Hanout</span>
        </h3>
        <div className="p-3.5 rounded-2xl bg-[var(--wall)] border border-[var(--border-warm)] flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-[var(--ink)]">Tablette Hanout — Samsung Galaxy Tab A9</div>
            <div className="text-[11px] text-[var(--ink-muted)]">Connectée en WiFi (Maroc Telecom Fibre)</div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Synchronisée
          </span>
        </div>
      </div>
    </div>
  );
};
