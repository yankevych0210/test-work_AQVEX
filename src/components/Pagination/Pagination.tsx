import s from './Pagination.module.scss';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = getPages(page, totalPages);

  return (
    <nav className={s.pagination}>
      <button
        className={s.arrow}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        type="button"
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className={s.dots}>…</span>
        ) : (
          <button
            key={p}
            className={`${s.pageBtn} ${p === page ? s.active : ''}`}
            onClick={() => onChange(p)}
            type="button"
          >
            {p}
          </button>
        )
      )}

      <button
        className={s.arrow}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        type="button"
        aria-label="Следующая страница"
      >
        →
      </button>
    </nav>
  );
}
