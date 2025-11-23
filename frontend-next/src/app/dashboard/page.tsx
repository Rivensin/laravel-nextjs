'use client';
import React, { useEffect } from 'react'
import { myAppHook } from '../../../context/AppProvider';
import { useRouter } from 'next/navigation';
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
  const [products,setProducts] = React.useState<ProductType[]>([]);
  const [isEdit,setIsEdit] = React.useState<boolean>(false);

  //Load Page When Auth Token is not present
  useEffect(() => {
    if(!authToken){
      router.push('/auth')
      return
    } 
      
    fetchAllProducts();
    
  },[authToken]);

  //Input Change Handler
  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setFormData({...formData, banner_image: event.target.files[0], file: URL.createObjectURL(event.target.files[0])});
    }else{
      setFormData({...formData,[event.target.name] : event.target.value}) 
    }
  }

  //Form Submit Handler
  const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try{
      if(isEdit){
        //Edit Operation
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/${formData.id}`
          ,{...formData, "_method" : "PUT"}
          ,{
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            }
          }
        );

        fetchAllProducts();

        if(response.data.status){
          toast.success(response.data.message);
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
        }
        
      } else {
        //Add Operation
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`,formData,{
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },  
        });

        if(response.data.status){
          toast.success(response.data.message);
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
        }
      }
    }catch(error){
      console.log("Error adding product :", error);
    }
  }

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

  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Side: Form */}
        <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">{isEdit ? 'Edit Product' : 'Add Product'}</h4>

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
                className="border rounded-md px-3 py-2" 
                type="file" 
                id="bannerInput" 
                ref={fileRef}
                onChange={handleOnChangeEvent}
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md" type="submit">
                {isEdit ? 'Edit Product' : 'Add Product'}
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
                {
                  products.map((singleProduct,index) => (
                    <tr key={singleProduct.id}>
                      <td className="border px-3 py-2">{singleProduct.id}</td>
                      <td className="border px-3 py-2">{singleProduct.title}</td>
                      <td className="border px-3 py-2">
                        {singleProduct.banner_image 
                          ? 
                            (
                              <Image 
                                src={singleProduct.banner_image} 
                                alt="Product" 
                                className="object-cover rounded-md" 
                                width={100} 
                                height={100}
                                unoptimized
                                />
                            ) 
                          : 
                            'No Image'
                        }
                        
                      </td>
                      <td className="border px-3 py-2">{singleProduct.cost}</td>
                      <td className="border px-3 py-2 flex gap-2">
                        <button 
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
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
                        <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
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