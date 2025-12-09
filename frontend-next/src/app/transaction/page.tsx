'use client';
import React, { useEffect, useState } from 'react'
import { myAppHook } from '../../../context/AppProvider';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface ProductType{
  id?: number;
  title: string;
  description?: string;
  cost?: number;
  file?: string;
  banner_image? : File | null;
}

interface QuantityType{
  [id : number]: number;
}

const Transaction : React.FC = () => {
  const {authToken} = myAppHook();
  const [products,setProducts] = React.useState<ProductType[]>([]);
  const [quantities,setQuantities] = React.useState<QuantityType>({});
  const [isEdit,setIsEdit] = useState(false);

  //Load Page When Auth Token is present
  useEffect(() => {
    if(authToken) fetchAllProducts();    
  },[authToken]);

  //Fetch All Products
  const fetchAllProducts = async() => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },  
      });

      setProducts(response.data.products);
      
    }catch(error){
      console.log("Error fetching products :", error);
    }
  }

  const handleChange = (id: number,value: number) => {
    setQuantities(prev => ({
      ...prev,
      [id] : Math.max(0,Math.min(Number(value),20))
    }))
  }

  const increase = (id : number, max: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1,max)
    }));
  };

  const decrease = (id : number) => {
    setQuantities((prev) => {
      const newItem = Math.max((prev[id] || 1) - 1,0)

      if(newItem === 0){
        const updated = {...prev}
        delete updated[id]
        return updated
      }

      return {
        ...prev,
        [id]: newItem
      }
    });
  };

  console.log(quantities)
  return (
    <div className="mt-4 px-2">
      <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-6">
        {/* Left Side: Form */}
        <div>
          Left Side
        </div>

        {/* Right Side: Table */}
        <div>
          <div className="">
            <div className='grid grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-6'>
              {products.map(product => (
                <div key={product.id} className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs rounded-lg">
                  <Image 
                    className="rounded-t-lg w-full h-60 lg:h-72 bg-cover" 
                    src={product.banner_image} 
                    alt="" 
                    width={100} 
                    height={100} 
                    unoptimized
                    priority
                    />
                  <div className="text-center">
                    <h5 className="mb-2 text-lg font-semibold tracking-tight text-heading">
                      {product.title}
                    </h5>
                    <h5 className="mb-2 text-lg tracking-tight text-heading">
                      {product.cost.toLocaleString('id-ID', {style: 'currency', currency: 'IDR',minimumFractionDigits: 0})}
                    </h5>
                    {product.id in quantities ? (
                      <>
                        <form>  
                          <div className='flex justify-center items-center -mt-2'>
                            <button 
                              type='button'
                              className="px-5 py-2 text-lg bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 active:scale-95 transition" 
                              onClick={() => decrease(product.id)}>
                                -
                            </button>
                            <input 
                              type="number" 
                              className='no-spinner w-16 h-10 mx-4 text-center border-b-2 border-black' 
                              min={0}
                              max={20} 
                              value={quantities[product.id] || 0} 
                              name='qty' 
                              onChange={e => handleChange(product.id,e.target.value)}
                            />
                            <button 
                              type='button'
                              className="px-4 py-2 text-lg bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 active:scale-95 transition"
                              onClick={() => increase(product.id,20)}>
                                +
                            </button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <button 
                        onClick={() => {
                          // setIsEdit(prev => !prev) 
                          increase(product.id,20)
                        }}
                        className='font-sans text-white bg-green-600 box-border border border-transparent hover:bg-green-600/80 focus:ring-4 shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none w-full'>
                        Add to Cart
                      </button>
                    )} 
                  </div>
                </div>
              ))}
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction