import React, { useState } from 'react';

export default function BuyGoods() {
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here
    // For demonstration, we're just setting some dummy search results
    setSearchResults([
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 },
    ]);
  };

  return (
    <div className="">
      <form onSubmit={handleSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 gap-1 flex">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchQuery">
            Search
          </label>
          <input
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="searchQuery"
            name="searchQuery"
            type="text"
            placeholder="Search for products"
          />
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0 flex items-end ">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </div>
      </form>
      <div>
        <h2 className="text-lg font-bold mb-2">Search Results</h2>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              {result.name} - ${result.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
