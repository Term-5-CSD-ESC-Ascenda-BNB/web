import { Alert } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';

interface ErrorAlertProps {
  title?: string;
  message?: string;
}

export function ErrorAlert({ title, message }: ErrorAlertProps) {
  return (
    <>
      <Alert
        variant="light"
        title={title || 'Unexpected Error'}
        color="red"
        radius="md"
        icon={<IconExclamationCircle size={16} />}
      >
        {message || 'An unknown error occurred. Please try again later.'}
      </Alert>
    </>
  );
}
