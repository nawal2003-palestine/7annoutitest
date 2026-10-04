import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { HelpCircle, ChevronDown, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export const ContactFaqScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  const faqs = [
    {
      q: 'Comment fonctionne le carnet de Karna sur Smart Hanout ?',
      qAr: 'كيفاش كيخدم الكرنا الرقمي ؟',
      a: 'Le Karna est accordé par le moul lhanout à ses clients de confiance du quartier. Si vous êtes éligible, l\'option "Ajouter au Karna" apparaît lors du paiement. Vous pouvez consulter l\'historique détaillé de vos achats et de vos règlements à tout moment.',
    },
    {
      q: 'Les prix sur l\'application sont-ils plus chers qu\'en boutique ?',
      qAr: 'واش الأثمنة غالية على الحانوت العادي ؟',
      a: 'Non, absolument pas ! Les prix des produits de première nécessité (pain, lait, thé, farine, sucre) sont strictement identiques au tarif officiel comptoir. Seuls des frais de livraison de quartier (4 à 6 DH) sont appliqués, souvent offerts dès 80 à 100 DH d\'achat.',
    },
    {
      q: 'Qui assure la livraison de mes courses ?',
      qAr: 'شكون اللي كيوصل السخرة للدار ؟',
      a: 'La livraison est assurée soit directement par le commis de votre hanoutier, soit par un coursier à moto de proximité, soit par le concierge de votre immeuble qui monte vos paquets directement à votre étage.',
    },
    {
      q: 'Puis-je commander du pain chaud ou des œufs frais sans qu\'ils soient abîmés ?',
      qAr: 'واش الخبز كيجي سخون والبيض كيوصل مزيان ؟',
      a: 'Nos livreurs utilisent des sacs isothermes rembourrés et sont habitués aux produits fragiles. Les fournées de pain sont synchronisées avec le four traditionnel du quartier.',
    },
    {
      q: 'Que faire en cas de produit manquant ou non conforme ?',
      qAr: 'إلا كانت خاصاني شي حاجة فالكوماوند أشنو ندير ؟',
      a: 'Vous pouvez soit appeler directement votre hanoutier depuis le récapitulatif de commande, soit utiliser l\'écran "Signaler un problème" pour un remboursement ou un échange immédiat en quelques minutes.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 text-left">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="font-kalam text-lg text-[var(--rust)] font-bold">Assistance & Voisinage</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--ink)]">
          Questions Fréquentes & Support Local
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Une équipe marocaine à votre écoute 7 jours sur 7, de 07h00 à 23h30.
        </p>
      </div>

      <MoroccanStarBorder />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FAQs */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-lg font-bold text-[var(--ink)] flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-[var(--rust)]" />
            <span>Questions les plus posées</span>
          </h3>

          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--border-warm)] bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-[var(--wall)] transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-sm text-[var(--ink)] block">{faq.q}</span>
                    <span className="font-kalam text-xs text-[var(--amber-gold)] block">{faq.qAr}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--rust)] transition-transform shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 border-t border-[var(--border-warm)] text-xs text-[var(--ink-muted)] leading-relaxed bg-[var(--wall)]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Form & Hotline */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-[var(--wall-dark)] border border-[var(--border-warm)] space-y-4">
            <h4 className="font-bold text-base text-[var(--ink)]">Hotline Téléphonique</h4>
            <div className="space-y-2 text-xs text-[var(--ink-muted)]">
              <div className="flex items-center gap-2 font-bold text-[var(--rust)] text-sm">
                <Phone className="w-4 h-4" />
                <span>+212 5 22 99 88 77</span>
              </div>
              <p>Ligne directe Casablanca / Rabat / Marrakech</p>
              <div className="flex items-center gap-2 pt-1 text-[var(--ink)]">
                <Mail className="w-3.5 h-3.5 text-[var(--shutter-blue)]" />
                <span>salam@smarthanout.ma</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[var(--border-warm)] shadow-xs space-y-4">
            <h4 className="font-bold text-base text-[var(--ink)]">Envoyer un message</h4>
            {sent ? (
              <div className="p-4 rounded-xl bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)] text-xs space-y-2 text-center">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <p className="font-bold">Message transmis avec succès !</p>
                <p className="text-[11px] text-[var(--ink)]">Nous vous répondrons par SMS ou courriel sous 2 heures.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="font-bold text-[var(--ink)] block mb-1">Votre nom</label>
                  <input
                    required
                    defaultValue="Karim Bennani"
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[var(--ink)] block mb-1">Téléphone portable</label>
                  <input
                    required
                    defaultValue="06 61 88 23 11"
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[var(--ink)] block mb-1">Votre question ou suggestion</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Posez votre question à notre équipe..."
                    defaultValue="Bonjour, je souhaiterais savoir si le hanout de la rue Zerktouni accepte les commandes programmées du matin."
                    className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] text-[var(--ink)]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer ma demande</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
