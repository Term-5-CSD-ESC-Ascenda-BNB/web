import { responseSchema, type ResponseSchema } from '../schemas/responseSchema';

interface OAuthSuccessMessage {
  type: 'OAUTH_SUCCESS';
  user: ResponseSchema;
}

export async function loginWithGoogle(): Promise<ResponseSchema> {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  const API_URL = import.meta.env.VITE_API_URL as string;

  return new Promise((resolve, reject) => {
    // Open the OAuth popup
    const popup = window.open(
      `${API_URL}/auth/google`,
      'googleOAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      return reject(new Error('Could not open Google OAuth window'));
    }

    // Listen for the postMessage callback
    function handleMessage(event: MessageEvent) {
      // Ensure the message is from the expected origin
      if (!event.origin.startsWith(API_URL)) return;

      const data = event.data as OAuthSuccessMessage;

      console.log('Received message from OAuth popup:', data);

      window.removeEventListener('message', handleMessage);
      clearInterval(checkClosed);

      const result = responseSchema.safeParse(data.user);
      if (result.success) {
        resolve(result.data);
      } else {
        console.error('Google login failed:', result.error);
        reject(result.error);
      }
    }

    window.addEventListener('message', handleMessage);

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        window.removeEventListener('message', handleMessage);
        clearInterval(checkClosed);
        reject(new Error('OAuth popup closed before completing'));
      }
    }, 500);
  });
}
