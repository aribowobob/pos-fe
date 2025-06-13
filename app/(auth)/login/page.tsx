'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { useGoogleLogin as useGoogleLoginMutation } from '@/lib/api/auth-api';
import { toast } from 'sonner';
import { ShoppingBasket } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: googleLoginMutation } = useGoogleLoginMutation();

  const login = useGoogleLogin({
    onSuccess: async codeResponse => {
      try {
        googleLoginMutation(
          { token: codeResponse.access_token },
          {
            onError: () => {
              toast.error('Gagal masuk. Silakan coba lagi.');
              setIsLoading(false);
            },
          }
        );
      } catch {
        toast.error('Terjadi kesalahan tidak terduga.');
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error('Gagal login dengan Google.');
      setIsLoading(false);
    },
    onNonOAuthError: () => {
      toast.error('Terjadi kesalahan. Silakan login.');
      setIsLoading(false);
    },
  });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    login();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <ShoppingBasket className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Selamat Datang di Sistem POS
          </CardTitle>
          <CardDescription className="text-center">
            Anda memerlukan akun Google untuk masuk.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Button
              className="w-64 flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
            >
              {!isLoading && (
                <svg
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
              )}
              {isLoading ? 'Sedang Masuk...' : 'Masuk dengan Google'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
