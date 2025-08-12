import { render, screen } from '@/tests/utils';
import { describe, it, expect } from 'vitest';
import { IconCircleCheck } from '@tabler/icons-react';
import { Exceptional } from './Exceptional';

describe('Exceptional', () => {
  const headerText = 'Outstanding Service';
  const bodyText = 'We go above and beyond for every guest.';

  it('renders header text', () => {
    render(<Exceptional icon={IconCircleCheck} header={headerText} body={bodyText} />);
    expect(screen.getByText(headerText)).toBeInTheDocument();
    // header is rendered inside <Text> :contentReference[oaicite:6]{index=6}
  });

  it('renders body text', () => {
    render(<Exceptional icon={IconCircleCheck} header={headerText} body={bodyText} />);
    expect(screen.getByText(bodyText)).toBeInTheDocument();
    // body is rendered in the second <Text> :contentReference[oaicite:7]{index=7}
  });

  it('passes correct props to the icon', () => {
    const { container } = render(
      <Exceptional icon={IconCircleCheck} header={headerText} body={bodyText} />
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('height', '42');
    expect(icon).toHaveAttribute('width', '42');
    expect(icon).toHaveAttribute('stroke', 'var(--mantine-color-primary-7)');
    expect(icon).toHaveAttribute('stroke-width', '1.5');
  });
});
