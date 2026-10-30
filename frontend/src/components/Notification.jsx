
import { Toaster } from 'react-hot-toast';

function Notification() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3500,
        style: {
          background: '#ffffff',
          color: '#30364d',
          border: '1px solid #e1e3f2',
          borderRadius: '12px',
          padding: '14px 18px',
          boxShadow: '0 8px 28px rgba(55, 65, 110, 0.12)',
          fontSize: '13px',
          maxWidth: '380px',
        },
        success: {
          iconTheme: {
            primary: '#7587d3',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#c45e70',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}

export default Notification;


// =============templeate==========

// // Notifikasi berhasil
// toast.success('Data berhasil disimpan!');

// // Notifikasi gagal
// toast.error('Gagal menyimpan perubahan.');

// // Notifikasi informasi
// toast('Data proyek telah diperbarui.', {
//   icon: 'ℹ️',
// });

// // Notifikasi peringatan
// toast('Pastikan semua data sudah lengkap.', {
//   icon: '⚠️',
// });

// // Notifikasi ketika proses berlangsung
// const id = toast.loading('Sedang menyimpan data...');

// // Setelah proses berhasil
// toast.success('Data berhasil disimpan!', { id });

// // Jika proses gagal, gunakan ini sebagai gantinya:
// // toast.error('Gagal menyimpan data!', { id });
