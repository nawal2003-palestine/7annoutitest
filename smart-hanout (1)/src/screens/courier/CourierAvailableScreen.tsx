import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { CourierMission } from '../../types';
import {
  Bike,
  MapPin,
  Clock,
  Banknote,
  ArrowRight,
  ToggleLeft,
  ToggleRight,
  Store,
  Navigation,
} from 'lucide-react';

export const CourierAvailableScreen: React.FC = () => {
  const { courierMissions, acceptMission, setCurrentScreen } = useApp();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      {/* Availability Header */}
      <div className="p-6 rounded-3xl bg-[var(--wall-dark)] border border-[var(--border-warm)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-kalam text-sm font-bold text-[var(--rust)]">
              Hamza El Fassi (Moto 103)
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isOnline
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-stone-200 text-stone-600'
              }`}
            >
              {isOnline ? 'En Ligne • Prêt à livrer' : 'En Pause'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mt-0.5">
            Missions de Quartier Disponibles
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Secteur actif : Casablanca Bourgogne & Maarif (Rayon 1.5 km)
          </p>
        </div>

        {/* Online / Offline switch */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-xs ${
            isOnline
              ? 'bg-[var(--moroccan-green)] text-white hover:bg-[var(--moroccan-green-hover)]'
              : 'bg-stone-300 text-stone-700 hover:bg-stone-400'
          }`}
        >
          {isOnline ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
          <span>{isOnline ? 'Je suis disponible' : 'Passer en pause'}</span>
        </button>
      </div>

      <MoroccanStarBorder />

      {/* Missions list */}
      <div className="space-y-4">
        {courierMissions.map((mis) => (
          <div
            key={mis.id}
            className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-warm)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[var(--ink)]">
                    Course {mis.orderNumber}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--wall-dark)] text-[var(--ink)] font-semibold">
                    ~{mis.distanceKm} km
                  </span>
                </div>
                <div className="text-xs text-[var(--ink-muted)] flex items-center gap-1.5 mt-0.5">
                  <Store className="w-3.5 h-3.5 text-[var(--rust)]" />
                  <span className="font-bold text-[var(--ink)]">{mis.storeName}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[var(--ink-muted)] block">Votre rémunération :</span>
                <div className="text-xl font-extrabold font-mono text-[var(--moroccan-green)]">
                  +{mis.estimatedFeeDh.toFixed(2)} DH
                </div>
              </div>
            </div>

            {/* Departure and arrival points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[var(--wall)] p-3.5 rounded-2xl border border-[var(--border-warm)]">
              <div className="space-y-0.5">
                <span className="font-bold text-[var(--ink)] flex items-center gap-1">
                  <span>🏪 Récupération :</span>
                </span>
                <p className="text-[var(--ink-muted)]">{mis.storeAddress}</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-[var(--ink)] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--moroccan-green)]" />
                  <span>Livraison :</span>
                </span>
                <p className="text-[var(--ink)] font-semibold">{mis.customerName}</p>
                <p className="text-[var(--ink-muted)]">{mis.customerAddress}</p>
              </div>
            </div>

            {/* Cash collection reminder */}
            <div className="flex items-center justify-between text-xs text-[var(--ink-muted)]">
              <div>
                {mis.amountToCollectDh > 0 ? (
                  <span className="font-bold text-[var(--rust)] flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
                    <span>À collecter en espèces : {mis.amountToCollectDh.toFixed(2)} DH</span>
                  </span>
                ) : (
                  <span className="font-bold text-[var(--moroccan-green)]">
                    ✓ Déjà payé via Karna (0 DH à collecter)
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    acceptMission(mis.id);
                    setCurrentScreen('courier-active-delivery');
                  }}
                  className="px-5 py-2 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Accepter la course</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CourierMissionDetailScreen: React.FC = () => {
  const { courierMissions, setCurrentScreen } = useApp();
  const mission = courierMissions[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--ink)]">
          Détail de la Mission {mission.orderNumber}
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Informations complètes avant prise en charge du sac
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-[var(--wall)] space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span>Boutique : {mission.storeName}</span>
            <span className="text-[var(--moroccan-green)] font-mono">+{mission.estimatedFeeDh} DH</span>
          </div>
          <p className="text-[var(--ink-muted)]">{mission.storeAddress}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--wall)] space-y-2">
          <div className="text-sm font-bold text-[var(--ink)]">
            Client : {mission.customerName}
          </div>
          <p className="text-[var(--ink)]">{mission.customerAddress}</p>
          {mission.customerNote && (
            <p className="text-[var(--rust)] font-kalam text-xs">
              Remarque : {mission.customerNote}
            </p>
          )}
        </div>

        <button
          onClick={() => setCurrentScreen('courier-active-delivery')}
          className="w-full py-3 rounded-xl bg-[var(--rust)] text-white font-bold"
        >
          Démarrer l'itinéraire GPS vers le Hanout
        </button>
      </div>
    </div>
  );
};
