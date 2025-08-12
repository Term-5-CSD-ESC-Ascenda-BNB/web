import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { ErrorAlert } from './ErrorAlert';

describe('ErrorAlert (presentational)', () => {
  it('renders default title and message', () => {
    render(<ErrorAlert />);
    expect(screen.getByText('Unexpected Error')).toBeInTheDocument();
    expect(
      screen.getByText('An unknown error occurred. Please try again later.')
    ).toBeInTheDocument();
  });

  it('renders custom title and message', () => {
    render(<ErrorAlert title="Custom Error" message="Something went wrong." />);
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});
