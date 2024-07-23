import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

import { BottomNav, TopNav } from '@components';
import Head from 'next/head';

import {
  ArrowRightEndOnRectangleIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const SystemPage = () => {
  const { back, replace, push } = useRouter();
  const handleLogout = () => {
    deleteCookie('token');
    replace('/login');
  };

  return (
    <div className="container mx-auto sm:px-4">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Sistem" onBack={back} />

      <div className="w-full flex flex-col p-4">
        <div className="w-full flex items-center font-semibold">
          Manajemen Persediaaan
        </div>
        <div className="w-full flex justify-start items-center">
          <UserIcon className="w-6 h-6" />
          <button
            className="m-4"
            onClick={() => {
              push('/system/produk');
            }}
          >
            Produk
          </button>
        </div>
        <div className="w-full flex justify-start items-center">
          <UserIcon className="w-6 h-6" />
          <button
            className="m-4"
            onClick={() => {
              push('/system/stock-opname');
            }}
          >
            Stok Opname
          </button>
        </div>
        <div className="w-full flex justify-start items-center">
          <UserIcon className="w-6 h-6" />
          <button
            className="m-4"
            onClick={() => {
              push('/system/user');
            }}
          >
            Pengguna Sistem
          </button>
        </div>
        <div className="w-full flex justify-start items-center">
          <HomeIcon className="w-6 h-6" />
          <button
            className="m-4"
            onClick={() => {
              push('/system/toko');
            }}
          >
            Toko
          </button>
        </div>
        <div className="w-full flex items-center font-semibold">Profil</div>
        <div className="w-full flex justify-start items-center">
          <UserIcon className="w-6 h-6" />
          <button className="m-4" onClick={handleLogout}>
            Ubah Data Profile
          </button>
        </div>
        <div className="w-full flex justify-start items-center">
          <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
          <button className="m-4" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SystemPage;
