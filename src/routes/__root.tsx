import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import styles from './nav.module.css';
import { Footer } from '@/components/Footer/Footer';

export const Route = createRootRoute({
  component: () => (
    <>
      {/* {
        <div className={styles.navbar}>
          <Link to="/" className={styles.link + ' [&.active]:font-bold'}>
            Home
          </Link>
          <Link to="/about" className={styles.link + ' [&.active]:font-bold'}>
            About
          </Link>
          <Link to="/search" className={styles.link + ' [&.active]:font-bold'}>
            Search
          </Link>
          <Link to="/payment" className={styles.link + ' [&.active]:font-bold'}>
            Payment
          </Link>
        </div>
      } */}

      <Outlet />
      <Footer />

      <TanStackRouterDevtools />
    </>
  ),
});
