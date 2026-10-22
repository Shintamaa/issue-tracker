<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // 1. Menampilkan daftar project yang diikuti oleh user yang sedang login
    public function index(Request $request)
    {
        $user = $request->user();
        $projects = $user->projects()->withPivot('role', 'joined_at')->get();

        return response()->json([
            'message' => 'Berhasil mengambil daftar project',
            'projects' => $projects
        ]);
    }

    // 2. Membuat project baru (User yang membuat otomatis jadi Owner)
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        // Masukkan user yang membuat ke tabel pivot sebagai 'Owner'
        $request->user()->projects()->attach($project->id, [
            'role' => 'Owner',
            'added_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Project berhasil dibuat!',
            'project' => $project
        ], 201);
    }

    // 3. Menampilkan detail project tertentu
    public function show(Request $request, int $id)
    {
        $project = $request->user()->projects()->where('projects.id', $id)->first();

        if (! $project) {
            return response()->json(['message' => 'Project tidak ditemukan atau Anda tidak memiliki akses.'], 404);
        }

        // Ambil daftar semua anggota dalam project ini
        $members = $project->users()->select('users.id', 'users.name', 'users.username', 'users.email', 'project_members.role')->get();

        return response()->json([
            'project' => $project,
            'members' => $members
        ]);
    }

    // 4. Mengubah data project
    public function update(Request $request, int $id)
    {
        $project = Project::find($id);

        if (! $project) {
            return response()->json(['message' => 'Project tidak ditemukan.'], 404);
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $project->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Project berhasil diperbarui!',
            'project' => $project
        ]);
    }

    // 5. Menghapus project
    public function destroy(int $id)
    {
        $project = Project::find($id);

        if (! $project) {
            return response()->json(['message' => 'Project tidak ditemukan.'], 404);
        }

        $project->delete();

        return response()->json([
            'message' => 'Project berhasil dihapus.'
        ]);
    }
}