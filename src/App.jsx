import { useState,useEffect } from 'react'

import './App.css'

function App() {

  const [searchInput,setSearchInput] = useState('');
  const [results,setResults] = useState([]);


  const fetchData = async() => {
    const resData = await fetch(
      "https://dummyjson.com/recipes/search?q=" + searchInput
    );

    const jsonData = await resData.json();
    setResults(jsonData?.recipes);
  }

  useEffect (()=>{
    fetchData();
  },[searchInput])

  return (
    <>
      <h1>Auto Complete Search Bar</h1>
      <div>
        <input 
        type="text"
        className='searchInput'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} />
      </div>
      <div className="resultsContainer">
        {results &&
        results.map((recipe) => (
          <span
          className='result' key= {recipe.id}
          >{recipe.name}</span>
        ))}
      </div>
    </>
  );
}

export default App
