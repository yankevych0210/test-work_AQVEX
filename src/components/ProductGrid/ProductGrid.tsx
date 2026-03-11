import type { Product } from '../../types/product';
import { ProductCard } from '../ProductCard';
import { Skeleton } from '../Skeleton';
import s from './ProductGrid.module.scss';

interface Props {
  products: Product[];
  loading: boolean;
}

export function ProductGrid({ products, loading }: Props) {
  if (loading) {
    return (
      <div className={s.grid}>
        {Array.from({ length: 12 }, (_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={s.empty}>
        Товары не найдены
      </div>
    );
  }

  return (
    <div className={s.grid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
