'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const token = getCookie('auth-token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">POS System</CardTitle>
          <CardDescription>Modern Point of Sale System</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          <p className="text-muted-foreground">
            A comprehensive solution for retail and food service businesses.
          </p>
          <Button onClick={() => router.push('/login')} size="lg">
            Login to Get Started
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} All Rights Reserved
        </CardFooter>
      </Card>
    </div>
  );
}
