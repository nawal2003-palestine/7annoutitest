import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Package, AlertTriangle, ArrowUpDown, Plus, CheckCircle, RefreshCw } from 'lucide-react';

export const MerchantStockScreen: React.FC = () => {
  const { products } = useApp();
  const [stockItems, setStockItems] = useState(products);

  const [movements, setMovements] = useState([
    { id: 'm1', date: 'Aujourd\'hui 08:30', product: 'Pain Rond Beldi Chaud', type: 'Entrée (Four)', qty: '+50', ref: 'Four Beldi' },
    { id: 'm2', date: 'Aujourd\'hui 10:15', product: 'Thé Vert Beldi Sultan 200g', type: 'Sortie (Vente)', qty: '-3', ref: 'Cmd SH-8531' },
    { id: 'm3', date: 'Hier 17:00', product: 'Huile d\'Olive Oued Souss 1L', type: 'Réassort Grossiste', qty: '+20', ref: 'BL-4912' },
    { id: 'm4', date: 'Hier 14:20', product: 'Raïbi Jamila Grenadine', type: 'Sortie (Vente)', qty: '-6', ref: 'Comptoir' },
  ]);

  const handleAdjustStock = (prodId: string, amount: number) => {
    setStockItems((prev) =>
      prev.map((p) => {
        if (p.id === prodId) {
          const nextStock = Math.max(0, p.stock + amount);
          return { ...p, stock: nextStock };
        }
        return p;
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Gestion des Stocks & Mouvements
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Quantités physiques, réservations sécurisées anti-survente et historique des arrivages
          </p>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Stock Cards and Movement History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Stock Table */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
            <Package className="w-4 h-4 text-[var(--rust)]" />
            <span>Inventaire en Rayon & Réserve</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2">
                  <th className="py-2.5">Produit</th>
                  <th className="py-2.5">En rayon</th>
                  <th className="py-2.5">Réservé (Cmds)</th>
                  <th className="py-2.5">Seuil bas</th>
                  <th className="py-2.5 text-right">Ajuster Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-warm)]">
                {stockItems.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[var(--wall)]">
                    <td className="py-3">
                      <div className="font-bold text-[var(--ink)]">{prod.name}</div>
                      <div className="text-[10px] text-[var(--ink-muted)]">{prod.unit}</div>
                    </td>
                    <td className="py-3 font-mono font-bold">
                      <span
                        className={
                          prod.stock <= prod.lowStockThreshold
                            ? 'text-rose-600 font-extrabold'
                            : 'text-[var(--ink)]'
                        }
                      >
                        {prod.stock}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[var(--ink-muted)]">
                      {prod.reservedStock || 0}
                    </td>
                    <td className="py-3 font-mono text-[var(--ink-muted)]">
                      {prod.lowStockThreshold}
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleAdjustStock(prod.id, -1)}
                          className="px-2 py-1 rounded bg-[var(--wall-dark)] hover:bg-stone-200 text-xs font-bold font-mono cursor-pointer"
                          title="Retirer 1"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => handleAdjustStock(prod.id, 5)}
                          className="px-2 py-1 rounded bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white text-xs font-bold font-mono cursor-pointer"
                          title="Ajouter 5"
                        >
                          +5
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Movements Log */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-[var(--amber-gold)]" />
            <span>Derniers Mouvements</span>
          </h3>

          <div className="space-y-3">
            {movements.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl bg-white border border-[var(--border-warm)] text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--ink)]">{m.product}</span>
                  <span
                    className={`font-mono font-bold ${
                      m.qty.startsWith('+') ? 'text-emerald-700' : 'text-[var(--rust)]'
                    }`}
                  >
                    {m.qty}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-[var(--ink-muted)]">
                  <span>{m.type} ({m.ref})</span>
                  <span>{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
