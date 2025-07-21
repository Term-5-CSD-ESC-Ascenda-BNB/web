import { Flex, Title, Divider, SimpleGrid, Stack } from '@mantine/core';
import { IconCircleCheck, IconRefresh, IconClockHour4, IconGift } from '@tabler/icons-react';
import { Exceptional } from './Exceptional';

export function ExceptionalSection() {
  return (
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
  );
}
