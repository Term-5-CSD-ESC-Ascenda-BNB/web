import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useRef, useState } from 'react';

interface DatePickerProps {
  date: [string | null, string | null];
  setDate: (date: [string | null, string | null]) => void;
  error?: boolean;
}

export function DatePicker({ date, setDate, error }: DatePickerProps) {
  const [internalDate, setInternalDate] = useState(date);
  const lastValidDateRange = useRef<[string | null, string | null]>(date);

  const handleDateChange = (value: [string | null, string | null]) => {
    // If we have a valid date range
    if (value[0] && value[1]) {
      setDate(value);
      setInternalDate(value);
      lastValidDateRange.current = value;
    }
    // If both dates are null (user cancelled selection or clicked same date twice)
    else if (value[0] === null && value[1] === null) {
      setInternalDate(lastValidDateRange.current);
    }
    // If only one date is selected (in the middle of selection)
    else {
      setInternalDate(value);
    }
  };

  return (
    <>
      <DatePickerInput
        size="sm"
        type="range"
        placeholder="Choose dates"
        value={internalDate}
        onChange={handleDateChange}
        valueFormat="D MMM"
        excludeDate={(dateStr) => {
          // checkin has to be at least 3 days in the future
          // so anything 2 days or less from now is excluded
          const twoDaysFromNow = new Date();
          twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
          const selectedDate = new Date(dateStr);
          return selectedDate < twoDaysFromNow;
        }}
        leftSection={<IconCalendar size={16} />}
        style={{ width: 165 }}
        radius={50}
        error={error}
        styles={{
          input: {
            height: 42,
          },
        }}
      />
    </>
  );
}
