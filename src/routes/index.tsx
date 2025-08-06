import styles from './index.module.css';
import { IconChevronDown } from '@tabler/icons-react';
import { IndexTopNavBar } from '@/features/LandingPage/IndexTopNavBar/IndexTopNavBar';
import { HelpButton } from '@/components/buttons/';
import { SearchControlsLanding } from '@/components/SearchControls/SearchControlsLanding';
import { FeaturedSection } from '@/features/LandingPage/FeaturedSection/FeaturedSection';
import { Flex, Stack, Text, useMantineTheme } from '@mantine/core';
import { ExceptionalSection } from '@/features/LandingPage/Exceptional/ExceptionalSection';
import { ThreeCanvas } from '@/three/ThreeCanvas';
import { CoordsProvider } from '@/context/CoordsProvider';
import { useLandingHotels } from '@/features/LandingPage/useLandingHotels';
import { ErrorAlert } from '@/components/ErrorAlert/ErrorAlert';

export const Route = createFileRoute({
  component: Index,
});

function Index() {
  const { data, isLoading, error, isError } = useLandingHotels();
  const hotels = data?.hotels || [];

  const theme = useMantineTheme();

  return (
    <>
      <IndexTopNavBar />

      {/* Hero section */}
      <CoordsProvider>
        <Flex align={'center'} className={styles['hero-container']} px={'10vw'}>
          <Stack gap={0} className={styles['hero-content']}>
            <Text size={'3rem'} ff={theme.other.displayFont} fw={300}>
              Where to next?
            </Text>

            <Text size="xl" ml={'xs'} mb={'sm'}>
              Your next stay awaits.
            </Text>

            <SearchControlsLanding />
          </Stack>

          <ThreeCanvas />

          <Stack className={styles['scroll-prompt']} justify="center" align="center" gap={0}>
            <Text size="sm">More</Text>
            <IconChevronDown size={32} stroke={1.5} />
          </Stack>
        </Flex>
      </CoordsProvider>

      <Stack mx={'20vw'} my={'10vw'} gap={'10vw'}>
        {isError && <ErrorAlert title={'Error fetching hotels'} message={error.message} />}

        {!isError && (
          <Stack>
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
          </Stack>
        )}

        <ExceptionalSection />
      </Stack>

      <HelpButton />
    </>
  );
}
