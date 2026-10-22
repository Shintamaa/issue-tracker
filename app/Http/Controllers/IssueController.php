<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Project;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    // 1. Menampilkan semua issue dalam project tertentu
    public function index(Request $request, int $projectId)
    {
        // Pastikan user memiliki akses ke project ini
        $project = $request->user()->projects()->where('projects.id', $projectId)->first();

        if (! $project) {
            return response()->json(['message' => 'Project tidak ditemukan atau Anda tidak memiliki akses.'], 404);
        }

        $issues = $project->issues()->with(['assignee:id,name,username', 'creator:id,name,username'])->get();

        return response()->json([
            'message' => 'Berhasil mengambil daftar issue',
            'issues' => $issues
        ]);
    }

    // 2. Membuat issue baru di dalam project
    public function store(Request $request, int $projectId)
    {
        $project = $request->user()->projects()->where('projects.id', $projectId)->first();

        if (! $project) {
            return response()->json(['message' => 'Project tidak ditemukan atau Anda tidak memiliki akses.'], 404);
        }

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['nullable', 'in:Open,In Progress,Resolved,Closed'],
            'priority' => ['nullable', 'in:Low,Medium,High,Urgent'],
            'assigned_to' => ['nullable', 'exists:users,id'],
        ]);

        $issue = Issue::create([
            'project_id' => $projectId,
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status ?? 'Open',
            'priority' => $request->priority ?? 'Medium',
            'assigned_to' => $request->assigned_to,
            'created_by' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Issue berhasil dibuat!',
            'issue' => $issue
        ], 201);
    }

    // 3. Mengubah data/status issue
    public function update(Request $request, int $id)
    {
        $issue = Issue::find($id);

        if (! $issue) {
            return response()->json(['message' => 'Issue tidak ditemukan.'], 404);
        }

        $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', 'in:Open,In Progress,Resolved,Closed'],
            'priority' => ['sometimes', 'in:Low,Medium,High,Urgent'],
            'assigned_to' => ['nullable', 'exists:users,id'],
        ]);

        $issue->update($request->only([
            'title', 'description', 'status', 'priority', 'assigned_to'
        ]));

        return response()->json([
            'message' => 'Issue berhasil diperbarui!',
            'issue' => $issue
        ]);
    }

    // 4. Menghapus issue
    public function destroy(int $id)
    {
        $issue = Issue::find($id);

        if (! $issue) {
            return response()->json(['message' => 'Issue tidak ditemukan.'], 404);
        }

        $issue->delete();

        return response()->json([
            'message' => 'Issue berhasil dihapus.'
        ]);
    }
}