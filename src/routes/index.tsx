import styles from './index.module.css';
import {
  IconCaretRightFilled,
  IconCircleCheck,
  IconClockHour4,
  IconGift,
  IconRefresh,
} from '@tabler/icons-react';
import { useHotels } from '@/hooks';
import { IndexTopNavBar } from '@/components/IndexTopNavBar/IndexTopNavBar';
import { Footer } from '@/components/Footer/Footer';
import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { HelpButton } from '@/components/HelpButton/HelpButton';
import { SearchControlsLanding } from '@/components/SearchControls/SearchControlsLanding';
import { Group, Stack } from '@mantine/core';
import { Exceptional } from '@/components/Exceptional/Exceptional';

export const Route = createFileRoute({
  component: Index,
});

function Index() {
  const { hotels, isLoading } = useHotels();

  return (
    <>
      <IndexTopNavBar />
      <div className={styles['root-container']}>
        {/* Search panel */}
        <div className={styles['search-container']}>
          <div className={styles['search-content-container']}>
            <h1>Where to next?</h1>
            <p>Your next stay awaits.</p>
            <SearchControlsLanding />
          </div>
        </div>
        {/* Logo panel */}
        <div className={styles['logo-container']}></div>
      </div>
      <Stack gap={12} className={styles['listings-container']}>
        <h2>Featured Hotels</h2>
        <div className={styles['hotels-container']}>
          <HotelGrid hotels={hotels.slice(0, 3)} isLoading={isLoading} />
        </div>
        <a href="search" className={styles['discover-more']}>
          Discover more <IconCaretRightFilled size={16} color="black" />
        </a>
      </Stack>
      <Stack gap={12} className={styles['listings-container']}>
        <h2>Recommended for you</h2>
        <div className={styles['hotels-container']}>
          <HotelGrid hotels={hotels.slice(3, 6)} isLoading={isLoading} />
        </div>
        <a href="search" className={styles['discover-more']}>
          Discover more <IconCaretRightFilled size={16} color="black" />
        </a>
      </Stack>
      <Stack gap={12} className={styles['listings-container']}>
        <h2>Saved Searches</h2>
        <div className={styles['hotels-container']}>
          <HotelGrid hotels={hotels.slice(6, 9)} isLoading={isLoading} />
        </div>
        <a href="search" className={styles['discover-more']}>
          Discover more <IconCaretRightFilled size={16} color="black" />
        </a>
      </Stack>
      <div className={styles['exceptional-container']}>
        <Stack gap={12}>
          <h2>Exceptional Stays, Exceptional Standards</h2>
          <div className={styles['line']}></div>
          <Group>
            <Exceptional
              icon={IconCircleCheck}
              header={'Verified Listings'}
              body={
                'Every property is vetted for quality, so you can book with confidence — no surprises, just stays that meet our standards.'
              }
            />
            <Exceptional
              icon={IconRefresh}
              header={'Flexible Cancellations'}
              body={
                'Plans change — and that’s okay. Enjoy peace of mind with flexible cancellation policies on select stays.'
              }
            />
          </Group>
          <Group>
            <Exceptional
              icon={IconClockHour4}
              header={'24/7 Support'}
              body={
                'Need help, day or night? Our dedicated support team is always here to assist — anytime, anywhere.'
              }
            />
            <Exceptional
              icon={IconGift}
              header={'Exclusive Offers'}
              body={
                'Unlock special deals and members-only perks when you book directly through our platform.'
              }
            />
          </Group>
        </Stack>
      </div>
      <HelpButton />
      <Footer />
    </>
  );
}
