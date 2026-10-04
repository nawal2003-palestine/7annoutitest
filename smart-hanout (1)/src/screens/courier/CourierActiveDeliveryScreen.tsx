import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  Bike,
  MapPin,
  Phone,
  CheckCircle,
  AlertTriangle,
  Navigation,
  ArrowRight,
  Shield,
  Banknote,
} from 'lucide-react';

export const CourierActiveDeliveryScreen: React.FC = () => {
  const { courierMissions, setCurrentScreen } = useApp();
  const mission = courierMissions[0];
  const [deliveryStage, setDeliveryStage] = useState<'to_store' | 'picked_up' | 'arrived'>('picked_up');

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-[var(--rust)] uppercase">
            Navigation Active
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Mission {mission.orderNumber}
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Destination : {mission.customerName} ({mission.customerAddress})
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('courier-issue')}
          className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
        >
          Signaler un incident
        </button>
      </div>

      <MoroccanStarBorder />

      {/* Simulated GPS Navigation Canvas */}
      <div className="rounded-3xl border-2 border-[var(--border-warm)] bg-white overflow-hidden shadow-md">
        <div className="relative h-64 bg-[#E8E2D2] flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2A2118_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

          {/* Road simulation */}
          <svg className="absolute inset-0 w-full h-full opacity-60">
            <path
              d="M 60 160 Q 240 100, 450 140 T 700 110"
              fill="none"
              stroke="#D4C5A9"
              strokeWidth="22"
            />
            <path
              d="M 180 150 Q 320 120, 520 130"
              fill="none"
              stroke="var(--rust)"
              strokeWidth="6"
              strokeDasharray="6 4"
            />
          </svg>

          {/* Courier Pin */}
          <div className="absolute left-[50%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[var(--rust)] text-white flex items-center justify-center shadow-xl ring-4 ring-white">
              <Bike className="w-6 h-6" />
            </div>
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[var(--ink)] text-white text-[10px] font-bold">
              Vous êtes à 450m
            </span>
          </div>

          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl border border-[var(--border-warm)] text-xs shadow-md">
            <span className="font-bold text-[var(--ink)] block">Prochaine étape :</span>
            <span className="text-[var(--rust)] font-bold">
              {deliveryStage === 'to_store' && 'Aller récupérer le sac chez Ba Driss'}
              {deliveryStage === 'picked_up' && 'En route vers Résidence Yasmina (Apt 4)'}
              {deliveryStage === 'arrived' && 'Vous êtes arrivé au pied de l\'immeuble'}
            </span>
          </div>
        </div>

        {/* Customer Actions */}
        <div className="p-5 bg-[var(--wall-dark)] border-t border-[var(--border-warm)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-[var(--ink)]">{mission.customerName}</h4>
            <p className="text-xs text-[var(--ink-muted)]">{mission.customerAddress}</p>
            {mission.customerNote && (
              <p className="text-[11px] text-[var(--rust)] font-kalam italic mt-0.5">
                Note : {mission.customerNote}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:+212661882311"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler le client</span>
            </a>
          </div>
        </div>
      </div>

      {/* Stage changer & Finish */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[var(--ink)]">Étape de la course</h3>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setDeliveryStage('to_store')}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              deliveryStage === 'to_store'
                ? 'bg-[var(--rust)] text-white'
                : 'bg-[var(--wall)] text-[var(--ink)] hover:bg-[var(--wall-dark)]'
            }`}
          >
            1. Vers le Hanout
          </button>
          <button
            onClick={() => setDeliveryStage('picked_up')}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              deliveryStage === 'picked_up'
                ? 'bg-[var(--rust)] text-white'
                : 'bg-[var(--wall)] text-[var(--ink)] hover:bg-[var(--wall-dark)]'
            }`}
          >
            2. Sac Récupéré
          </button>
          <button
            onClick={() => setDeliveryStage('arrived')}
            className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              deliveryStage === 'arrived'
                ? 'bg-[var(--moroccan-green)] text-white'
                : 'bg-[var(--wall)] text-[var(--ink)] hover:bg-[var(--wall-dark)]'
            }`}
          >
            3. Arrivé chez Client
          </button>
        </div>

        <button
          onClick={() => setCurrentScreen('courier-confirm')}
          className="w-full py-3.5 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Remettre la commande & Confirmer la livraison</span>
        </button>
      </div>
    </div>
  );
};

export const CourierConfirmScreen: React.FC = () => {
  const { courierMissions, completeMission, setCurrentScreen } = useApp();
  const mission = courierMissions[0];
  const [cashCollected, setCashCollected] = useState(mission.amountToCollectDh);
  const [confirmed, setConfirmed] = useState(false);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    completeMission(mission.id);
    setConfirmed(true);
    setTimeout(() => {
      setCurrentScreen('courier-earnings');
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-left">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          Confirmation de Livraison
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Mission n° {mission.orderNumber} • {mission.customerName}
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-5">
        {confirmed ? (
          <div className="text-center space-y-3 p-4 bg-[var(--moroccan-green-light)] rounded-2xl">
            <CheckCircle className="w-12 h-12 text-[var(--moroccan-green)] mx-auto" />
            <h3 className="font-bold text-base text-[var(--moroccan-green)]">Course Validée avec Succès !</h3>
            <p className="text-xs text-[var(--ink)]">
              +{mission.estimatedFeeDh.toFixed(2)} DH ajoutés à votre portefeuille de gains.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFinish} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[var(--wall)] space-y-2">
              <span className="font-bold text-[var(--ink)] block">Montant en espèces à encaisser :</span>
              <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
                {mission.amountToCollectDh > 0 ? `${mission.amountToCollectDh.toFixed(2)} DH` : '0.00 DH (Karna)'}
              </div>
              <p className="text-[11px] text-[var(--ink-muted)]">
                {mission.amountToCollectDh > 0
                  ? 'Comptez la monnaie avant de remettre le sac au client.'
                  : 'Le client a réglé sur son carnet de crédit Karna.'}
              </p>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Code de validation ou signature client
              </label>
              <input
                defaultValue="4920"
                placeholder="Code à 4 chiffres donné par le client"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-mono text-center text-lg font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white font-bold text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Valider la remise & Clôturer la mission</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
