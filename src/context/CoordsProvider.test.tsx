import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { CoordsProvider } from './CoordsProvider';
import { useCoords } from './coords-store';

// 1) Test consumer
function TestConsumer() {
  const { coords, setCoords } = useCoords();
  return (
    <div>
      <div data-testid="display">{coords ? `${coords.lat},${coords.lng}` : 'no coords'}</div>
      <button data-testid="set" onClick={() => setCoords({ lat: 1.23, lng: 4.56 })}>
        set coords
      </button>
    </div>
  );
}

describe('CoordsProvider + useCoords()', () => {
  it('provides null by default, and updates when setCoords is called', async () => {
    const user = userEvent.setup();

    // 2) Wrap consumer in provider
    render(
      <CoordsProvider>
        <TestConsumer />
      </CoordsProvider>
    );

    // 3a) initial state is null
    expect(screen.getByTestId('display')).toHaveTextContent('no coords');

    // 3b) after clicking, coords appear
    await user.click(screen.getByTestId('set'));
    expect(screen.getByTestId('display')).toHaveTextContent('1.23,4.56');
  });

  it('uses default context values when used outside provider', async () => {
    const user = userEvent.setup();

    function TestWithoutProvider() {
      const { coords, setCoords } = useCoords();
      return (
        <div>
          <div data-testid="default-coords">
            {coords ? `${coords.lat},${coords.lng}` : 'no coords'}
          </div>
          <button data-testid="default-set" onClick={() => setCoords({ lat: 1, lng: 2 })}>
            try set
          </button>
        </div>
      );
    }

    render(<TestWithoutProvider />);

    expect(screen.getByTestId('default-coords')).toHaveTextContent('no coords');

    // The setCoords call won't do anything, but it exercises the default function
    await user.click(screen.getByTestId('default-set'));

    // Should still show 'no coords' since default setCoords is a no-op
    expect(screen.getByTestId('default-coords')).toHaveTextContent('no coords');
  });
});
