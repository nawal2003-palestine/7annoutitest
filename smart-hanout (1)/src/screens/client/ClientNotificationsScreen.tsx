import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Bell, CheckCircle2, Clock, Sparkles, BookOpen, Truck } from 'lucide-react';

export const ClientNotificationsScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Livreur en route !',
      time: 'Il y a 6 minutes',
      message: 'Hamza (Moto 103) a récupéré votre commande n° SH-8531 chez Ba Driss et arrive dans 5 min.',
      read: false,
      type: 'delivery',
      actionScreen: 'client-tracking',
    },
    {
      id: 'notif-2',
      title: 'Inscription au Carnet de Karna',
      time: 'Aujourd\'hui, 11:24',
      message: 'Votre commande de 64,00 DH a été consignée sur votre Karna Ba Driss. Nouveau solde : 142,50 DH.',
      read: false,
      type: 'karna',
      actionScreen: 'merchant-karna',
    },
    {
      id: 'notif-3',
      title: 'Arrivage de Khobz Beldi Chaud',
      time: 'Ce matin, 08:15',
      message: 'La fournée du matin vient de sortir du four chez Hanout Ba Driss & Fils. Commandez votre pain frais !',
      read: true,
      type: 'promo',
      actionScreen: 'client-store',
    },
    {
      id: 'notif-4',
      title: 'Rappel rituel : Ftour du Vendredi',
      time: 'Hier, 19:00',
      message: 'Votre panier préféré du vendredi est prêt à être commandé en 1 clic.',
      read: true,
      type: 'ritual',
      actionScreen: 'client-favorites',
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Centre de Notifications
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Alertes de livraison, arrivages frais et mouvements de Karna
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-[var(--rust)] hover:underline cursor-pointer"
        >
          Tout marquer comme lu
        </button>
      </div>

      <MoroccanStarBorder />

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              if (n.actionScreen) setCurrentScreen(n.actionScreen as any);
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              !n.read
                ? 'bg-white border-[var(--rust)]/60 shadow-xs'
                : 'bg-white/70 border-[var(--border-warm)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-[var(--rust)] shrink-0" />
                )}
                <h4 className="font-bold text-sm text-[var(--ink)]">{n.title}</h4>
              </div>
              <span className="text-[11px] text-[var(--ink-muted)] font-mono">{n.time}</span>
            </div>

            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
