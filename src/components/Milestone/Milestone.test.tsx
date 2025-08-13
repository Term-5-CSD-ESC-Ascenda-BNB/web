import { render, screen } from '@/tests/utils';
import { Milestone } from './Milestone';
import { describe, it, expect } from 'vitest';

describe('Milestone', () => {
  it('renders milestone count and text correctly', () => {
    render(<Milestone milestone="Trips Embarked" count={42} />);

    const countText = screen.getByText('42');
    const milestoneText = screen.getByText('Trips Embarked');

    expect(countText).toBeInTheDocument();
    expect(milestoneText).toBeInTheDocument();
  });

  it('renders zero count without crashing', () => {
    render(<Milestone milestone="Years on Wayfare" count={0} />);

    const countText = screen.getByText('0');
    const milestoneText = screen.getByText('Years on Wayfare');

    expect(countText).toBeInTheDocument();
    expect(milestoneText).toBeInTheDocument();
  });
});
