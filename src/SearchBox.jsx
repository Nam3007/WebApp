import React, { useState } from "react";
import ShowSearch from "./ShowSearch";

function SearchBox() {
  const [searchSong, setSearchSong] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [showResults, setShowResults] = useState(false); // Show or hide the results
  const [results, setResults] = useState([]); // Store list of results

  function handleTrack(event) {
    
    setSearchSong(event.target.value);
  }

  function handleAuthor(event) {
    setSearchAuthor(event.target.value);
  }

  async function handleData() {
    let url;
    if (searchAuthor && searchSong) {
      url = `https://lrclib.net/api/search?track_name=${encodeURIComponent(searchSong)}&artist_name=${encodeURIComponent(searchAuthor)}`;
  }else if(searchAuthor){
     url = `https://lrclib.net/api/search?q=${encodeURIComponent(searchAuthor)}`;
  } 
  else {
      url = `https://lrclib.net/api/search?track_name=${encodeURIComponent(searchSong)}`;
  }
    console.log(url);
    setShowResults(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
        alert("Network response was not ok");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setResults(data); // Update the results state
      } else {
        setResults([]); // Handle unexpected response
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      alert("There was a problem with your fetch operation:", error);
    }
  }
  

  return (
    <div>
      
      <input
        type="text"
        value={searchSong}
        onChange={handleTrack}
        placeholder="Track"
        required
      />
      <br />
      <input
        type="text"
        value={searchAuthor}
        onChange={handleAuthor}
        placeholder="Author"
      />
      <br />
      <button className="SearchButton" onClick={handleData}>Search</button>
      <br />
      
      {showResults ? <ShowSearch searchSong={searchSong} results={results}></ShowSearch> : null}
    </div>
  );
}
export default SearchBox;
