import React from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Plus,
  Coffee,
  UtensilsCrossed,
  RotateCcw,
} from 'lucide-react';

export const ClientFavoritesScreen: React.FC = () => {
  const { stores, products, addToCart, setCurrentScreen, setSelectedStore } = useApp();

  const recurringBaskets = [
    {
      id: 'b1',
      title: 'Ftour Beldi du Matin (Rituel Quotidien)',
      titleAr: 'فطور بلدي صباحي',
      itemsCount: 4,
      totalDh: 32.50,
      description: '3 Pains beldi chauds + 1 Atay Sultan + 1 Fromage Vache Qui Rit + 1 Botte Menthe',
      frequency: 'Détecté 4x par semaine (vers 08:30)',
      icon: <Coffee className="w-5 h-5 text-[var(--amber-gold)]" />,
      items: [
        { prod: products[5], qty: 3 }, // Pain
        { prod: products[0], qty: 1 }, // Atay
        { prod: products[4], qty: 1 }, // Vache qui rit
        { prod: products[8], qty: 1 }, // Menthe
      ],
    },
    {
      id: 'b2',
      title: 'Panier Vendredi Couscous',
      titleAr: 'سخرة الجمعة والكسكس',
      itemsCount: 3,
      totalDh: 110.00,
      description: '2 Couscous Dari Moyen + 1 Huile Oued Souss + 2 Tomates Aïcha',
      frequency: 'Détecté chaque vendredi matin (vers 10:00)',
      icon: <UtensilsCrossed className="w-5 h-5 text-[var(--rust)]" />,
      items: [
        { prod: products[2], qty: 2 }, // Couscous
        { prod: products[3], qty: 1 }, // Huile
        { prod: products[11], qty: 2 }, // Tomates
      ],
    },
  ];

  const handleLoadBasket = (basketItems: { prod: any; qty: number }[]) => {
    basketItems.forEach((b) => {
      addToCart(b.prod, undefined, b.qty);
    });
    setCurrentScreen('client-cart');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
          Favoris & Paniers Préférés
        </h1>
        <p className="text-xs text-[var(--ink-muted)]">
          Vos hanouts de cœur et vos rituels de commande récurrents détectés automatiquement
        </p>
      </div>

      <MoroccanStarBorder />

      {/* Recurring Smart Baskets */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[var(--amber-gold)]" />
          <h2 className="text-lg font-bold text-[var(--ink)]">
            Paniers Habituels Détectés (Commande en 1 Clic)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recurringBaskets.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-[var(--wall-dark)]">{b.icon}</div>
                  <span className="text-[11px] font-mono font-bold text-[var(--rust)] bg-[var(--rust-light)] px-2 py-0.5 rounded-full">
                    {b.totalDh.toFixed(2)} DH
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[var(--ink)]">{b.title}</h3>
                  <p className="font-kalam text-xs text-[var(--amber-gold)]">{b.titleAr}</p>
                </div>
                <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                  {b.description}
                </p>
                <div className="text-[11px] text-[var(--moroccan-green)] font-medium flex items-center gap-1">
                  <span>✓ {b.frequency}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-warm)]">
                <button
                  onClick={() => handleLoadBasket(b.items)}
                  className="w-full py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Remplir le panier avec ce rituel</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Stores */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[var(--rust)] fill-[var(--rust)]" />
          <span>Mes Hanouts Enregistrés</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stores.slice(0, 2).map((st) => (
            <div
              key={st.id}
              onClick={() => {
                setSelectedStore(st);
                setCurrentScreen('client-store');
              }}
              className="p-4 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs hover:border-[var(--rust)] transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div>
                <h4 className="font-bold text-sm text-[var(--ink)]">{st.name}</h4>
                <p className="text-xs text-[var(--ink-muted)]">{st.neighborhood}, {st.city}</p>
                <span className="text-[11px] text-[var(--moroccan-green)] font-semibold mt-1 inline-block">
                  Ouvert • Livraison en {st.deliveryTimeMinutes} min
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--rust)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
