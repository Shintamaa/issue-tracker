<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->after('name');
            $table->string('job_title')->nullable()->after('password');
            $table->text('bio')->nullable()->after('job_title');
            $table->text('skills')->nullable()->after('bio');
            $table->text('interests')->nullable()->after('skills');
            $table->string('avatar')->nullable()->after('interests');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'job_title', 'bio', 'skills', 'interests', 'avatar']);
        });
    }
};