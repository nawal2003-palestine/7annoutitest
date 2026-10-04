import React from 'react';

interface Props {
  className?: string;
  variant?: 'subtle' | 'gold' | 'green';
}

export const MoroccanStarBorder: React.FC<Props> = ({ className = '', variant = 'subtle' }) => {
  const getColors = () => {
    switch (variant) {
      case 'gold':
        return 'text-[var(--amber-gold)] border-[var(--amber-gold)]/30';
      case 'green':
        return 'text-[var(--moroccan-green)] border-[var(--moroccan-green)]/30';
      default:
        return 'text-[var(--rust)] border-[var(--rust)]/25';
    }
  };

  return (
    <div className={`flex items-center justify-center gap-3 py-2 select-none ${className}`}>
      <div className={`h-[1px] flex-1 border-t border-dashed ${getColors()}`} />
      <div className={`flex items-center gap-1.5 opacity-80 ${getColors()}`}>
        {/* Fine 8-pointed star icon (Khatam Suleimani / Moroccan 8-point geometric star) */}
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l2.5 5.5L20 4l-1.5 5.8L24 12l-5.5 2.2 1.5 5.8-5.5-1.5L12 24l-2.5-5.5L4 20l1.5-5.8L0 12l5.5-2.2L4 4l5.5 1.5z" />
        </svg>
        <span className="w-1 h-1 rounded-full bg-current opacity-60" />
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l2.5 5.5L20 4l-1.5 5.8L24 12l-5.5 2.2 1.5 5.8-5.5-1.5L12 24l-2.5-5.5L4 20l1.5-5.8L0 12l5.5-2.2L4 4l5.5 1.5z" />
        </svg>
        <span className="w-1 h-1 rounded-full bg-current opacity-60" />
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l2.5 5.5L20 4l-1.5 5.8L24 12l-5.5 2.2 1.5 5.8-5.5-1.5L12 24l-2.5-5.5L4 20l1.5-5.8L0 12l5.5-2.2L4 4l5.5 1.5z" />
        </svg>
      </div>
      <div className={`h-[1px] flex-1 border-t border-dashed ${getColors()}`} />
    </div>
  );
};
