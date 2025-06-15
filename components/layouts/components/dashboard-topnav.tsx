import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store/user-store';
import Link from 'next/link';
import { useLogout } from '@/lib/api/auth-api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const DashboardTopNav = () => {
  const { user } = useUserStore();
  const { logout } = useLogout();

  return (
    <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 md:px-6">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex-1 flex items-center">
          <h1 className="text-lg font-semibold tracking-tight">
            {user?.company_name}
          </h1>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-xs text-slate-300">
                {`${user?.full_name} (${user?.initial})`}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profil Pengguna
                </Link>
              </DropdownMenuItem>
              <Separator className="my-1" />
              <DropdownMenuItem
                onClick={() => logout()}
                className="cursor-pointer"
                variant="destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;
