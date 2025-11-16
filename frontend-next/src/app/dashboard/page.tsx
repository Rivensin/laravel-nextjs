import React from 'react'
import Image from 'next/image';

const Dashboard : React.FC = () => {
  return (
    <div className="container mx-auto mt-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Side: Form */}
        <div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-4">Add Product</h4>

            <form className="flex flex-col gap-3">
              <input className="border rounded-md px-3 py-2" name="title" placeholder="Title" required />
              <input className="border rounded-md px-3 py-2" name="description" placeholder="Description" required />
              <input className="border rounded-md px-3 py-2" name="cost" placeholder="Cost" type="number" required />

              <div>
                {/* <Image src="#" alt="Preview" id="bannerPreview" className="hidden object-cover rounded-md" width={100} height={100} /> */}
              </div>

              <input className="border rounded-md px-3 py-2" type="file" id="bannerInput" />

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