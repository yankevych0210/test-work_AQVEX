import type { SortOption } from '../../types/product';
import s from './SortBar.module.scss';

interface Props {
  totalCount: number;
  sort: SortOption;
  onSort: (s: SortOption) => void;
}

const SORT_LABELS: Record<SortOption, string> = {
  popularity: 'По популярности',
  price_asc: 'От дешевых',
  price_desc: 'От дорогих',
  name: 'По названию',
};

export function SortBar({ totalCount, sort, onSort }: Props) {
  return (
    <div className={s.bar}>
      <span className={s.count}>
        {totalCount} товаров
      </span>
      <div className={s.sortWrap}>
        <svg
          className={s.sortIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="6" x2="16" y2="6" />
          <line x1="4" y1="12" x2="12" y2="12" />
          <line x1="4" y1="18" x2="8" y2="18" />
          <polyline points="15 15 18 18 21 15" />
          <line x1="18" y1="10" x2="18" y2="18" />
        </svg>
        <select
          className={s.select}
          value={sort}
          onChange={(e) => onSort(e.target.value as SortOption)}
        >
          {Object.entries(SORT_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
