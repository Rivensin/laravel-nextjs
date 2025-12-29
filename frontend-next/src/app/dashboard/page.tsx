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

const Dashboard : React.FC = () => {
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
  const [currentPage,setCurrentPage] = useState<number>(1);
  const [totalPage,setTotalPage] = useState<number>(1);
  const limit = 5;

  const [isEdit,setIsEdit] = React.useState<boolean>(false);
  const [isLoading,setIsLoading] = React.useState<boolean>(false);

   //if ready then load Product
  useEffect(() => {
  fetchAllProducts()
  },[]);

  //Input Change Handler
  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setFormData({...formData, banner_image: event.target.files[0], file: URL.createObjectURL(event.target.files[0])});
    }else{
      setFormData({...formData, [event.target.name] : event.target.value}) 
    }
  }

  //Form Submit Handler
  const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
      if(isEdit){
        //Edit Operation
        setIsLoading(true);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${formData.id}`
          ,{...formData, "_method" : "PUT"}
          ,{
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        setFormData({
            title: '',
            description: '',
            cost: 0,
            file: '',
            banner_image: null
          });
        if(fileRef.current){
          fileRef.current.value = '';
        }
        setIsEdit(false)
        fetchAllProducts();

        toast.success(response.data.message);
        setIsLoading(false);
        
      } else {
        //Add Operation
        setIsLoading(true);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`,formData,{
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },  
        });

        if(response.data.status){
          toast.success(response.data.message);
          fetchAllProducts();
          setFormData({
            title: '',
            description: '',
            cost: 0,
            file: '',
            banner_image: null
          });
          if(fileRef.current){
            fileRef.current.value = '';
          }
          setIsLoading(false);
        }
      }
    }catch(error){
      console.log("Error adding product :", error);
    }
  }

  //Form Delete Handler
  const handleDeleteProduct = (id : number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if(result.isConfirmed) {
          try{
            const request = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,{
              headers: {
                Authorization: `Bearer ${authToken}`,
              },  
            });

            if(request.data.status){
              // toast.success(request.data.message);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              fetchAllProducts();
            }
            
          }catch(error){
            console.log("Error deleting product :", error);
          }
        }
      });
    
  }

  //Fetch All Products
  const fetchAllProducts = async(page : number = 1 ) => {
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`,{
        params: {
          pagination: 1,
          page,
          limit
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },  
      });

      setProducts(response.data.products);
      setTotalPage(response.data.totalPage);
      setCurrentPage(response.data.currentPage);
      
    }catch(error){
      console.log("Error fetching products :", error);
    }
  }

  return (
    <div className="mx-auto mt-4 px-2 pb-2">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Side: Form */}
        <div>
          <div className="bg-w  hite shadow-md rounded-lg p-6">
            <h4 className="p-2 text-lg font-semibold mb-4 underline bg-gray-300 rounded-lg text-center">{isEdit ? 'Edit Product' : 'Add Product'}</h4>

            <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
              <input 
                className={`border rounded-md px-3 py-2 transition-all duration-500 ease-out ${isLoading ? 'bg-gray-400' : ''}`} 
                name="title" 
                placeholder="Title" 
                value={formData.title}
                onChange={handleOnChangeEvent}
                disabled={isLoading}
                required />

              <input 
                className={`border rounded-md px-3 py-2 transition-all duration-500 ease-out ${isLoading ? 'bg-gray-400' : ''}`} 
                name="description" 
                placeholder="Description"
                value={formData.description} 
                onChange={handleOnChangeEvent}
                disabled={isLoading}
                required 
              />

              <input 
                className={`border rounded-md px-3 py-2 transition-all duration-500 ease-out ${isLoading ? 'bg-gray-400' : ''}`}
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
                className={`border rounded-md px-3 py-2 transition-all duration-500 ease-out ${isLoading ? 'bg-gray-400' : ''}`} 
                type="file" 
                id="bannerInput" 
                ref={fileRef}
                onChange={handleOnChangeEvent}
                disabled={isLoading}
              />

              <button className={` hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-500 ease-out ${isLoading ? 'bg-gray-400' : 'bg-blue-600'}`} type="submit" disabled={isLoading} >
                {isEdit ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Table */}
        <div>
          <button 
            onClick={() => fetchAllProducts(currentPage-1)}
            disabled= {currentPage===1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {Array.from({length: totalPage},(_,i) => i+1).map(page => (
            <button 
              key={page}
              onClick={() => fetchAllProducts(page)}
              className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-black text-white' : ''} `}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => fetchAllProducts(currentPage+1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100 text-center">
                <tr className=''>
                  <th className="border px-3 py-2">ID</th>
                  <th className="border px-3 py-2">Title</th>
                  <th className="border px-3 py-2">Description</th>
                  <th className="border px-3 py-2">Banner</th>
                  <th className="border px-3 py-2">Cost</th>
                  <th className="border px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.length !== 0
                  ?  
                    (
                      products.map((singleProduct,index) => (
                      <tr key={singleProduct.id}>
                        <td className="border px-2 py-2 text-center">{singleProduct.id}</td>
                        <td className="border px-2 py-2">{singleProduct.title}</td>
                        <td className="border px-2 py-2">{singleProduct.description}</td>
                        <td className="border px-2 py-2">
                          {singleProduct.banner_image 
                            ? 
                              (
                                <Image 
                                  src={singleProduct.banner_image} 
                                  alt="Product" 
                                  className="object-cover rounded-md w-full h-36" 
                                  width={100} 
                                  height={100}
                                  unoptimized
                                  priority
                                  />
                              ) 
                            : 
                              'No Image'
                          }
                          
                        </td>
                        <td className="border px-2 py-2 text-center">{singleProduct.cost ? singleProduct.cost.toLocaleString('id-ID', {style: 'currency', currency: 'IDR',minimumFractionDigits: 0}) : ''}</td>
                        <td className="border px-2 h-full">
                          <div className='flex flex-col gap-6'>
                              <button 
                                className="bg-yellow-500 text-white py-2 rounded-md text-sm hover:bg-yellow-600 transition-all duration-500 ease-out"
                                onClick={() => {
                                  setFormData({
                                    id: singleProduct.id,
                                    title: singleProduct.title,
                                    description: singleProduct.description,
                                    cost: singleProduct.cost,
                                    file: singleProduct.banner_image,
                                  })
                                  setIsEdit(true);
                                }}>
                                
                                Edit
                              </button>

                              <button 
                                className="bg-red-600 text-white py-2 rounded-md text-sm hover:bg-red-700 transition-all duration-500 ease-out"
                                onClick={() => {handleDeleteProduct(singleProduct.id ? singleProduct.id : 0)}}>
                                Delete
                              </button>
                          </div>
                        </td>
                      </tr>
                      ))
                    )
                : 
                  (
                    Array.from({length:2}).map((_,index) => (
                      <tr key={index}>
                        <td className='max-w-xl h-36 bg-slate-300 transition-all ease-out duration-700 animate-pulse'></td>
                        <td className='max-w-xl h-36 bg-slate-300 transition-all ease-out duration-700 animate-pulse'></td> 
                        <td className='max-w-xl h-36 bg-slate-300 transition-all ease-out duration-700 animate-pulse'></td> 
                        <td className='max-w-xl h-36 bg-slate-300 transition-all ease-out duration-700 animate-pulse'></td> 
                        <td className='max-w-xl h-36 bg-slate-300 transition-all ease-out duration-700 animate-pulse'></td> 
                        <td className='max-w-xl h-36 bg-slate-300 transition-all ease-out duration-700 animate-pulse'></td> 
                      </tr>
                    )
                  )
                  )
                }                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard