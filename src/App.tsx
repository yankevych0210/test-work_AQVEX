import { Header } from './components/Header';
import { SortBar } from './components/SortBar';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { useProducts } from './hooks/useProducts';
import s from './App.module.scss';

export default function App() {
  const {
    products,
    totalCount,
    loading,
    error,
    sort,
    page,
    totalPages,
    setQuery,
    setSort,
    setPage,
  } = useProducts();

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Header onSearch={setQuery} />

        {error ? (
          <div className={s.error}>
            <p>Не удалось загрузить товары</p>
            <p className={s.errorDetail}>{error}</p>
          </div>
        ) : (
          <>
            <SortBar totalCount={totalCount} sort={sort} onSort={setSort} />
            <ProductGrid products={products} loading={loading} />
            {!loading && (
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
