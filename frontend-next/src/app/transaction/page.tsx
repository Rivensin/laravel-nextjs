'use client';
import React, { useEffect, useState } from 'react'
import { myAppHook } from '../../../context/AppProvider';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface TransactionType{
  id: number;
  total: number;
  created_at: string;
  items: {
    id: number;
    product_id: number;
    price: number;
    quantity: number;
    sub_total: number;
  product: {
    id: number;
    title: string;
  }
  }[];
}

const Transaction : React.FC = () => {
  const {authToken} = myAppHook();
  const [transaction,setTransaction] = React.useState<TransactionType[]>([]);
  
  //Load Page When Auth Token is present
  useEffect(() => {
    if(authToken) fetchAllTransaction();    
  },[authToken]);

  //Fetch All Products
  const fetchAllTransaction = async() => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },  
      });

      setTransaction(response.data.transaction);
    }catch(error){
      console.log("Error fetching transaction :", error);
    }
  }

  console.log("Transaction Data :", transaction);
  return (
    <div className="mt-4 px-2 pb-2">
      <div className="grid lg:grid-cols-5 gap-6">
        {transaction.map(trx => (
        <div key={trx.id}> 
          <div className="flex w-full h-[600px] items-center justify-center bg-gray-600 rounded-lg">
            <div className="w-80 h-[550px] bg-gray-50 px-4 pt-8 shadow-lg overflow-y-scroll">
              <div className='text-xs flex justify-end hover:underline'>
                <button type='submit' className='bg-yellow-400 px-2'>
                  Edit Receipt
                </button>
              </div>
              <Image src="/icons/dlooti.png" 
                alt="chippz" 
                className="mx-auto w-32 h-32 py-4" 
                width={100} 
                height={100} 
                unoptimized 
                priority />
              <div className="flex flex-col justify-center items-center gap-2">
                  <h4 className="font-semibold">Dlooti</h4>
                  <p className="text-xs">Jl Lily 2 No 49N</p>
              </div>
              <div className="flex flex-col gap-3 border-b py-2 text-xs">
                <p className="flex justify-between">
                  <span className="text-gray-400">ID:</span>
                  <span>{trx.id}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Cashier:</span>
                  <span>Rivensin</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span>{new Date(trx.created_at).toLocaleDateString('en-GB')}</span>
                </p>
              </div>
              <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="flex justify-center items-center mb-2 underline">
                          <th className="flex-1 py-1">Product</th>
                          <th className="min-w-[44px] py-2 text-center">Qty</th>
                          <th className="min-w-[54px] py-2 text-center">Price</th>
                          <th className="min-w-[44px] py-2 text-center">Total</th>
                        </tr>
                      </thead>
                      {trx.items.map(item => (
                        <tbody key={item.id}>
                        <tr  className="flex justify-center items-center mb-1">
                          <td className="flex-1 py-1">{item.product.title}</td>
                          <td className="min-w-[44px] text-center">{item.quantity}</td>
                          <td className="min-w-[54px] text-center">{item.price.toLocaleString('id-ID')}</td>
                          <td className="min-w-[44px] text-center">{item.sub_total.toLocaleString('id-ID')}</td>
                        </tr>
                        </tbody>
                      ))}
                    </table>
                    <div className="border-b border border-dashed"></div>
                    <div className='flex justify-between'>
                      <div className='font-bold text-lg'>Total</div>
                      <div className='font-bold underline text-lg bg-gray-200'>{trx.total.toLocaleString('id-ID')}</div>
                    </div>
                 
                <div className="py-4 justify-center items-center flex flex-col gap-2">
                  <p className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z" fill="#000"></path><path d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z" fill="#000"></path></svg> rivensinn@gmail.com</p>
                  <p className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill="#000" d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"></path></svg> +6282 3409 0452</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
        
        
      </div>

      
    </div>
  )
}

export default Transaction