import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

import { BottomNav, TopNav } from '@components';

const SystemPage = () => {
  const { back, replace } = useRouter();
  const handleLogout = () => {
    deleteCookie('token');
    replace('/login');
  };

  return (
    <div className="container mx-auto sm:px-4">
      <TopNav title="Sistem" onBack={back} />

      <div>
        <button className="m-4" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default SystemPage;
