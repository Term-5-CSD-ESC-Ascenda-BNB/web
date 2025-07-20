import { useControls } from 'leva';

export function useAtmosphereControls() {
  return useControls('Atmosphere Colors', {
    atmosphereDayColor: {
      value: '#00aaff',
      label: 'Day',
    },
    atmosphereTwilightColor: {
      value: '#ffa468',
      label: 'Twilight',
    },
  });
}
