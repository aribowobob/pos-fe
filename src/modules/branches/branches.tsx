import Head from 'next/head';
import { Button } from '@components';
import { useRouter } from 'next/router';

const DATA = [
  {
    name: 'Gudang Utama',
    initial: 'GUD',
  },
  {
    name: 'Cab. Tabanan',
    initial: 'TAB',
  },
  {
    name: 'Cab. Denpasar',
    initial: 'DPS',
  },
];

const Branches = () => {
  const { replace } = useRouter();
  const handleClick = () => {
    // TODO: update ke db dulu untuk cabang/gudang yang dipilih, simpan ke context
    replace('/dashboard');
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>POS - Pilih Cabang atau Gudang</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <div className="p-4 flex gap-4 rounded bg-white flex-col w-full">
          <h1 className="text-2xl">Pilih Cabang/Gudang</h1>
          {DATA.map(data => (
            <Button block ghost key={data.initial} onClick={handleClick}>
              {`${data.initial} (${data.name})`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;
