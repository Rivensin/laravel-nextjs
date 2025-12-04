<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'customer',
        'total'
    ];

    public function items()
    {
        return $this->hasMany(TransactionItem::class, 'transaction_id');
    }
}
