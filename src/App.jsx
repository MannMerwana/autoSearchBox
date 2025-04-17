import { useState,useEffect } from 'react'

import './App.css'

function App() {

  const [searchInput,setSearchInput] = useState('');
  const [results,setResults] = useState([]);
  const [showResults,setShowResults] = useState(false);
  const [cache,setCache] = useState({});//state to implement and handle cache to cache api calls


  const fetchData = async() => {
    //if data is present in cache,setResults to the input
    if(cache[searchInput]){
      console.log(`CACHE RETURNED ${searchInput}`);
      setResults(cache[searchInput])
      return;
    }
    //if data is not present in the cache,then only make an api call
    const timeTakenForEachApiCallInMs = searchInput;
    console.log(`API Call ${timeTakenForEachApiCallInMs}`);
    const resData = await fetch(
      "https://dummyjson.com/recipes/search?q=" + searchInput
    );

    const jsonData = await resData.json();
    setResults(jsonData?.recipes);
    //                            here key is Mango as ex and jsondata is the result that we have got.
    setCache((prev) => ({ ...prev, [searchInput]: jsonData?.recipes }));
  }
//debouncing to reduce api calls.
  useEffect (()=>{
    const delayFetchData = setTimeout(fetchData,350);
    return () =>{
      clearTimeout(delayFetchData);
    }
    
  },[searchInput])

  return (
    <>
      <h1>Auto Complete Search Bar</h1>
      <div>
        <input 
        type="text"
        className='searchInput'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} 
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        />
      </div>
     { showResults && <div className="resultsContainer">
        {results &&
        results.map((recipe) => (
          <span
          className='result' key= {recipe.id}
          >{recipe.name}</span>
        ))}
      </div>}
    </>
  );
}

export default App
