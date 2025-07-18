import { Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { DestinationSearch } from './DestinationSearch';
import { SearchButton } from '@/components/buttons';
import { DatePicker } from './DatePicker';
import { useNavigate } from '@tanstack/react-router';
import { SearchParamsSchema } from '@/schemas/SearchParamsSchema';

export function SearchControlsLanding() {
  const navigate = useNavigate({});

  const form = useForm({
    initialValues: {
      uid: '',
      term: '',
      date: [null, null] as [string | null, string | null],
      guests: 1,
      rooms: 1,
    },
    validate: {
      uid: (value) => (value ? null : 'Destination is required'),
      date: (value) => (value[0] && value[1] ? null : 'Date range is required'),
    },
  });

  const handleSearchButtonClick = () => {
    const validationResult = form.validate();
    if (validationResult.hasErrors) {
      console.error('Validation failed:', validationResult.errors);
      return;
    }

    void navigate({
      to: '/search',
      search: SearchParamsSchema.parse(form.values),
    });
  };

  return (
    <Stack gap="xs">
      <Group justify="space-between" wrap="wrap" style={{ gap: 8 }}>
        <DestinationSearch
          onDestinationChange={(uid, term) => {
            form.setFieldValue('uid', uid);
            form.setFieldValue('term', term);
          }}
          error={form.errors.selectedUid ? true : false}
        />
        <SearchButton onClick={handleSearchButtonClick} />
      </Group>

      <Group gap="xs" wrap="wrap">
        <DatePicker
          date={form.values.date}
          setDate={(date) => form.setFieldValue('date', date)}
          error={form.errors.date ? true : false}
        />
        <GuestsRoomsSelector
          guests={form.values.guests}
          rooms={form.values.rooms}
          setGuests={(guests) => form.setFieldValue('guests', guests)}
          setRooms={(rooms) => form.setFieldValue('rooms', rooms)}
        />
      </Group>
    </Stack>
  );
}
