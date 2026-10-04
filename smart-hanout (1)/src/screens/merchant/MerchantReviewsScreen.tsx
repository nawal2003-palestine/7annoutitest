import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Star, MessageSquare, Reply, CheckCircle2, Shield } from 'lucide-react';

export const MerchantReviewsScreen: React.FC = () => {
  const { reviews, selectedStore } = useApp();
  const [replies, setReplies] = useState<Record<string, string>>({
    'rev-2': 'Barak Allahou fik Si Yassine, la technologie au service de nos voisins !',
  });
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const submitReply = (id: string) => {
    if (!replyText) return;
    setReplies((prev) => ({ ...prev, [id]: replyText }));
    setActiveReplyId(null);
    setReplyText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Avis & Retours des Voisins
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            Note moyenne : {selectedStore.rating} ★ sur {selectedStore.reviewsCount} avis vérifiés
          </p>
        </div>
      </div>

      <MoroccanStarBorder />

      <div className="space-y-4">
        {reviews.map((rev) => {
          const hasReply = replies[rev.id] || rev.reply;
          const isReplying = activeReplyId === rev.id;

          return (
            <div
              key={rev.id}
              className="p-5 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[var(--ink)]">{rev.customerName}</span>
                    <span className="text-[11px] text-[var(--ink-muted)]">• {rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--amber-gold)] mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {!hasReply && !isReplying && (
                  <button
                    onClick={() => setActiveReplyId(rev.id)}
                    className="px-3 py-1.5 rounded-xl border border-[var(--border-warm)] hover:bg-[var(--wall)] text-xs font-semibold text-[var(--rust)] cursor-pointer flex items-center gap-1"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Répondre au voisin</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-[var(--ink)] leading-relaxed">{rev.comment}</p>

              {/* Reply Box if present */}
              {hasReply && (
                <div className="p-3.5 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-1 text-xs">
                  <span className="font-bold text-[var(--rust)] font-kalam text-sm block">
                    Réponse de {selectedStore.name} :
                  </span>
                  <p className="text-[var(--ink)]">{hasReply}</p>
                </div>
              )}

              {/* Inline reply form */}
              {isReplying && (
                <div className="pt-2 border-t border-[var(--border-warm)] space-y-2 text-xs">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Écrire votre réponse cordiale..."
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1 rounded-lg border border-[var(--border-warm)]"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => submitReply(rev.id)}
                      className="px-3 py-1 rounded-lg bg-[var(--rust)] text-white font-bold"
                    >
                      Publier la réponse
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
