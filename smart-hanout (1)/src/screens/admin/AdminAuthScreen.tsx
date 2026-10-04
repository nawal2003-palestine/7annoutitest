import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export const AdminAuthScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [email, setEmail] = useState('admin@smarthanout.ma');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentScreen('admin-orders');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-purple-700 text-white flex items-center justify-center font-bold mx-auto shadow-md">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">Portail Super-Admin</h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Supervision globale du réseau national Smart Hanout
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4 text-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-bold block mb-1">Identifiant Administrateur</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1">Clé de sécurité ou Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
              <input
                type="password"
                required
                defaultValue="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Connexion Superviseur</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
