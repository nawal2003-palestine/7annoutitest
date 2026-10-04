import React from 'react';

interface ChalkItem {
  name: string;
  nameAr?: string;
  price: string;
  note?: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  items?: ChalkItem[];
  className?: string;
}

export const MoroccanChalkboard: React.FC<Props> = ({
  title = "Tableau du Jour chez Ba Driss",
  subtitle = "L'arrivage frais de ce matin (Prix en Dirhams)",
  items = [
    { name: "Khobz Beldi Four Chaud", nameAr: "خبز بلدي ساخن", price: "1,50 DH", note: "Sortant du four" },
    { name: "Raïbi Jamila Grenadine", nameAr: "رايبي جميلة", price: "2,50 DH", note: "Bien frais" },
    { name: "Atay Sultan 200g", nameAr: "شاي سلطان", price: "18,50 DH", note: "Goût authentique" },
    { name: "Botte Naânaâ Frais", nameAr: "نعناع طري", price: "2,00 DH", note: "Moulay Bousselham" },
  ],
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-xl border-4 border-[#3A2A1D] bg-[#1F2724] p-5 text-amber-50 shadow-xl overflow-hidden ${className}`}
      style={{
        boxShadow: 'inset 0 0 24px rgba(0,0,0,0.6), 0 10px 25px -5px rgba(42,33,24,0.25)',
      }}
    >
      {/* Chalk dust and subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Header with chalk calligraphy */}
      <div className="text-center pb-3 border-b border-white/20 relative z-10">
        <div className="inline-block px-3 py-0.5 rounded border border-white/30 text-xs tracking-wider uppercase opacity-85 font-mono text-[var(--amber-gold)]">
          ★ Tableau à la craie du Hanout ★
        </div>
        <h3 className="font-kalam text-2xl font-bold tracking-wide text-white mt-1">
          {title}
        </h3>
        <p className="text-xs text-stone-300 font-sans mt-0.5 opacity-90">{subtitle}</p>
      </div>

      {/* Chalkboard line items */}
      <div className="mt-4 space-y-3 font-kalam relative z-10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-baseline justify-between gap-2 border-b border-dashed border-white/15 pb-1.5"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-lg text-white font-medium">{item.name}</span>
              {item.nameAr && (
                <span className="text-sm text-[var(--amber-gold)] opacity-85">{item.nameAr}</span>
              )}
              {item.note && (
                <span className="text-xs font-sans text-stone-400 italic">({item.note})</span>
              )}
            </div>
            <div className="text-xl font-bold text-[#F4D06F] whitespace-nowrap">
              {item.price}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom chalk signature */}
      <div className="mt-4 pt-2 flex items-center justify-between text-xs text-stone-400 border-t border-white/10 font-sans">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Karna disponible aux habitués du quartier
        </span>
        <span className="font-kalam text-stone-300 text-sm">« Bismillah o Tawakoul 3la Allah »</span>
      </div>
    </div>
  );
};
