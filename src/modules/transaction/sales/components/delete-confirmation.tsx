import { Modal } from '@components';
import { DeleteConfirmationProps } from '@types';

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const { name, open, onCancel, onDelete } = props;

  if (!open) return null;

  return (
    <Modal
      title="Konfirmasi Hapus Data"
      onClose={onCancel}
      cancelText="Ya, hapus!"
      onCancel={onDelete}
      okText="Batal"
      onOk={onCancel}
    >
      <p>{`Apakah kamu yakin akan menghapus ${name} dari keranjang transaksi penjualan?`}</p>
    </Modal>
  );
};

export default DeleteConfirmation;
