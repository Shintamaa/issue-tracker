# Panduan Kontribusi

Terima kasih sudah berkontribusi di **issue-tracker**! Ikuti panduan ini supaya kerja tim tetap rapi.

## 1. Strategi Branching

| Branch      | Fungsi                               |
|-------------|--------------------------------------|
| `main`      | Kode stabil, siap rilis. Terproteksi |
| `develop`   | Integrasi semua fitur. Terproteksi   |
| `feature/*` | Pengembangan fitur baru              |
| `bugfix/*`  | Perbaikan bug pada `develop`         |
| `hotfix/*`  | Perbaikan darurat pada `main`        |

**Aturan utama:**
- ❌ Dilarang push langsung ke `main` dan `develop`.
- ✅ Semua perubahan lewat Pull Request (PR).
- ✅ PR fitur/bugfix diarahkan ke `develop`.
- ✅ Satu branch = satu tugas. Jangan campur banyak tugas dalam satu branch.

## 2. Penamaan Branch

Format: `tipe/area-deskripsi-singkat` (huruf kecil, pakai tanda hubung).

Kode area: `be` (backend), `fe` (frontend), `db` (database), `ops` (devops), `docs` (dokumentasi).

Contoh:
- `feature/be-auth-system`
- `feature/fe-login-dashboard`
- `feature/fe-kanban-board`
- `feature/db-erd-schema`
- `bugfix/be-fix-login-validation`
- `hotfix/ops-fix-vercel-env`

## 3. Format Pesan Commit

Format: `tipe: deskripsi singkat` (bahasa Indonesia atau Inggris, tapi konsisten).

| Tipe       | Kegunaan                                   |
|------------|--------------------------------------------|
| `feat`     | Menambah fitur baru                        |
| `fix`      | Memperbaiki bug                            |
| `docs`     | Perubahan dokumentasi                      |
| `style`    | Perubahan format/tampilan tanpa ubah logika|
| `refactor` | Merapikan kode tanpa ubah perilaku         |
| `test`     | Menambah/memperbaiki test                  |
| `chore`    | Tugas kecil (konfigurasi, dependensi, dll) |

Contoh:
```
feat: tambah endpoint login
fix: perbaiki validasi email saat register
docs: tambah panduan instalasi backend
```

## 4. Alur Kerja Harian

```bash
# 1. Ambil kode terbaru
git checkout develop
git pull origin develop

# 2. Buat branch baru dari develop
git checkout -b feature/fe-login-dashboard

# 3. Kerjakan tugas, lalu commit secara berkala
git add .
git commit -m "feat: buat halaman login"

# 4. Sebelum push, ambil update terbaru dari develop
git fetch origin
git merge origin/develop

# 5. Push branch
git push -u origin feature/fe-login-dashboard

# 6. Buka Pull Request ke develop di GitHub
```

## 5. Pull Request

- Isi template PR dengan lengkap.
- Minta review minimal **1 orang**.
- Perbaiki komentar review, lalu push ulang ke branch yang sama.
- Setelah di-approve, gabungkan dengan **Squash and merge**, lalu hapus branch.
- Kode yang belum diuji atau membuat aplikasi error tidak boleh digabung.

## 6. Menyelesaikan Conflict

1. Merge `develop` terbaru ke branch Anda: `git merge origin/develop`
2. Buka file yang conflict, pilih kode yang benar, hapus tanda `<<<<<<<`, `=======`, `>>>>>>>`.
3. `git add .` lalu `git commit`.
4. Jika ragu, tanyakan ke tim sebelum memilih.

## 7. Hal yang Dilarang

- Commit file rahasia: `.env`, API key, password, kunci Supabase (`service_role`).
- Commit folder `node_modules/` atau `vendor/`.
- Force push (`git push --force`) ke branch bersama.

## 8. Hotfix (Perbaikan Darurat)

1. `git checkout main && git pull`
2. `git checkout -b hotfix/deskripsi-singkat`
3. Perbaiki, commit, push, lalu PR ke `main`.
4. Setelah digabung, buat PR yang sama ke `develop` supaya perbaikannya tidak hilang.