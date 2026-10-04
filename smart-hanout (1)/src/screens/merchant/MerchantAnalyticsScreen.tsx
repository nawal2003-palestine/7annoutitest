import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { TrendingUp, BarChart3, Download, Calendar, DollarSign, Package } from 'lucide-react';

export const MerchantAnalyticsScreen: React.FC = () => {
  const topProducts = [
    { name: 'Khobz Beldi Chaud', sales: 420, revenue: 630.00, share: '32%' },
    { name: 'Raïbi Jamila Grenadine', sales: 310, revenue: 775.00, share: '24%' },
    { name: 'Thé Vert Sultan 200g', sales: 85, revenue: 1572.50, share: '18%' },
    { name: 'Couscous Dari 1kg', sales: 90, revenue: 1260.00, share: '15%' },
    { name: 'Huile d\'Olive Oued Souss', sales: 12, revenue: 1020.00, share: '11%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Statistiques & Performance des Ventes
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Suivi du chiffre d'affaires, panier moyen et articles les plus demandés au quartier
          </p>
        </div>

        <button
          onClick={() => alert('Export CSV généré avec succès !')}
          className="px-4 py-2 rounded-xl border border-[var(--border-warm)] bg-white hover:border-[var(--rust)] text-[var(--ink)] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-[var(--rust)]" />
          <span>Exporter rapport (CSV / PDF)</span>
        </button>
      </div>

      <MoroccanStarBorder />

      {/* KPI summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Chiffre d'Affaires Mensuel</span>
          <div className="text-3xl font-extrabold font-mono text-[var(--rust)]">
            48 290 DH
          </div>
          <p className="text-[11px] text-[var(--moroccan-green)] font-semibold">+22% vs mois dernier</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Panier Moyen par Voisin</span>
          <div className="text-3xl font-extrabold font-mono text-[var(--ink)]">
            64.50 DH
          </div>
          <p className="text-[11px] text-[var(--ink-muted)]">Environ 4 articles par panier</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Taux de fidélité quartier</span>
          <div className="text-3xl font-extrabold font-mono text-[var(--moroccan-green)]">
            87.4%
          </div>
          <p className="text-[11px] text-[var(--ink-muted)]">Clients commandant au moins 2x/semaine</p>
        </div>
      </div>

      {/* Visual Chart Bars Representation */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[var(--ink)]">
          Évolution des Ventes par Jour de la Semaine (en DH)
        </h3>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 pt-6 border-b border-[var(--border-warm)] pb-2 text-center text-xs">
          {[
            { day: 'Lun', amount: 5200, height: '55%' },
            { day: 'Mar', amount: 4800, height: '50%' },
            { day: 'Mer', amount: 5900, height: '62%' },
            { day: 'Jeu', amount: 6400, height: '68%' },
            { day: 'Ven (Jumuah)', amount: 9800, height: '100%', highlight: true },
            { day: 'Sam', amount: 7800, height: '82%' },
            { day: 'Dim', amount: 8400, height: '88%' },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center h-full justify-end gap-1">
              <span className="text-[10px] font-mono font-bold text-[var(--ink)]">
                {bar.amount} DH
              </span>
              <div
                className={`w-full max-w-[48px] rounded-t-lg transition-all ${
                  bar.highlight ? 'bg-[var(--rust)]' : 'bg-[var(--wall-dark)] hover:bg-[var(--rust)]/60'
                }`}
                style={{ height: bar.height }}
              />
              <span className={`text-[11px] mt-1 font-semibold ${bar.highlight ? 'text-[var(--rust)]' : 'text-[var(--ink-muted)]'}`}>
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products Table */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[var(--ink)]">
          Produits les plus Vendus au Hanout
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2">
                <th className="py-2">Produit</th>
                <th className="py-2">Quantité Vendue</th>
                <th className="py-2">CA Généré</th>
                <th className="py-2">Part du Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-warm)]">
              {topProducts.map((tp, i) => (
                <tr key={i} className="hover:bg-[var(--wall)]">
                  <td className="py-2.5 font-bold text-[var(--ink)]">{tp.name}</td>
                  <td className="py-2.5 font-mono">{tp.sales} unités</td>
                  <td className="py-2.5 font-mono font-bold text-[var(--rust)]">{tp.revenue.toFixed(2)} DH</td>
                  <td className="py-2.5 font-mono text-[var(--ink-muted)]">{tp.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
