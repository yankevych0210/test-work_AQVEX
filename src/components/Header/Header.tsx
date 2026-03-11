import { useState, useCallback, useEffect } from 'react';
import { debounce } from '../../utils/debounce';
import logo from '../../assets/logo.png';
import s from './Header.module.scss';

interface Props {
  onSearch: (q: string) => void;
}

export function Header({ onSearch }: Props) {
  const [value, setValue] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(onSearch, 300), [onSearch]);

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  return (
    <header className={s.header}>
      <a href="/" className={s.logo}>
        <img src={logo} alt="AQVEX" />
      </a>
      <div className={s.search}>
        <svg
          className={s.searchIcon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Поиск"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={s.input}
        />
      </div>
    </header>
  );
}
