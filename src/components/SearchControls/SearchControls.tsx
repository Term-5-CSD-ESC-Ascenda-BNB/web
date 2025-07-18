import { Group } from '@mantine/core';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { DatePicker } from './DatePicker';
import { DestinationSearch } from './DestinationSearch';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { SearchParamsSchema } from '@/schemas/SearchParamsSchema';
import { SearchButton } from '../buttons';
import { useForm } from '@mantine/form';

const routeApi = getRouteApi('/search');

export function SearchControls() {
  const searchParams = routeApi.useSearch();
  const navigate = useNavigate({});

  const form = useForm({
    initialValues: {
      uid: searchParams.uid,
      term: searchParams.term,
      date: searchParams.date,
      guests: searchParams.guests,
      rooms: searchParams.rooms,
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
    <Group gap="xs" flex={1} display={'flex'}>
      <DestinationSearch
        destination={form.values.term}
        onDestinationChange={(uid, term) => {
          form.setFieldValue('uid', uid);
          form.setFieldValue('term', term);
        }}
      />
      <DatePicker date={form.values.date} setDate={(date) => form.setFieldValue('date', date)} />
      <GuestsRoomsSelector
        guests={form.values.guests}
        rooms={form.values.rooms}
        setGuests={(guests) => form.setFieldValue('guests', guests)}
        setRooms={(rooms) => form.setFieldValue('rooms', rooms)}
      />
      <SearchButton onClick={handleSearchButtonClick} />
    </Group>
  );
}
