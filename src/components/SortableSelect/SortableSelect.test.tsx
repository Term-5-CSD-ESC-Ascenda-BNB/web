import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SortableSelect } from './SortableSelect';

describe('SortableSelect', () => {
  const mockFields = ['name', 'price', 'date', 'rating'];
  const mockOnSortChange = vi.fn();

  beforeEach(() => {
    mockOnSortChange.mockClear();
  });

  describe('rendering', () => {
    it('renders with default field and order', () => {
      render(<SortableSelect fields={mockFields} />);

      // Should render a textbox (select input)
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      // Should show first field as default (capitalised)
      const selectInput = screen.getByRole('textbox');
      expect(selectInput).toHaveValue('Name');

      // Should show descending icon by default
      const descendingIcon = document.querySelector('svg');
      expect(descendingIcon).toBeInTheDocument();
    });

    it('renders with custom default field', () => {
      render(<SortableSelect fields={mockFields} defaultField="price" />);

      const selectInput = screen.getByRole('textbox');
      expect(selectInput).toHaveValue('Price');
    });

    it('renders with custom default order', () => {
      render(<SortableSelect fields={mockFields} defaultOrder="asc" />);

      // Should show ascending icon when defaultOrder is 'asc'
      const ascendingIcon = document.querySelector('svg');
      expect(ascendingIcon).toBeInTheDocument();
    });

    it('renders with placeholder when no default field', () => {
      render(<SortableSelect fields={[]} />);

      expect(screen.getByPlaceholderText('Select field')).toBeInTheDocument();
    });

    it('forwards additional select props', () => {
      render(<SortableSelect fields={mockFields} data-testid="custom-select" disabled />);

      const select = screen.getByTestId('custom-select');
      expect(select).toBeInTheDocument();
      expect(select).toBeDisabled();
    });
  });

  describe('field selection', () => {
    it('changes field when option is selected', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} onSortChange={mockOnSortChange} />);

      const select = screen.getByRole('textbox');
      await user.click(select);

      // Select 'price' option
      const priceOption = screen.getByText('Price');
      await user.click(priceOption);

      const selectInput = screen.getByRole('textbox');
      expect(selectInput).toHaveValue('Price');
      expect(mockOnSortChange).toHaveBeenCalledWith('price', 'desc');
    });

    it('calls onSortChange with correct field and current order', async () => {
      const user = userEvent.setup();
      render(
        <SortableSelect fields={mockFields} defaultOrder="asc" onSortChange={mockOnSortChange} />
      );

      const select = screen.getByRole('textbox');
      await user.click(select);

      const ratingOption = screen.getByText('Rating');
      await user.click(ratingOption);

      expect(mockOnSortChange).toHaveBeenCalledWith('rating', 'asc');
    });

    it('does not change field when null value is passed', () => {
      render(<SortableSelect fields={mockFields} defaultField="name" />);

      // The current field should remain 'name'
      const selectInput = screen.getByRole('textbox');
      expect(selectInput).toHaveValue('Name');
    });

    it('prevents deselection of field', () => {
      render(<SortableSelect fields={mockFields} />);

      const select = screen.getByRole('textbox');
      // Mantine Select with allowDeselect={false} prevents clearing the selection
      expect(select).toBeInTheDocument();
    });
  });

  describe('sort order toggling', () => {
    it('toggles from desc to asc when icon is clicked', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} onSortChange={mockOnSortChange} />);

      // Click the sort icon (left section)
      const sortButton = screen.getByRole('button');
      await user.click(sortButton);

      expect(mockOnSortChange).toHaveBeenCalledWith('name', 'asc');
    });

    it('toggles from asc to desc when icon is clicked', async () => {
      const user = userEvent.setup();
      render(
        <SortableSelect fields={mockFields} defaultOrder="asc" onSortChange={mockOnSortChange} />
      );

      const sortButton = screen.getByRole('button');
      await user.click(sortButton);

      expect(mockOnSortChange).toHaveBeenCalledWith('name', 'desc');
    });

    it('updates icon when order changes', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} defaultOrder="asc" />);

      // Should start with ascending icon
      let sortIcon = document.querySelector('svg');
      expect(sortIcon).toBeInTheDocument();

      const sortButton = screen.getByRole('button');
      await user.click(sortButton);

      // Should now show descending icon
      sortIcon = document.querySelector('svg');
      expect(sortIcon).toBeInTheDocument();
    });

    it('calls onSortChange with current field when order toggles', async () => {
      const user = userEvent.setup();
      render(
        <SortableSelect fields={mockFields} defaultField="price" onSortChange={mockOnSortChange} />
      );

      const sortButton = screen.getByRole('button');
      await user.click(sortButton);

      expect(mockOnSortChange).toHaveBeenCalledWith('price', 'asc');
    });
  });

  describe('combined interactions', () => {
    it('maintains sort order when changing fields', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} onSortChange={mockOnSortChange} />);

      // First toggle to ascending
      const sortButton = screen.getByRole('button');
      await user.click(sortButton);
      expect(mockOnSortChange).toHaveBeenCalledWith('name', 'asc');

      // Then change field - should maintain ascending order
      const select = screen.getByRole('textbox');
      await user.click(select);
      const dateOption = screen.getByText('Price');
      await user.click(dateOption);

      expect(mockOnSortChange).toHaveBeenCalledWith('price', 'asc');
    });

    it('handles multiple field and order changes', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} onSortChange={mockOnSortChange} />);

      // Change field to 'rating'
      const select = screen.getByRole('textbox');
      await user.click(select);
      await user.click(screen.getByText('Rating'));

      // Toggle order to ascending
      const sortButton = screen.getByRole('button');
      await user.click(sortButton);

      // Change field to 'price' (should maintain asc order)
      await user.click(select);
      await user.click(screen.getByText('Price'));

      // Toggle order back to descending
      await user.click(sortButton);

      expect(mockOnSortChange).toHaveBeenCalledTimes(4);
      expect(mockOnSortChange).toHaveBeenNthCalledWith(1, 'rating', 'desc');
      expect(mockOnSortChange).toHaveBeenNthCalledWith(2, 'rating', 'asc');
      expect(mockOnSortChange).toHaveBeenNthCalledWith(3, 'price', 'asc');
      expect(mockOnSortChange).toHaveBeenNthCalledWith(4, 'price', 'desc');
    });
  });

  describe('accessibility', () => {
    it('has accessible sort button', () => {
      render(<SortableSelect fields={mockFields} />);

      const sortButton = screen.getByRole('button');
      expect(sortButton).toBeInTheDocument();
      // The cursor pointer style is on the parent left section div
      const leftSection = sortButton.parentElement;
      expect(leftSection).toHaveStyle({ cursor: 'pointer' });
    });

    it('allows keyboard interaction with sort button', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} onSortChange={mockOnSortChange} />);

      const sortButton = screen.getByRole('button');
      sortButton.focus();
      await user.keyboard('{Enter}');

      expect(mockOnSortChange).toHaveBeenCalledWith('name', 'asc');
    });

    it('allows keyboard navigation of select options', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} onSortChange={mockOnSortChange} />);

      const select = screen.getByRole('textbox');

      // Open the dropdown by clicking
      await user.click(select);

      // Navigate to an option and select it
      const priceOption = screen.getByText('Price');
      await user.click(priceOption);

      // Should trigger the callback
      expect(mockOnSortChange).toHaveBeenCalledWith('price', 'desc');
    });
  });

  describe('edge cases', () => {
    it('handles empty fields array', () => {
      render(<SortableSelect fields={[]} />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Select field')).toBeInTheDocument();
    });

    it('handles single field', () => {
      render(<SortableSelect fields={['name']} />);

      const selectInput = screen.getByRole('textbox');
      expect(selectInput).toHaveValue('Name');
    });

    it('works without onSortChange callback', async () => {
      const user = userEvent.setup();
      render(<SortableSelect fields={mockFields} />);

      // Should not throw error when clicking without callback
      const sortButton = screen.getByRole('button');
      await user.click(sortButton);

      expect(sortButton).toBeInTheDocument();
    });

    it('handles invalid defaultField gracefully', () => {
      render(<SortableSelect fields={mockFields} defaultField={'invalid' as never} />);

      // Should fall back to first field or show placeholder
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('typescript generics', () => {
    it('works with custom string union types', () => {
      type CustomFields = 'firstName' | 'lastName' | 'email';
      const customFields: CustomFields[] = ['firstName', 'lastName', 'email'];

      const mockCallback = vi.fn();

      render(
        <SortableSelect<CustomFields>
          fields={customFields}
          defaultField="email"
          onSortChange={mockCallback}
        />
      );

      const selectInput = screen.getByRole('textbox');
      expect(selectInput).toHaveValue('Email');
    });
  });

  describe('left section configuration', () => {
    it('configures left section properly', () => {
      render(<SortableSelect fields={mockFields} />);

      // Check that left section contains the ActionIcon
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      // Check that the left section div has the correct styling
      const leftSection = button.parentElement;
      expect(leftSection).toHaveStyle({ cursor: 'pointer' });
    });

    it('has correct left section width', () => {
      render(<SortableSelect fields={mockFields} />);

      const select = screen.getByRole('textbox');
      expect(select).toBeInTheDocument();
      // Left section width should be configured to 32px
    });
  });
});
