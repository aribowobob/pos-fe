import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginPage } from '@modules';

export default function Login() {
  return (
    <GoogleOAuthProvider clientId="1072376775658-iramhlg6m2ajepo2udu1dvormujli05u.apps.googleusercontent.com">
      <LoginPage />
    </GoogleOAuthProvider>
  );
}
