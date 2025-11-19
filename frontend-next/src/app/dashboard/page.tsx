'use client';
import React, { useEffect } from 'react'
import { myAppHook } from '../../../context/AppProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface ProductType{
  title: string;
  description: string;
  cost: number;
  file: string;
  banner_image : File | null;
}

const Dashboard : React.FC = () => {
  const router = useRouter();
  const {isLoading,authToken} = myAppHook();
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [formData,setFormData] = React.useState<ProductType>({
    title: '',
    description: '',
    cost: 0,
    file: '',
    banner_image: null
  });

  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setFormData({...formData, banner_image: event.target.files[0], file: URL.createObjectURL(event.target.files[0])});
    }else{
      setFormData({...formData,[event.target.name] : event.target.value}) 
    }
  }

  const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`,formData,{
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },  
      });
    }catch(error){
      console.log("Error adding product :", error);
    }
  }

  useEffect(() => {
    if(!authToken){
      router.push('/auth')
      return
    }
  },[authToken]);

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Side: Form */}
        <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Add Product</h4>

            <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
              <input 
                className="border rounded-md px-3 py-2" 
                name="title" 
                placeholder="Title" 
                value={formData.title}
                onChange={handleOnChangeEvent}
                required />

              <input 
                className="border rounded-md px-3 py-2" 
                name="description" 
                placeholder="Description"
                value={formData.description} 
                onChange={handleOnChangeEvent}
                required 
              />

              <input 
                className="border rounded-md px-3 py-2" 
                name="cost" 
                placeholder="Cost" 
                type="number" 
                value={formData.cost}
                onChange={handleOnChangeEvent}
                required 
              />

              <div>
                {formData.file && (
                  <Image 
                    src={formData.file} 
                    alt="Preview" 
                    id="bannerPreview" 
                    className="object-cover rounded-md" 
                    width={100} 
                    height={100} 
                  />
                )}
              </div>

              <input 
                className="border rounded-md px-3 py-2" 
                type="file" 
                id="bannerInput" 
                ref={fileRef}
                onChange={handleOnChangeEvent}
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md" type="submit">
                Add Product
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Table */}
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">ID</th>
                  <th className="border px-3 py-2 text-left">Title</th>
                  <th className="border px-3 py-2 text-left">Banner</th>
                  <th className="border px-3 py-2 text-left">Cost</th>
                  <th className="border px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">1</td>
                  <td className="border px-3 py-2">Sample Product</td>
                  <td className="border px-3 py-2">
                    {/* <Image src="#" alt="Product" className="object-cover rounded-md" width={100} height={100}/> */}
                  </td>
                  <td className="border px-3 py-2">$100</td>
                  <td className="border px-3 py-2 flex gap-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard