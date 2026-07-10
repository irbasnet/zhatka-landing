import { useEffect, useState } from 'react';
import { getProducts } from '../api/client';

export default function ProductSelect({ value, onChange }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <select
      className="product-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
    >
      <option value="">{loading ? 'Loading products…' : 'Select a product…'}</option>
      {products.map((product) => (
        <option key={product} value={product}>{product}</option>
      ))}
    </select>
  );
}
