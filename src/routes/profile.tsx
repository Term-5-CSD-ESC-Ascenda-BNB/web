import { useMockHotels, useMarkerHover } from '@/hooks';
import styles from './profile.module.css';
import { IndexTopNavBar } from '@/features/LandingPage/IndexTopNavBar/IndexTopNavBar';
import { Flex, Stack, Group } from '@mantine/core';
import ProfilePicture from '@/components/ProfilePicture/ProfilePicture';
import { Milestone } from '@/components/Milestone/Milestone';
import { MilestoneBadge } from '@/components/Milestone/MilestoneBadge';
import { IconHelp, IconDiamond } from '@tabler/icons-react';
import { BookingGrid } from '@/components/BookingGrid/BookingGrid';

export const Route = createFileRoute({
  component: Profile,
});

function Profile() {
  const { hotels, isLoading } = useMockHotels();
  const { makeMarkerRef, handleMouseEnter, handleMouseLeave, handlePopupOpen, handlePopupClose } =
    useMarkerHover();
  return (
    <>
      <div className={styles['fixed-profile-wrapper']}>
        <IndexTopNavBar />
        {/* Gradient header with edit icon */}
        <div className={styles['root-container']}></div>

        {/* Profile section */}
        <div className={styles['profile-background']}>
          <Flex align="flex-start" className={styles['profile-container']}>
            <Group align="flex-start">
              <Stack align="center" gap={0}>
                <div className={styles['picture-container']}>
                  <ProfilePicture />
                </div>
                <Group gap={4} className={styles['help-link']}>
                  <IconHelp size="0.9rem" />
                  <p>How to earn points?</p>
                </Group>
              </Stack>

              <Stack gap={0} className={styles['details-container']}>
                <Group gap="xs" align="center">
                  <h2 className={styles['name-container']}>Ronald McDonald</h2>
                  <IconDiamond size="1.1rem" color="#8bd7f3" />
                </Group>
                <p className={styles['country-container']}>Singapore</p>
              </Stack>
            </Group>
          </Flex>
        </div>
      </div>
      <div className={styles['achievements-container']}>
        <Stack gap="m">
          <Group className={styles['milestones-container']} gap="xl">
            <Milestone milestone={'Years on Wayfare'} count={5}></Milestone>
            <Milestone milestone={'Countries Visited'} count={22}></Milestone>
            <Milestone milestone={'Trips Embarked'} count={54}></Milestone>
            <Milestone milestone={'Reviews Crafted'} count={10}></Milestone>
          </Group>

          <div className={styles['custom-divider-wrapper']}>
            <div className={styles['custom-divider-line']} />
            <span className={styles['where-i-been-label']}>Where I've Been</span>
            <div className={styles['custom-divider-line']} />
          </div>

          <Group className={styles['badges-container']} gap="xl">
            <MilestoneBadge
              image={''}
              country={'Paris, France'}
              date={'January 2025'}
            ></MilestoneBadge>
            <MilestoneBadge
              image={''}
              country={'Wilderswil, Switzerland'}
              date={'January 2025'}
            ></MilestoneBadge>
            <MilestoneBadge
              image={''}
              country={'Tromsø, Norway'}
              date={'December 2024'}
            ></MilestoneBadge>
            <MilestoneBadge
              image={''}
              country={'Dubai, United Arab Emirates'}
              date={'December 2024'}
            ></MilestoneBadge>
            <MilestoneBadge
              image={''}
              country={'Berkeley, California'}
              date={'May 2024'}
            ></MilestoneBadge>
          </Group>
        </Stack>
      </div>
      <div className={styles['booking-history-container']}>
        {/* <Divider
          label="My Booking History"
          labelPosition="center"
          size="sm"
          color="#808ab1"
          mt="sm"
          mb="sm"
          className={styles['divider-label-2']}
        /> */}
        <div className={styles['custom-divider-wrapper']}>
          <div className={styles['custom-divider-line']} />
          <span className={styles['booking-history-label']}>My Booking History</span>
          <div className={styles['custom-divider-line']} />
        </div>
        <BookingGrid
          hotels={hotels}
          isLoading={isLoading}
          onHotelMouseEnter={handleMouseEnter}
          onHotelMouseLeave={handleMouseLeave}
        />
      </div>
    </>
  );
}
