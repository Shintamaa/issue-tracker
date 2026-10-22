<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'priority',
        'assigned_to',
        'created_by',
    ];

    // Relasi ke Project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Relasi ke User yang ditugaskan (Assignee)
    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // Relasi ke User yang membuat issue
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}