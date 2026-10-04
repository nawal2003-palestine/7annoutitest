import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Truck,
  Bike,
  Shield,
  ArrowRight,
  Package,
  AlertCircle,
  Store,
} from 'lucide-react';

export const ClientTrackingScreen: React.FC = () => {
  const { activeOrder, updateOrderStatus, setCurrentScreen } = useApp();
  const [eta, setEta] = useState(activeOrder.etaMinutes || 12);
  const [simStep, setSimStep] = useState<number>(2); // 0: Pending, 1: Preparing, 2: En route, 3: Livré

  // Auto decrement simulated ETA
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: 'Commande reçue', desc: 'Validée par Ba Driss', done: simStep >= 0 },
    { label: 'Préparation du sac', desc: 'Articles vérifiés & frais', done: simStep >= 1 },
    { label: 'Livreur en route', desc: 'Dans les ruelles du quartier', done: simStep >= 2 },
    { label: 'Remise au client', desc: 'Arrivé au pied de l\'immeuble', done: simStep >= 3 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-[var(--rust)] uppercase tracking-wider">
            Suivi GPS en temps réel
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Commande n° {activeOrder.orderNumber}
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            En provenance de {activeOrder.storeName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('client-order-detail')}
            className="px-3 py-1.5 rounded-xl border border-[var(--border-warm)] bg-white text-xs font-bold text-[var(--ink)] hover:border-[var(--rust)] transition-colors cursor-pointer"
          >
            Voir le ticket
          </button>
          <button
            onClick={() => setCurrentScreen('client-issue')}
            className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Signaler un problème
          </button>
        </div>
      </div>

      <MoroccanStarBorder />

      {/* Main GPS Live Map Visual */}
      <div className="rounded-3xl border-2 border-[var(--border-warm)] bg-white overflow-hidden shadow-md">
        {/* Simulated Moroccan Map Header */}
        <div className="relative h-64 sm:h-80 bg-[#E8E2D2] overflow-hidden flex items-center justify-center">
          {/* Map Grid and streets representation */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2A2118_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

          {/* Road lines simulation */}
          <svg className="absolute inset-0 w-full h-full opacity-60">
            <path
              d="M 50 150 Q 200 80, 400 160 T 750 120"
              fill="none"
              stroke="#D4C5A9"
              strokeWidth="20"
            />
            <path
              d="M 120 50 L 120 280 M 350 40 L 350 280 M 600 40 L 600 280"
              fill="none"
              stroke="#D4C5A9"
              strokeWidth="14"
            />
            {/* Active route path */}
            <path
              d="M 160 140 Q 280 110, 480 155"
              fill="none"
              stroke="var(--rust)"
              strokeWidth="5"
              strokeDasharray="8 6"
              className="animate-pulse"
            />
          </svg>

          {/* Store Pin */}
          <div className="absolute left-[20%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--shutter-blue)] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Store className="w-5 h-5" />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-white text-[10px] font-bold text-[var(--ink)] shadow-xs border border-[var(--border-warm)] whitespace-nowrap">
              {activeOrder.storeName}
            </span>
          </div>

          {/* Courier Pin (Moving) */}
          <div className="absolute left-[50%] top-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
            <div className="w-11 h-11 rounded-full bg-[var(--rust)] text-white flex items-center justify-center shadow-2xl border-2 border-white ring-4 ring-[var(--rust)]/30">
              <Bike className="w-6 h-6" />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded-full bg-[var(--ink)] text-white text-[10px] font-bold shadow-xs whitespace-nowrap">
              Livreur (Hamza)
            </span>
          </div>

          {/* Client Destination Pin */}
          <div className="absolute left-[78%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--moroccan-green)] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded bg-white text-[10px] font-bold text-[var(--ink)] shadow-xs border border-[var(--border-warm)] whitespace-nowrap">
              {activeOrder.customerAddress.slice(0, 18)}...
            </span>
          </div>

          {/* Floating ETA Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl border border-[var(--border-warm)] shadow-lg flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-[var(--ink-muted)]">Arrivée estimée</div>
              <div className="text-xl font-extrabold font-mono text-[var(--ink)]">
                {eta} min
              </div>
            </div>
          </div>
        </div>

        {/* Courier Details Bar */}
        <div className="p-4 sm:p-5 bg-[var(--wall-dark)] border-t border-[var(--border-warm)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--rust-light)] text-[var(--rust)] flex items-center justify-center font-bold text-lg">
              HE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[var(--ink)]">
                  {activeOrder.courierName || 'Hamza El Fassi'}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--amber-gold-light)] text-[var(--amber-gold)]">
                  ★ 4.9 (180 courses)
                </span>
              </div>
              <p className="text-xs text-[var(--ink-muted)]">
                Livreur de quartier • Peugeot 103 / Moto urbaine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${activeOrder.courierPhone || '+212654218890'}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[var(--moroccan-green)] hover:bg-[var(--moroccan-green-hover)] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler le livreur</span>
            </a>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[var(--ink)]">État d'avancement de la livraison</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {steps.map((st, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl border transition-all ${
                st.done
                  ? 'bg-[var(--moroccan-green-light)]/40 border-[var(--moroccan-green)]/30 text-[var(--ink)]'
                  : 'bg-[var(--wall)] border-[var(--border-warm)] text-[var(--ink-muted)] opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {st.done ? (
                  <CheckCircle className="w-4 h-4 text-[var(--moroccan-green)] shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-current shrink-0" />
                )}
                <span className="font-bold text-xs">{st.label}</span>
              </div>
              <p className="text-[11px] leading-tight">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Simulator controls for evaluator */}
        <div className="pt-2 border-t border-[var(--border-warm)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
          <span className="font-mono text-[11px]">Simulation de progression en direct :</span>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((stepIdx) => (
              <button
                key={stepIdx}
                onClick={() => setSimStep(stepIdx)}
                className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                  simStep === stepIdx
                    ? 'bg-[var(--rust)] text-white'
                    : 'bg-[var(--wall-dark)] text-[var(--ink)] hover:bg-white'
                }`}
              >
                Étape {stepIdx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
