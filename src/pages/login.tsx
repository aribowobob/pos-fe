import { GoogleOAuthProvider } from '@react-oauth/google';

import { LoginPage } from '@modules';
import { getRuntimeEnv } from '@utils';

export default function Login() {
  const clientId = getRuntimeEnv('GOOGLE_CLIENT_ID');

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginPage />
    </GoogleOAuthProvider>
  );
}
