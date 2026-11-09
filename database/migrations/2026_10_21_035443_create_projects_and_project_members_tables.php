<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Buat tabel projects
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('avatar')->nullable();
            $table->string('project_key', 10)->unique();
            $table->string('category')->nullable();
            $table->string('visibility', 20)->default('private'); // private / public
            $table->string('default_sprint_duration')->nullable();
            $table->string('default_issue_assignee_role')->nullable();
            $table->string('default_board_view')->default('kanban');
            $table->string('date_format')->nullable();
            $table->string('timezone')->nullable();
            $table->boolean('is_archived')->default(false);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        // 2. Buat tabel pivot project_members
        Schema::create('project_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('role', 50)->default('member'); // owner, admin, member, dll
            $table->foreignId('added_by')->constrained('users')->onDelete('cascade');
            $table->timestamp('joined_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_members');
        Schema::dropIfExists('projects');
    }
};
