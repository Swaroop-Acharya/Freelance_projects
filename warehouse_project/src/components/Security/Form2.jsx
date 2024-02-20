// Form2.jsx
import React from 'react';

export default function Form2({ setShowForm2 }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(e.target);
    const productName = formData.get('productName');
    const price = formData.get('price');
    const quantity = formData.get('quantity');
    const category = formData.get('category');
    const status = formData.get('status');
    console.log('Product Name:', productName);
    console.log('Price:', price);
    console.log('Quantity:', quantity);
    console.log('Category:', category);
    console.log('Status:', status);
    setShowForm2(false); // Close the form after submission
  };

  return (
    <div className="max-w-md mx-auto mt-3">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 flex">
          <div className="mr-2 w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              name="productName"
              type="text"
              placeholder="Product Name"
            />
          </div>
          <div className="ml-2 w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              name="price"
              type="number"
              placeholder="Price"
            />
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="mr-2 w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Quantity"
            />
          </div>
          <div className="ml-2 w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              name="category"
            >
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
          >
            <option value="active">Active</option>
            <option value="noStocks">No Stocks</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
