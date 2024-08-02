import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(['Numbers', 'Highest Alphabet']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('YOUR_BACKEND_API_URL/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const options = ['Numbers', 'Alphabets', 'Highest Alphabet'];

  return (
    <div className="container mx-auto p-4 max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">API Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>
      <button 
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded mb-4 font-semibold"
      >
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <>
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Multi Filter</label>
            <div className="flex flex-wrap gap-2 p-2 border rounded relative ">
              {selectedOptions.map(option => (
                <span key={option} className="bg-gray-200 px-2 py-1 rounded flex items-center text-sm">
                  {option}
                  <button onClick={() => handleOptionToggle(option)} className="ml-1 text-gray-600">&times;</button>
                </span>
              ))}
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.filter(option => !selectedOptions.includes(option)).map(option => (
                  <div
                    key={option}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                    onClick={() => {
                      handleOptionToggle(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold mb-2">Filtered Response</h2>
            {selectedOptions.includes('Numbers') && (
              <p>Numbers: {response.numbers.join(',')}</p>
            )}
            {selectedOptions.includes('Highest Alphabet') && (
              <p>Highest Alphabet: {response.highest_alphabet[0]}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;