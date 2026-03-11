import s from './Rating.module.scss';

interface Props {
  rating: number;
  count: number;
}

export function Rating({ rating, count }: Props) {
  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars;

  return (
    <div className={s.rating}>
      <div className={s.stars}>
        {Array.from({ length: 5 }, (_, i) => {
          let fill = 0;
          if (i < fullStars) fill = 100;
          else if (i === fullStars) fill = Math.round(fraction * 100);

          return (
            <svg
              key={i}
              className={s.star}
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id={`star-grad-${i}-${rating}`}>
                  <stop offset={`${fill}%`} stopColor="#43A0FD" />
                  <stop offset={`${fill}%`} stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={`url(#star-grad-${i}-${rating})`}
              />
            </svg>
          );
        })}
      </div>
      <span className={s.count}>{count}</span>
    </div>
  );
}
