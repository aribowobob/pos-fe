'use client';

import { cn } from '@/lib/utils/common';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ className, size = 'md', ...props }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-t-transparent',
          sizeClasses[size]
        )}
      />
    </div>
  );
}
