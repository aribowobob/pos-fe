import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

import { BottomNav, TopNav } from '@components';
import Head from 'next/head';

import {
  ArrowRightEndOnRectangleIcon,
  UserIcon,
  HomeIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { useUser } from '@store';

const SystemPage = () => {
  const { back, replace, push } = useRouter();
  const handleLogout = () => {
    deleteCookie('token');
    replace('/login');
  };

  const { fullName, initial, email } = useUser();

  return (
    <div className="container mx-auto sm:px-4">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Sistem" onBack={back} />
      <div className="w-full flex items-center h-24 bg-blue-500 relative mb-10">
        <div className="block text-white ml-32">
          <div>
            {fullName} ({initial})
          </div>
          <div>{email}</div>
        </div>
        <div className="w-24 h-24 rounded-full bg-slate-900 text-white flex justify-center items-center absolute top-12 left-6">
          <UserIcon className="w-10 h-10" />
        </div>
      </div>
      <div className="w-full flex flex-col p-4">
        <div className="w-full flex items-center font-semibold">
          Manajemen Persediaaan
        </div>
        <div className="w-full flex justify-start items-center h-10">
          <ArchiveBoxIcon className="w-6 h-6" />
          <button
            className="m-4"
            onClick={() => {
              push('/system/produk');
            }}
          >
            Produk
          </button>
        </div>
        <div className="w-full flex justify-start items-center h-10">
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
        <div className="w-full flex justify-start items-center h-10">
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
        <div className="w-full flex justify-start items-center h-10 mb-2">
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
        <div className="w-full flex justify-start items-center h-10">
          <UserIcon className="w-6 h-6" />
          <button
            className="m-4"
            onClick={() => {
              push('/system/profile');
            }}
          >
            Ubah Data Profile
          </button>
        </div>
        <div className="w-full flex justify-start items-center h-10">
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
