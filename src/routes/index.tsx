import styles from './index.module.css';
import {
  IconCaretRightFilled,
  IconChevronDown,
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
import { FeaturedSection } from '@/features/LandingPage/FeaturedSection';
import {
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Exceptional } from '@/features/LandingPage/Exceptional/Exceptional';

export const Route = createFileRoute({
  component: Index,
});

function Index() {
  const { hotels, isLoading } = useHotels();

  const theme = useMantineTheme();

  return (
    <>
      {/* // TODO: redesign navbar and add it back */}
      {/* <IndexTopNavBar /> */}

      <Flex align={'center'} className={styles['root-container']} px={'10vw'}>
        <Stack gap={0}>
          <Text size={'3rem'} ff={theme.other.displayFont} fw={300}>
            Where to next?
          </Text>

          <Text size="xl" ml={'xs'} mb={'sm'}>
            Your next stay awaits.
          </Text>

          <SearchControlsLanding />
        </Stack>

        <Stack className={styles['scroll-prompt']} justify="center" align="center" gap={0}>
          <Text size="sm">More</Text>
          <IconChevronDown size={32} stroke={1.5} />
        </Stack>
      </Flex>

      <Stack mx={'20vw'} my={'10vw'} gap={'10vw'}>
        <FeaturedSection
          title="Featured Hotels"
          hotels={hotels.slice(0, 3)}
          isLoading={isLoading}
        />

        <FeaturedSection
          title="Recommended for you"
          hotels={hotels.slice(3, 6)}
          isLoading={isLoading}
        />

        <FeaturedSection
          title="Your saved searches"
          hotels={hotels.slice(6, 9)}
          isLoading={isLoading}
        />

        <Stack gap={0}>
          <Flex justify="center" align="center">
            <Title order={2} fw={500} fz={'2rem'}>
              Exceptional Stays, Exceptional Standards
            </Title>
          </Flex>
          <Divider my={'lg'} />
          <SimpleGrid cols={2}>
            <Exceptional
              icon={IconCircleCheck}
              header="Verified Listings"
              body="Every property is vetted for quality, so you can book with confidence — no surprises, just stays that meet our standards."
            />
            <Exceptional
              icon={IconRefresh}
              header="Flexible Cancellations"
              body="Plans change — and that’s okay. Enjoy peace of mind with flexible cancellation policies on select stays."
            />
            <Exceptional
              icon={IconClockHour4}
              header="24/7 Support"
              body="Need help, day or night? Our dedicated support team is always here to assist — anytime, anywhere."
            />
            <Exceptional
              icon={IconGift}
              header="Exclusive Offers"
              body="Unlock special deals and members-only perks when you book directly through our platform."
            />
          </SimpleGrid>
        </Stack>
      </Stack>

      <HelpButton />
      <Footer />
    </>
  );
}
