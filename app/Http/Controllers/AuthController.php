<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // 1. Endpoint Register
    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:100', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'], // Sesuai aturan: min 8 karakter
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Password di-hash
        ]);

        return response()->json([
            'message' => 'Registrasi berhasil! Silakan login.',
            'user' => $user
        ], 201);
    }

    // 2. Endpoint Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Kredensial yang diberikan salah.'],
            ]);
        }

        // Buat token Sanctum untuk user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Ambil daftar project yang diikuti user beserta rolenya (lewat tabel pivot project_members)
        $projects = $user->projects()->select('projects.id', 'projects.name', 'project_members.role')->get();

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token,
            'projects' => $projects
        ]);
    }

    // 3. Endpoint Logout
    public function logout(Request $request)
    {
        // Menghapus token yang sedang aktif digunakan
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Berhasil logout'
        ]);
    }
}