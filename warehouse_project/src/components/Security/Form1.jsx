import React, { useState } from 'react';
import axios from 'axios';
export default function Form1({ setShowForm }) {
  const [formValue,setFormValue]=useState({categoryName:""});
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue)
    const formData={categoryName:formValue.categoryName};
    const res=await axios.post("http://localhost/warehouse/api/index.php",formData)
    setShowForm(false); // Close the form after submission
  };

  const handleChange=(e)=>{
    setFormValue({...formValue,[e.target.name]:e.target.value})
  }
  

  return (
    <div className="max-w-md mx-auto mt-3">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
            Category Name
          </label>
          <input
          value={formValue.categoryName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categoryName"
            name="categoryName"
            onChange={handleChange}
            type="text"
            placeholder="Category Name"
          />
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
