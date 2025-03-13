import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

import { BottomNav, TopNav } from '@components';
import Head from 'next/head';

import {
  ArchiveBoxIcon,
  ArrowRightEndOnRectangleIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '@store';

const SystemPage = () => {
  const { back, replace, push } = useRouter();
  const handleLogout = () => {
    deleteCookie('access_token');
    replace('/login');
  };

  const { fullName, initial, email } = useUser();

  return (
    <div className="container mx-auto sm:px-4 pb-24">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Sistem" onBack={back} />
      <div className="bg-blue-500 pl-[132px] pr-4 py-[25px] relative">
        <div className="flex text-white gap-2 flex-col">
          <p className="overflow-hidden text-ellipsis">
            {fullName} ({initial})
          </p>
          <p className="overflow-hidden text-ellipsis">{email}</p>
        </div>
        <div className="w-[100px] h-[100px] rounded-full bg-slate-900 text-white flex justify-center items-center absolute top-[50px] left-8">
          <UserIcon className="w-16 h-16" />
        </div>
      </div>

      <div className="w-full flex flex-col p-4 mt-16 gap-4">
        <p className="font-medium text-base">Manajemen Persediaaan</p>
        <div className="w-full flex justify-start items-center gap-4">
          <ArchiveBoxIcon className="w-4 h-4" />
          <button
            onClick={() => {
              push('/system/produk');
            }}
          >
            Produk
          </button>
        </div>
        <div className="w-full flex justify-start items-center gap-4">
          <ShieldCheckIcon className="w-4 h-4" />
          <button
            onClick={() => {
              push('/system/stock-opname');
            }}
          >
            Stok Opname
          </button>
        </div>
        <div className="w-full flex justify-start items-center gap-4">
          <UsersIcon className="w-4 h-4" />
          <button
            onClick={() => {
              push('/system/user');
            }}
          >
            Pengguna Sistem
          </button>
        </div>
        <div className="w-full flex justify-start items-center gap-4">
          <BuildingStorefrontIcon className="w-4 h-4" />
          <button
            onClick={() => {
              push('/system/toko');
            }}
          >
            Toko
          </button>
        </div>
        <p className="font-medium text-base mt-4">Profil</p>
        <div className="w-full flex justify-start items-center gap-4">
          <UserIcon className="w-4 h-4" />
          <button
            onClick={() => {
              push('/system/profile');
            }}
          >
            Ubah Data Profile
          </button>
        </div>
        <div className="w-full flex justify-start items-center gap-4">
          <ArrowRightEndOnRectangleIcon className="w-4 h-4" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SystemPage;
