import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import 'leaflet/dist/leaflet.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from './theme/index.ts';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// if (!stripePublicKey || typeof stripePublicKey !== 'string') {
//   throw new Error('Missing or invalid Stripe public key');
// }

// const stripePromise = loadStripe(stripePublicKey);

const stripePromise = loadStripe(
  'pk_test_51RjdQSPndwpVsFGO20F4GBpwBwhB0I0amPXOKPrUHtXAJ2MFhfVZzmtjXOWTlDeNYmJN57LuWjiTVYihVq5ZAEpX005oEudZ4z'
);
// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <MantineProvider theme={theme}>
            <RouterProvider router={router} />
          </MantineProvider>
        </Elements>
      </QueryClientProvider>
    </StrictMode>
  );
}
