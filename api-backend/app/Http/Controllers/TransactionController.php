<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\TransactionItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        // $transactions = Transaction::latest()->get();

        // return response()->json([
        //     'status' => true,
        //     'data' => $transactions,
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {

            $transaction = Transaction::create([
                'customer' => 'Guest',
                'total' => 0, //temporary
            ]);

            $total = 0;

            foreach($data['items'] as $item){
                $product = Product::lockForUpdaate()->findOrFail($item['product_id']);
                $subTotal = $product->price * $item['quantity'];
                $total += $subTotal;

                transactionItem::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $product->id,
                    'price' => $product->price,
                    'quantity' => $item['quantity'],
                    'sub_total' => $subTotal,
                ]);
            }

            $transaction->update([
                'total' => $total
            ]);
            
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Transaction created successfully',
                'data' => $transaction->load('items'),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Transaction failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        // return response()->json([
        //     'status' => true,
        //     'data' => $transaction,
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        // $validated = $request->validate([
        //     'total' => 'numeric',
        // ]);

        // $transaction->update($validated);

        // return response()->json([
        //     'status' => true,
        //     'message' => 'Transaction updated',
        //     'data' => $transaction,
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        // $transaction->delete();

        // return response()->json([
        //     'status' => true,
        //     'message' => 'Transaction deleted',
        // ]);
    }
}
