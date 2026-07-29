import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/route_paths';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage(): React.ReactNode {
  return (
    <main id="main" className={styles.root}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>페이지를 찾을 수 없습니다.</h1>
      <p className={styles.description}>요청하신 페이지가 존재하지 않습니다.</p>
      <Link to={ROUTE_PATHS.ROOT} className={styles.homeLink}>
        <span aria-hidden="true">←</span> Back to Home
      </Link>
    </main>
  );
}
