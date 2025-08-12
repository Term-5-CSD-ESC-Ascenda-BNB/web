import { useMockHotels, useMarkerHover } from '@/hooks';
import styles from './profile.module.css';
import { IndexTopNavBar } from '@/features/LandingPage/IndexTopNavBar/IndexTopNavBar';
import { Flex, Stack, Group, Loader } from '@mantine/core';
import ProfilePicture from '@/components/ProfilePicture/ProfilePicture';
import { Milestone } from '@/components/Milestone/Milestone';
import { MilestoneBadge } from '@/components/Milestone/MilestoneBadge';
import { IconHelp, IconDiamond } from '@tabler/icons-react';
import { BookingGrid } from '@/components/BookingGrid/BookingGrid';
import { useProfile } from '@/hooks/useProfile';
import { useDeleteAccount } from '@/hooks/useDeleteProfile';

export const Route = createFileRoute({
  component: Profile,
});

const getYearsOnWayfare = (createdAt: string): number => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const years = now.getFullYear() - createdDate.getFullYear();
  return years;
};

function Profile() {
  const { hotels, isLoading: hotelsLoading } = useMockHotels();
  const { profile, isLoading: profileLoading, isUnauthenticated } = useProfile();
  const { handleMouseEnter, handleMouseLeave } = useMarkerHover();
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleDeleteAccount = () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    deleteAccount(undefined, {
      onSuccess: () => {
        window.location.href = '/';
      },
      onError: () => {
        alert('Failed to delete account.');
      },
    });
  };

  if (profileLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Flex>
    );
  }

  if (isUnauthenticated || !profile) {
    window.location.href = '/login';
    return null;
  }

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
                {/* <Group gap={4} className={styles['help-link']}>
                  <IconHelp size="0.9rem" />
                  <p>How to earn points?</p>
                </Group> */}
              </Stack>

              <Stack gap={0} className={styles['details-container']}>
                <Group gap="xs" align="center">
                  <h2 className={styles['name-container']}>
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <IconDiamond size="1.1rem" color="#8bd7f3" />
                </Group>
                {/* <p className={styles['country-container']}>
                  {profile.bookings?.[0]?.country || 'No bookings yet'}
                </p> */}
              </Stack>
            </Group>
          </Flex>
        </div>
      </div>

      <div className={styles['achievements-container']}>
        <Stack gap="m">
          <Group className={styles['milestones-container']} gap="xl">
            <Milestone
              milestone={'Years on Wayfare'}
              count={getYearsOnWayfare(profile.createdAt)}
            ></Milestone>
            <Milestone milestone={'Countries Visited'} count={profile.bookings.length}></Milestone>
            <Milestone
              milestone={'Trips Embarked'}
              count={profile.bookings.reduce((sum, b) => sum + b.count, 0)}
            ></Milestone>
            {/* <Milestone milestone={'Reviews Crafted'} count={10}></Milestone> */}
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
        <div className={styles['custom-divider-wrapper']}>
          <div className={styles['custom-divider-line']} />
          <span className={styles['booking-history-label']}>My Booking History</span>
          <div className={styles['custom-divider-line']} />
        </div>
        <BookingGrid
          hotels={hotels}
          isLoading={hotelsLoading}
          onHotelMouseEnter={handleMouseEnter}
          onHotelMouseLeave={handleMouseLeave}
        />
      </div>
      <div className={styles['delete-account-container']}>
        <button className={styles['delete-account-button']} onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </>
  );
}
