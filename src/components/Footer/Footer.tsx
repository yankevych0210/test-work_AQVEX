import qIcon from '../../assets/q-icon.png';
import ukraineBadge from '../../assets/ukraine-badge.png';
import mastercardLogo from '../../assets/mastercard.png';
import visaLogo from '../../assets/visa.png';
import applePayLogo from '../../assets/apple-pay.png';
import googlePayLogo from '../../assets/google-pay.png';
import s from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.brand}>
            <img src={qIcon} alt="AQVEX" className={s.brandIcon} />
            <img src={ukraineBadge} alt="Made in Ukraine" className={s.badge} />
          </div>
          <span className={s.copy}>
            AQVEX © {year} | Все права защищены
          </span>
        </div>

        <div className={s.payments}>
          <img src={mastercardLogo} alt="Mastercard" />
          <img src={visaLogo} alt="Visa" />
          <img src={applePayLogo} alt="Apple Pay" />
          <img src={googlePayLogo} alt="Google Pay" />
        </div>
      </div>
    </footer>
  );
}
