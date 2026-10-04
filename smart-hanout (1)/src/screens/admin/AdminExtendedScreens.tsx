import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  LifeBuoy,
  BarChart3,
  Star,
  UserCog,
  Map,
  FileSpreadsheet,
  Lock,
  CheckCircle,
  AlertCircle,
  Search,
} from 'lucide-react';

export const AdminSupportScreen: React.FC = () => {
  const tickets = [
    { id: 'T-101', date: 'Aujourd\'hui 11:30', user: 'Karim Bennani', type: 'Produit manquant', status: 'En cours', priority: 'Haute' },
    { id: 'T-102', date: 'Hier 18:20', user: 'Hamza (Livreur)', type: 'Client injoignable', status: 'Résolu', priority: 'Moyenne' },
    { id: 'T-103', date: '01/10/2026', user: 'Ba Driss (Hanout)', type: 'Ajustement Karna', status: 'Résolu', priority: 'Basse' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Support & Gestion des Incidents
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Médiation entre clients, épiciers et livreurs
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2">
                <th className="py-2.5">Ticket</th>
                <th className="py-2.5">Date</th>
                <th className="py-2.5">Utilisateur</th>
                <th className="py-2.5">Objet</th>
                <th className="py-2.5">Priorité</th>
                <th className="py-2.5">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-warm)]">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-[var(--wall)]">
                  <td className="py-3 font-mono font-bold text-[var(--rust)]">{t.id}</td>
                  <td className="py-3">{t.date}</td>
                  <td className="py-3 font-semibold">{t.user}</td>
                  <td className="py-3">{t.type}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const AdminStatsScreen: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Statistiques Nationales du Réseau
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Volume d'affaires global et pénétration par agglomération marocaine
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">GMV National (Mois)</span>
          <div className="text-2xl font-extrabold font-mono text-[var(--rust)]">
            1 480 000 DH
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Hanouts Agréés</span>
          <div className="text-2xl font-extrabold font-mono text-[var(--ink)]">
            184 boutiques
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Courses Livrées</span>
          <div className="text-2xl font-extrabold font-mono text-[var(--moroccan-green)]">
            24 920
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] space-y-1">
          <span className="text-xs text-[var(--ink-muted)]">Crédits Karna Transités</span>
          <div className="text-2xl font-extrabold font-mono text-[var(--amber-gold)]">
            320 000 DH
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminReviewsScreen: React.FC = () => {
  const { reviews } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Modération des Avis Clients
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Contrôle des notes et vérification de la courtoisie
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-[var(--wall)] flex items-center justify-between text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--ink)]">{r.customerName}</span>
                <span className="text-[var(--amber-gold)] font-bold">★ {r.rating}</span>
                <span className="text-[var(--ink-muted)]">• {r.date}</span>
              </div>
              <p className="mt-1 text-[var(--ink)]">{r.comment}</p>
            </div>
            <button
              onClick={() => alert('Avis vérifié et approuvé')}
              className="px-3 py-1 rounded-xl bg-white border border-[var(--border-warm)] hover:border-[var(--rust)] font-bold"
            >
              Approuver
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminRolesScreen: React.FC = () => {
  const roles = [
    { name: 'Super Admin Général', count: 2, desc: 'Accès sans restriction' },
    { name: 'Responsable Flotte & Livreurs', count: 3, desc: 'Validation CIN & concierges' },
    { name: 'Support Client & Médiation', count: 5, desc: 'Litiges et tickets' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Rôles & Permissions Internes
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Gestion des privilèges de l'équipe support et supervision
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] space-y-3">
        {roles.map((r, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[var(--wall)] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-sm text-[var(--ink)]">{r.name}</span>
              <p className="text-[var(--ink-muted)]">{r.desc}</p>
            </div>
            <span className="font-mono font-bold text-[var(--rust)]">{r.count} membres</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminZonesScreen: React.FC = () => {
  const zones = [
    { city: 'Casablanca', quarters: 'Bourgogne, Maarif, Gauthier, Ain Diab, Racine', hanouts: 94, status: 'Actif' },
    { city: 'Rabat - Salé', quarters: 'Agdal, Hassan, Hay Riad, Tabriquet', hanouts: 52, status: 'Actif' },
    { city: 'Marrakech', quarters: 'Guéliz, Hivernage, Daoudiate', hanouts: 38, status: 'Actif' },
    { city: 'Tanger', quarters: 'Malabata, Centre, Marchan', hanouts: 14, status: 'En déploiement' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Déploiement Géographique des Zones
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Villes et quartiers couverts au Maroc
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] space-y-3">
        {zones.map((z, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[var(--wall)] flex items-center justify-between text-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--ink)]">{z.city}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {z.status}
                </span>
              </div>
              <p className="text-[var(--ink-muted)] mt-0.5">Quartiers : {z.quarters}</p>
            </div>
            <span className="font-mono font-bold text-sm text-[var(--rust)]">
              {z.hanouts} hanouts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminAuditScreen: React.FC = () => {
  const logs = [
    { time: '11:28', user: 'Admin Hicham', action: 'Validation nouveau hanout Ba Driss & Fils' },
    { time: '10:45', user: 'Système', action: 'Règlement Karna SH-8490 validé (150 DH)' },
    { time: '09:12', user: 'Admin Sarah', action: 'Attribution rôle livreur vérifié à Hamza El Fassi' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Journal d'Audit & Traçabilité
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Historique immuable des actions sensibles réalisées sur la plateforme
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] space-y-3">
        {logs.map((l, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-[var(--wall)] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-[var(--rust)]">{l.time}</span>
              <span className="font-bold text-[var(--ink)]">{l.user}</span>
              <span className="text-[var(--ink-muted)]">• {l.action}</span>
            </div>
            <span className="text-emerald-700 font-bold text-[11px]">✓ Enregistré</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminSecurityScreen: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Sécurité de l'Infrastructure Admin
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Contrôle des accès racine et double authentification (2FA)
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-[var(--wall)] flex items-center justify-between">
          <div>
            <div className="font-bold text-sm text-[var(--ink)]">Double Authentification (MFA / SMS)</div>
            <p className="text-[var(--ink-muted)]">Obligatoire pour tous les comptes administrateurs</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            Activé ✓
          </span>
        </div>
      </div>
    </div>
  );
};
