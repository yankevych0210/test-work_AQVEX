import type { Volume } from '../../types/product';
import s from './VolumeSelect.module.scss';

interface Props {
  volumes: Volume[];
  selectedId: string;
  onChange: (id: string) => void;
}

export function VolumeSelect({ volumes, selectedId, onChange }: Props) {
  if (volumes.length <= 1) return null;

  return (
    <select
      className={s.select}
      value={selectedId}
      onChange={(e) => onChange(e.target.value)}
    >
      {volumes.map((v) => (
        <option key={v.id} value={v.id} disabled={!v.in_stock}>
          {v.label}
        </option>
      ))}
    </select>
  );
}
