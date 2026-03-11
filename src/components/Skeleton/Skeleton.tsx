import s from './Skeleton.module.scss';

export function Skeleton() {
  return (
    <div className={s.card}>
      <div className={s.image} />
      <div className={s.body}>
        <div className={s.price} />
        <div className={s.title} />
        <div className={s.titleShort} />
        <div className={s.stars} />
        <div className={s.tags} />
        <div className={s.actions} />
      </div>
    </div>
  );
}
