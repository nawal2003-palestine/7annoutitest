import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { AlertTriangle, ArrowLeft, Send, CheckCircle, Phone } from 'lucide-react';

export const CourierIssueScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [issue, setIssue] = useState('unreachable');
  const [desc, setDesc] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <button
          onClick={() => setCurrentScreen('courier-active-delivery')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--rust)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la livraison en cours</span>
        </button>
        <h1 className="text-2xl font-extrabold text-[var(--ink)] mt-2">
          Signaler un Incident Livreur
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Notre centre d'assistance intervient immédiatement pour vous débloquer
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        {sent ? (
          <div className="p-6 rounded-2xl bg-[var(--moroccan-green-light)] text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-[var(--moroccan-green)] mx-auto" />
            <h3 className="font-bold text-base text-[var(--moroccan-green)]">
              Incident pris en charge par l'équipe
            </h3>
            <p className="text-xs text-[var(--ink)]">
              Le support appelle le client ou réassigne la course. Vous ne serez pas pénalisé.
            </p>
            <button
              onClick={() => setCurrentScreen('courier-available')}
              className="px-4 py-2 rounded-xl bg-[var(--moroccan-green)] text-white text-xs font-bold"
            >
              Retourner aux missions disponibles
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
              <label className="font-bold block mb-1">Motif du blocage</label>
              <select
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-bold text-[var(--ink)]"
              >
                <option value="unreachable">Client ne répond pas au téléphone ni à l'interphone</option>
                <option value="address">Adresse introuvable dans le derb</option>
                <option value="breakdown">Panne moto / crevaison vélo</option>
                <option value="item_spill">Produit renversé ou endommagé pendant le trajet</option>
                <option value="client_refusal">Client refuse la commande</option>
              </select>
            </div>

            <div>
              <label className="font-bold block mb-1">Précisions</label>
              <textarea
                rows={3}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Décrivez brièvement la situation..."
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Transmettre l'alerte d'urgence</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const CourierEarningsScreen: React.FC = () => {
  const pastDeliveries = [
    { id: 'c1', date: 'Aujourd\'hui 11:45', store: 'Hanout Ba Driss', fee: 12.00, tip: 5.00, client: 'Karim B.' },
    { id: 'c2', date: 'Aujourd\'hui 10:20', store: 'Hanout Ba Driss', fee: 15.00, tip: 0.00, client: 'Fatima M.' },
    { id: 'c3', date: 'Hier 19:10', store: 'Épicerie Al Amal', fee: 14.00, tip: 10.00, client: 'Omar T.' },
    { id: 'c4', date: 'Hier 18:30', store: 'Hanout Ba Driss', fee: 12.00, tip: 3.00, client: 'Yassine K.' },
  ];

  const totalToday = 12 + 5 + 15;
  const totalWeek = 480;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Mes Revenus & Historique de Courses
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Rémunération par course, pourboires et virements hebdomadaires
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Gains Aujourd'hui</span>
          <div className="text-3xl font-extrabold font-mono text-[var(--moroccan-green)]">
            {totalToday.toFixed(2)} DH
          </div>
          <span className="text-[11px] text-[var(--ink-muted)]">2 courses complétées</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Total de la Semaine</span>
          <div className="text-3xl font-extrabold font-mono text-[var(--rust)]">
            {totalWeek.toFixed(2)} DH
          </div>
          <span className="text-[11px] text-[var(--ink-muted)]">36 courses (Virement vendredi)</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Pourboires Voisins</span>
          <div className="text-3xl font-extrabold font-mono text-[var(--amber-gold)]">
            65.00 DH
          </div>
          <span className="text-[11px] text-[var(--ink-muted)]">100% conservés par vous</span>
        </div>
      </div>

      {/* History table */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-[var(--ink)]">Détail des Dernières Courses</h3>
        <div className="divide-y divide-[var(--border-warm)] text-xs">
          {pastDeliveries.map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-[var(--ink)]">{p.store} → {p.client}</span>
                <div className="text-[11px] text-[var(--ink-muted)]">{p.date}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-sm text-[var(--moroccan-green)]">
                  +{(p.fee + p.tip).toFixed(2)} DH
                </div>
                {p.tip > 0 && (
                  <div className="text-[10px] text-[var(--amber-gold)] font-semibold">
                    (dont {p.tip} DH pourboire)
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
