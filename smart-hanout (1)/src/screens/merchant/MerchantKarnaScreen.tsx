import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { KarnaEntry } from '../../types';
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle,
  AlertCircle,
  Coins,
  History,
  Phone,
  User,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';

export const MerchantKarnaScreen: React.FC = () => {
  const { karnaEntries, addKarnaPayment, selectedStore } = useApp();
  const [search, setSearch] = useState('');
  const [selectedKarna, setSelectedKarna] = useState<KarnaEntry>(karnaEntries[0]);
  const [paymentAmount, setPaymentAmount] = useState<number>(50);
  const [paymentNotice, setPaymentNotice] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);

  const filteredEntries = karnaEntries.filter((k) =>
    k.clientName.toLowerCase().includes(search.toLowerCase()) ||
    k.clientPhone.includes(search)
  );

  const totalOutstanding = karnaEntries.reduce((sum, k) => sum + k.currentDebtDh, 0);

  const handleRegisterPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) return;
    addKarnaPayment(selectedKarna.id, paymentAmount, 'Au comptoir');
    setPaymentNotice(true);
    setTimeout(() => setPaymentNotice(false), 2500);

    // Update local selection
    setSelectedKarna((prev) => ({
      ...prev,
      currentDebtDh: Math.max(0, prev.currentDebtDh - paymentAmount),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      {/* Top Banner styled like traditional grocery ledger */}
      <div className="p-6 rounded-3xl bg-[var(--karna-paper)] border-2 border-[var(--border-warm)] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[var(--rust)] text-white flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </span>
            <h1 className="font-kalam text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
              Carnet de Karna Digital — {selectedStore.name}
            </h1>
          </div>
          <p className="text-xs text-[var(--ink-muted)]">
            La comptabilité de confiance de nos derbs marocains : zéro intérêt, transparence totale
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] text-right">
          <span className="text-[11px] text-[var(--ink-muted)] block">Total Créances Clients Actives</span>
          <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
            {totalOutstanding.toFixed(2)} DH
          </div>
          <span className="text-[10px] text-stone-500 font-mono">
            {karnaEntries.length} familles de confiance enregistrées
          </span>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Main Grid: Client List on Left, Ruled Karna Book on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Client list */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[var(--ink)]">Clients du Quartier</h3>
            <span className="text-xs font-mono text-[var(--ink-muted)]">
              {filteredEntries.length} inscrits
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[var(--ink-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher par nom ou tél..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
            />
          </div>

          <div className="space-y-2">
            {filteredEntries.map((client) => {
              const isSelected = selectedKarna.id === client.id;
              const ratio = (client.currentDebtDh / client.creditLimitDh) * 100;
              return (
                <div
                  key={client.id}
                  onClick={() => setSelectedKarna(client)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-[var(--karna-paper)] border-2 border-[var(--rust)] shadow-sm'
                      : 'bg-white hover:bg-[var(--wall)] border-[var(--border-warm)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[var(--ink)]">{client.clientName}</span>
                    <span className="font-mono font-bold text-xs text-[var(--rust)]">
                      {client.currentDebtDh.toFixed(2)} DH
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-[var(--ink-muted)]">
                    <span>{client.clientPhone}</span>
                    <span>Plafond : {client.creditLimitDh} DH</span>
                  </div>

                  {/* Limit meter */}
                  <div className="w-full h-1.5 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className={`h-full ${ratio > 80 ? 'bg-rose-500' : 'bg-[var(--amber-gold)]'}`}
                      style={{ width: `${Math.min(100, ratio)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: The Ruled Authentic Karna Ledger */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[var(--karna-paper)] border-2 border-[var(--border-warm)] shadow-lg space-y-5">
          {/* Client Header inside notebook */}
          <div className="pb-4 border-b-2 border-dashed border-[var(--karna-line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-kalam text-xl font-bold text-[var(--ink)]">
                  Feuille de : {selectedKarna.clientName}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedKarna.currentDebtDh === 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedKarna.currentDebtDh > 300
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedKarna.currentDebtDh === 0 ? 'Solde à zéro' : 'Crédit ouvert'}
                </span>
              </div>
              <p className="text-xs text-[var(--ink-muted)] mt-0.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[var(--moroccan-green)]" />
                <span>{selectedKarna.clientPhone}</span>
                <span>•</span>
                <span>{selectedKarna.clientAddress}</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[var(--ink-muted)] block font-mono">
                Solde dû à payer :
              </span>
              <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
                {selectedKarna.currentDebtDh.toFixed(2)} DH
              </div>
            </div>
          </div>

          {/* Quick settlement action form */}
          <div className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-[var(--ink)] flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-[var(--moroccan-green)]" />
                <span>Enregistrer un règlement en espèces au comptoir</span>
              </h4>
              <button
                type="button"
                onClick={() => setPaymentAmount(selectedKarna.currentDebtDh)}
                className="text-[11px] text-[var(--rust)] hover:underline font-bold cursor-pointer"
              >
                Régler la totalité ({selectedKarna.currentDebtDh.toFixed(2)} DH)
              </button>
            </div>

            {paymentNotice && (
              <div className="p-2.5 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Règlement enregistré et déduit du Karna du client !</span>
              </div>
            )}

            <form onSubmit={handleRegisterPayment} className="flex gap-2">
              <input
                type="number"
                step="5"
                min="5"
                max={selectedKarna.currentDebtDh || 1000}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                className="w-36 p-2 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-xs font-mono font-bold"
              />
              <button
                type="submit"
                disabled={selectedKarna.currentDebtDh <= 0}
                className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] disabled:opacity-50 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Valider le versement ({paymentAmount} DH)
              </button>
            </form>
          </div>

          {/* Historical Ruled Notebook Lines */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--ink)] font-mono">
              Journal des Écritures (Achats & Règlements)
            </h4>

            <div className="space-y-2 font-kalam">
              {selectedKarna.history.map((h) => {
                const isPayment = h.amountDh < 0;
                return (
                  <div
                    key={h.id}
                    className="p-3 rounded-xl bg-white/70 border border-dashed border-[var(--karna-line)] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-sm text-[var(--ink)]">
                        {h.description}
                      </div>
                      <div className="text-[11px] font-sans text-[var(--ink-muted)] flex items-center gap-2">
                        <span>{h.date}</span>
                        {h.receiptRef && <span>• Ref : {h.receiptRef}</span>}
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-base font-bold font-mono ${
                          isPayment ? 'text-emerald-700' : 'text-[var(--rust)]'
                        }`}
                      >
                        {isPayment ? `${h.amountDh.toFixed(2)} DH` : `+${h.amountDh.toFixed(2)} DH`}
                      </div>
                      <div className="text-[10px] font-sans text-stone-400">
                        Nouveau solde : {h.balanceAfterDh.toFixed(2)} DH
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom grocer stamp */}
          <div className="pt-3 border-t border-dashed border-[var(--karna-line)] flex items-center justify-between text-xs text-[var(--ink-muted)] font-kalam">
            <span>Cachet Moul Lhanout : Ba Driss & Fils Casablanca</span>
            <span className="font-sans text-[11px]">« Amanate o Sadaqa »</span>
          </div>
        </div>
      </div>
    </div>
  );
};
