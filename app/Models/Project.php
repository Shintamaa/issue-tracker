<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    // Relasi ke User lewat tabel pivot project_members
    public function users()
    {
        return $this->belongsToMany(User::class, 'project_members')
            ->withPivot('role', 'added_by', 'joined_at');
    }
}