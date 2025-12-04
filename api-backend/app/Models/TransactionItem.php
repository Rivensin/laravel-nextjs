<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class transactionItem extends Model
{
    protected $fillable = [
        'transaction_id',
        'product_id',
        'price',
        'quantity',
        'sub_total'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transaction_id');
    }
}
