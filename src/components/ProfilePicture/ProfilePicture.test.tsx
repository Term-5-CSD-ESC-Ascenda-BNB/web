import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfilePicture from './ProfilePicture';

vi.mock('@mantine/core', () => ({
  Avatar: ({ src, alt }: { src?: string; alt?: string }) => (
    <img data-testid="avatar" src={src} alt={alt} />
  ),
  ActionIcon: ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => (
    <button data-testid="edit-button" onClick={onClick}>
      {children}
    </button>
  ),
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@tabler/icons-react', () => ({
  IconPencil: () => <span>Edit Icon</span>,
}));

describe('ProfilePicture', () => {
  it('renders default avatar and edit button', () => {
    render(<ProfilePicture />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    expect(screen.getByText('Edit Icon')).toBeInTheDocument();
  });

  it('triggers file input click when edit button is clicked', () => {
    render(<ProfilePicture />);
    const input = screen.getByTestId('file-input');
    const clickSpy = vi.spyOn(input, 'click');

    fireEvent.click(screen.getByTestId('edit-button'));
    expect(clickSpy).toHaveBeenCalled();
  });

  it('updates image source after file is selected', async () => {
    render(<ProfilePicture />);
    const file = new File(['dummy'], 'profile.png', { type: 'image/png' });

    const input = screen.getByTestId('file-input');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() =>
      expect(screen.getByTestId('avatar')).toHaveAttribute(
        'src',
        expect.stringContaining('data:image')
      )
    );
  });
});
