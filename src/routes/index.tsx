import styles from './index.module.css';
import {
  IconCaretRightFilled,
  IconCircleCheck,
  IconClockHour4,
  IconGift,
  IconRefresh,
} from '@tabler/icons-react';
import { useHotels } from '@/hooks';
import { IndexTopNavBar } from '@/features/LandingPage/IndexTopNavBar/IndexTopNavBar';
import { Footer } from '@/components/Footer/Footer';
import { HotelGrid } from '@/components/HotelGrid/HotelGrid';
import { HelpButton } from '@/components/buttons/';
import { SearchControlsLanding } from '@/components/SearchControls/SearchControlsLanding';
import { Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { Exceptional } from '@/features/LandingPage/Exceptional/Exceptional';

export const Route = createFileRoute({
  component: Index,
});

function Index() {
  const { hotels, isLoading } = useHotels();

  const theme = useMantineTheme();

  return (
    <>
      {/* <IndexTopNavBar /> */}

      <div className={styles['root-container']}>
        {/* Search panel */}
        <div className={styles['search-container']}>
          <Stack gap={0}>
            <Text size={'3rem'} ff={theme.other.displayFont} fw={300}>
              Where to next?
            </Text>
            <Text size="xl" ml={'xs'} mb={'sm'}>
              Your next stay awaits.
            </Text>
            <SearchControlsLanding />
          </Stack>
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
