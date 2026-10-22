<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // <-- Tambahkan ini

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // <-- Tambahkan HasApiTokens di sini

    protected $fillable = [
        'name',
        'username', // <-- Tambahkan kolom kustom project kita
        'email',
        'password',
        'job_title',
        'bio',
        'skills',
        'interests',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    // Relasi ke project membership
    public function projectMemberships()
    {
        return $this->hasMany(ProjectMember::class);
    }

    // Relasi Many-to-Many ke Project lewat tabel pivot project_members
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_members')
            ->withPivot('role', 'added_by', 'joined_at');
    }
}