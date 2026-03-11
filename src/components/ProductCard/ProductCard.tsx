import { useState } from 'react';
import type { Product } from '../../types/product';
import { Rating } from '../Rating';
import { VolumeSelect } from '../VolumeSelect';
import checkIcon from '../../assets/check.png';
import cartIcon from '../../assets/cart.png';
import s from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const [selectedVolume, setSelectedVolume] = useState(product.selected_volume_id);
  const [imgError, setImgError] = useState(false);

  const imageSrc = product.image.startsWith('http')
    ? product.image
    : `/images/${product.image}`;

  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        {imgError ? (
          <div className={s.placeholder}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c5ccd6" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        ) : (
          <img
            src={imageSrc}
            alt={product.name}
            className={s.image}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className={s.body}>
        <div className={s.priceRow}>
          <span className={s.oldPrice}>
            {product.old_price}
          </span>
          <span className={s.price}>
            {product.price} {product.currency}
          </span>
          {product.discount_percent > 0 && (
            <span className={s.discount}>
              {product.discount_percent}%
            </span>
          )}
        </div>

        <h3 className={s.name}>{product.name}</h3>

        <Rating rating={product.rating} count={product.reviews_count} />

        <div className={s.tags}>
          {product.in_stock && (
            <span className={s.stock}>
              <img src={checkIcon} alt="" className={s.checkIcon} />
              В наличии
            </span>
          )}
          {product.in_stock && <span className={s.dot} />}
          <span className={s.category}>{product.category}</span>
        </div>

        <div className={s.actions}>
          <VolumeSelect
            volumes={product.volumes}
            selectedId={selectedVolume}
            onChange={setSelectedVolume}
          />
          <button className={s.cartBtn} type="button">
            <img src={cartIcon} alt="" className={s.cartIcon} />
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}
