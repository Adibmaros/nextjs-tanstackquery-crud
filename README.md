# CRUD Demo Application

> Contoh implementasi operasi **Create, Read, Update, Delete** menggunakan **TanStack Query** dengan hooks `useQuery` dan `useMutation`

## 🚀 Overview

Aplikasi ini merupakan demo lengkap untuk menunjukkan bagaimana mengimplementasikan operasi CRUD menggunakan TanStack Query (React Query) v5. Aplikasi ini mencakup manajemen data karyawan dan user dengan fitur-fitur modern seperti caching, optimistic updates, dan error handling.

## ✨ Features

- ✅ **useQuery** - Data fetching dengan caching otomatis
- ✅ **useMutation** - Handle CREATE, UPDATE, DELETE operations
- ✅ **Query Invalidation** - Auto refresh data setelah mutations
- ✅ **Loading States** - Built-in loading, error, dan success states
- ✅ **Optimistic Updates** - UI yang responsive
- ✅ **Error Handling** - Penanganan error yang baik
- ✅ **Responsive Design** - Mobile-friendly UI

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query v5
- **Database**: Prisma ORM
- **API**: REST API (Next.js API Routes)

## 📋 Modules

### 1. Karyawan Management (`/karyawan`)
- List semua karyawan dengan tabel yang responsive
- Tambah karyawan baru
- Edit data karyawan
- Hapus karyawan dengan konfirmasi
- Validasi form dan error handling

### 2. User Management (`/user`)
- Manajemen akun user
- CRUD operations untuk user data
- Implementasi yang sama dengan modul karyawan

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── karyawan/
│   │   ├── page.tsx          # List karyawan
│   │   ├── tambah/
│   │   │   └── page.tsx      # Tambah karyawan
│   │   └── edit/[id]/
│   │       └── page.tsx      # Edit karyawan
│   ├── user/
│   │   └── ... (similar structure)
│   └── api/
│       ├── karyawans/        # API routes untuk karyawan
│       └── users/            # API routes untuk user
└── components/
    └── ... (shared components)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm atau yarn
- Database (PostgreSQL/MySQL/SQLite)

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd crud-tanstack-query
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```
   DATABASE_URL="your-database-connection-string"
   ```

4. **Setup database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

## 💡 Key Concepts

### 1. useQuery untuk Data Fetching
```typescript
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["karyawans"],
  queryFn: async () => {
    const res = await fetch("/api/karyawans");
    return res.json();
  },
});
```

### 2. useMutation untuk Data Modification
```typescript
const createMutation = useMutation({
  mutationFn: async (data) => {
    const response = await fetch("/api/karyawans", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["karyawans"] });
  },
});
```

### 3. Query Invalidation
```typescript
// Refresh data setelah mutation berhasil
queryClient.invalidateQueries({ queryKey: ["karyawans"] });
```

## 📱 Screenshots

### Homepage
- Overview aplikasi dan navigasi ke modules

### Karyawan List
- Tabel responsive dengan data karyawan
- Action buttons untuk Edit dan Delete

### Add/Edit Forms
- Form validation
- Loading states
- Error handling

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

Jika ada pertanyaan atau issue, silakan buat issue baru di repository ini.

---

**Happy Coding! 🎉**
