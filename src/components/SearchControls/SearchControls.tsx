import { Group } from '@mantine/core';
import { GuestsRoomsSelector } from './GuestsRoomsSelector';
import { DatePicker } from './DatePicker';
import { DestinationSearch } from './DestinationSearch';
import { getRouteApi } from '@tanstack/react-router';
import { type SearchParams } from '@/schemas/searchParams';
import { SearchButton } from '../buttons';
import { useForm } from '@mantine/form';
import { useSearchState } from '@/features/SearchPage/useSearchState';

const routeApi = getRouteApi('/search');

export function SearchControls() {
  const searchParams = routeApi.useSearch();
  const { updateSearchParams } = useSearchState();

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

    const updatedSearchParams: Partial<SearchParams> = {
      uid: form.values.uid,
      term: form.values.term,
      date: form.values.date,
      guests: form.values.guests,
      rooms: form.values.rooms,
      page: 1,
    };

    updateSearchParams(updatedSearchParams);
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
