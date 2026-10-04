import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoroccanStarBorder } from '../../components/common/MoroccanStarBorder';
import { Product } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Eye,
  EyeOff,
  Package,
  CheckCircle,
  Tag,
  Barcode,
} from 'lucide-react';

export const MerchantProductsScreen: React.FC = () => {
  const { products, selectedStore } = useApp();
  const [productList, setProductList] = useState<Product[]>(products);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form states
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState<'epicerie' | 'boissons' | 'frais' | 'boulangerie' | 'hygiene' | 'epices'>('epicerie');
  const [newPrice, setNewPrice] = useState(15);
  const [newUnit, setNewUnit] = useState('Unité');
  const [newStock, setNewStock] = useState(25);

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleProductActive = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const created: Product = {
      id: `prod-${Date.now()}`,
      storeId: selectedStore.id,
      name: newName,
      category: newCat,
      description: 'Produit ajouté par Moul Lhanout pour réassort immédiat.',
      price: newPrice,
      unit: newUnit,
      stock: newStock,
      reservedStock: 0,
      lowStockThreshold: 5,
      imageTag: 'grocery',
      isActive: true,
    };
    setProductList([created, ...productList]);
    setShowAddModal(false);
    setNewName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
            Gestion du Catalogue Produits
          </h1>
          <p className="text-xs text-[var(--ink-muted)]">
            {productList.length} références répertoriées • Activation / Désactivation sans perte d'historique
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[var(--rust)] hover:bg-[var(--rust-hover)] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un produit</span>
        </button>
      </div>

      <MoroccanStarBorder />

      {/* Filter and search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom de produit (Atay, Couscous, Farine...)"
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[var(--border-warm)] bg-white text-[var(--ink)]"
          />
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <form
          onSubmit={handleAddProduct}
          className="p-6 rounded-3xl bg-white border-2 border-[var(--rust)] shadow-xl space-y-4 text-xs animate-in fade-in max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-warm)] pb-2">
            <h3 className="font-bold text-sm text-[var(--ink)]">
              Nouvelle référence au catalogue de {selectedStore.name}
            </h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-stone-400 hover:text-black font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold block mb-1">Nom du produit</label>
              <input
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex: Eau Ain Ifrane 1.5L"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Catégorie</label>
              <select
                value={newCat}
                onChange={(e) => setNewCat(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              >
                <option value="epicerie">Épicerie</option>
                <option value="frais">Produits Frais</option>
                <option value="boulangerie">Boulangerie</option>
                <option value="boissons">Boissons</option>
                <option value="hygiene">Hygiène</option>
                <option value="epices">Épices & Condiments</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold block mb-1">Prix de vente (DH)</label>
              <input
                type="number"
                step="0.5"
                required
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-mono"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Unité</label>
              <input
                required
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder="Ex: Bouteille 1.5L"
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)]"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Stock initial</label>
              <input
                type="number"
                required
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-[var(--border-warm)] bg-[var(--wall)] font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-xl border border-[var(--border-warm)]"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[var(--rust)] text-white font-bold"
            >
              Enregistrer l'article
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="p-6 rounded-3xl bg-white border border-[var(--border-warm)] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--border-warm)] text-[var(--ink-muted)] pb-2">
                <th className="py-2.5">Produit</th>
                <th className="py-2.5">Catégorie</th>
                <th className="py-2.5">Prix (DH)</th>
                <th className="py-2.5">Stock Disponible</th>
                <th className="py-2.5">Statut</th>
                <th className="py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-warm)]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[var(--wall)]">
                  <td className="py-3">
                    <div className="font-bold text-[var(--ink)]">{prod.name}</div>
                    {prod.nameAr && (
                      <span className="font-kalam text-xs text-[var(--amber-gold)]">
                        {prod.nameAr}
                      </span>
                    )}
                  </td>
                  <td className="py-3 capitalize text-[var(--ink-muted)]">{prod.category}</td>
                  <td className="py-3 font-mono font-bold text-[var(--rust)]">
                    {prod.price.toFixed(2)} DH
                  </td>
                  <td className="py-3 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        prod.stock <= prod.lowStockThreshold
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {prod.stock} {prod.unit}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        prod.isActive
                          ? 'bg-[var(--moroccan-green-light)] text-[var(--moroccan-green)]'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {prod.isActive ? 'Actif au hanout' : 'Désactivé'}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => toggleProductActive(prod.id)}
                      className="p-1.5 rounded-lg border border-[var(--border-warm)] hover:bg-[var(--wall)] text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                      title={prod.isActive ? 'Désactiver (rupture)' : 'Réactiver'}
                    >
                      {prod.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
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
