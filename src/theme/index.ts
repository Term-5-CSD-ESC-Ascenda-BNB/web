import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'DM Sans, sans-serif',
  headings: { fontFamily: 'Libre Franklin, serif' },
  colors: {
    primary: [
      '#F5F6F9',
      '#E8EAF1',
      '#BAC2D6',
      '#99A4C1',
      '#808AB1',
      '#6E74A2',
      '#626693',
      '#545579',
      '#43455E',
      '#2E2E3D',
    ],
    secondary: [
      '#F8F6F4',
      '#DCD6CC',
      '#C8BEB0',
      '#AD9D8A',
      '#9C8773',
      '#8F7867',
      '#786256',
      '#635249',
      '#51433D',
      '#2B231F',
    ],
  },
  primaryColor: 'primary',
});
