import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { MapPin, Navigation, Save, CheckCircle, Truck, DollarSign } from 'lucide-react';

export const MerchantDeliveryZoneScreen: React.FC = () => {
  const { selectedStore } = useApp();
  const [radiusKm, setRadiusKm] = useState(selectedStore.deliveryRadiusKm || 2.2);
  const [deliveryFee, setDeliveryFee] = useState(selectedStore.deliveryFeeDh || 5);
  const [freeThreshold, setFreeThreshold] = useState(selectedStore.freeDeliveryThresholdDh || 100);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Périmètre & Frais de Livraison
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Définissez jusqu'où votre commis ou les livreurs partenaires desservent vos voisins
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map visualization simulation */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[var(--rust)]" />
              <span>Rayon de livraison actif autour du Hanout</span>
            </h3>
            <span className="font-mono font-bold text-xs text-[var(--rust)] bg-[var(--rust-light)] px-2.5 py-1 rounded-full">
              Rayon : {radiusKm} km
            </span>
          </div>

          {/* Interactive Map Visualizer */}
          <div className="relative h-64 rounded-2xl bg-[#EBE5D6] overflow-hidden flex items-center justify-center border border-[var(--border-warm)]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2A2118_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

            {/* Concentric delivery radius circle */}
            <div
              className="rounded-full border-2 border-[var(--rust)] bg-[var(--rust)]/15 flex items-center justify-center transition-all duration-300 shadow-inner"
              style={{
                width: `${Math.min(240, radiusKm * 85)}px`,
                height: `${Math.min(240, radiusKm * 85)}px`,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-[var(--rust)] shadow-md ring-4 ring-white" />
            </div>

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11px] text-[var(--ink)] font-semibold shadow-xs">
              📍 Centre : {selectedStore.address.slice(0, 30)}...
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[var(--ink-muted)]">
              <span>Ajuster le rayon d'action :</span>
              <span className="font-bold text-[var(--rust)]">{radiusKm} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full accent-[var(--rust)] cursor-pointer"
            />
          </div>
        </div>

        {/* Pricing form */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[var(--ink)]">Tarifs de Livraison</h3>

          {saved && (
            <div className="p-3 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs font-bold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Paramètres enregistrés !</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Frais standards de course (DH)
              </label>
              <input
                type="number"
                min="0"
                max="25"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-mono font-bold"
              />
              <span className="text-[10px] text-[var(--ink-muted)] mt-0.5 block">
                Tarif habituel à Casablanca : 5 à 7 DH
              </span>
            </div>

            <div>
              <label className="font-bold text-[var(--ink)] block mb-1">
                Seuil de gratuité (Livraison offerte à partir de DH)
              </label>
              <input
                type="number"
                min="30"
                max="300"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-mono font-bold"
              />
              <span className="text-[10px] text-[var(--ink-muted)] mt-0.5 block">
                Incite les voisins à regrouper leurs courses
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Mettre à jour les paramètres</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
