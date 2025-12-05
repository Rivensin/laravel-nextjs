'use client';
import React, { useEffect } from 'react'
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
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [formData,setFormData] = React.useState<ProductType>({
    title: '',
    description: '',
    cost: 0,
    file: '',
    banner_image: null
  });
  
  const [products,setProducts] = React.useState<ProductType[]>([]);
  const [quantities,setQuantities] = React.useState<QuantityType>({});

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
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1,0)
    }));
  };

  return (
    <div className="container mx-auto mt-4 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Form */}
        {/* <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">{isEdit ? 'Edit Product' : 'Add Product'}</h4>

            <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
              <input 
                className={`border rounded-md px-3 py-2 ${isLoading ? 'bg-gray-400' : ''}`} 
                name="title" 
                placeholder="Title" 
                value={formData.title}
                onChange={handleOnChangeEvent}
                disabled={isLoading}
                required />

              <input 
                className={`border rounded-md px-3 py-2 ${isLoading ? 'bg-gray-400' : ''}`} 
                name="description" 
                placeholder="Description"
                value={formData.description} 
                onChange={handleOnChangeEvent}
                disabled={isLoading}
                required 
              />

              <input 
                className={`border rounded-md px-3 py-2 ${isLoading ? 'bg-gray-400' : ''}`}
                name="cost" 
                placeholder="Cost" 
                type="number" 
                value={formData.cost}
                onChange={handleOnChangeEvent}
                disabled={isLoading}
                required 
              />

              <div>
                {formData.file && (
                  <Image 
                    src={formData.file} 
                    alt={formData.file} 
                    id="bannerPreview" 
                    className="object-cover rounded-md" 
                    width={100} 
                    height={100} 
                    unoptimized
                  />
                )}
              </div>

              <input 
                className={`border rounded-md px-3 py-2 ${isLoading ? 'bg-gray-400' : ''}`} 
                type="file" 
                id="bannerInput" 
                ref={fileRef}
                onChange={handleOnChangeEvent}
                disabled={isLoading}
              />

              <button className={` hover:bg-blue-700 text-white py-2 rounded-md ${isLoading ? 'bg-slate-600' : 'bg-blue-600'}`} type="submit" disabled={isLoading} >
                {isEdit ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div> */}

        {/* Right Side: Table */}
        <div>
          <div className="overflow-x-auto">
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6'>
              {products.map(product => (
                <div key={product.id} className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs">
                  <Image 
                    className="rounded-t-base w-full h-60 lg:h-72 bg-cover" 
                    src={product.banner_image} 
                    alt="" 
                    width={100} 
                    height={100} 
                    unoptimized
                    priority
                    />
                  <div className="p-6 text-center">
                    <h5 className="mb-2 text-lg font-semibold tracking-tight text-heading">
                      {product.title}
                    </h5>
                    <h5 className="mb-2 text-lg tracking-tight text-heading">
                      {product.cost.toLocaleString('id-ID', {style: 'currency', currency: 'IDR',minimumFractionDigits: 0})}
                    </h5>
                    <form>
                      <div className='flex justify-center items-center'>
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