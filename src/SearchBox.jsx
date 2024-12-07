import React, { useState } from "react";

function YourComponent() {
  const [searchSong, setSearchSong] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false); // Add a loading state

  // Handle input changes
  const handleTrack = (event) => setSearchSong(event.target.value);
  const handleAuthor = (event) => setSearchAuthor(event.target.value);

  // Async function to handle the search
  async function handleData() {
    let url;
    if (searchAuthor && searchSong) {
      url = `https://lrclib.net/api/search?track_name=${encodeURIComponent(searchSong)}&artist_name=${encodeURIComponent(searchAuthor)}`;
    } else if (searchAuthor) {
      url = `https://lrclib.net/api/search?q=${encodeURIComponent(searchAuthor)}`;
    } else {
      url = `https://lrclib.net/api/search?track_name=${encodeURIComponent(searchSong)}`;
    }

    console.log(url);

    setLoading(true); // Set loading to true when fetch starts
    setShowResults(false); // Initially hide results

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setResults(data); // Update the results state with the fetched data
      } else {
        setResults([]); // Handle unexpected response
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      alert("There was a problem with your fetch operation:", error);
    } finally {
      setLoading(false); // Set loading to false after the fetch operation is complete
      setShowResults(true); // Show results only after data is fetched
    }
  }

  return (
    <div className="Box">
      <div className="input">
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
      </div>

      <br />
      <button className="SearchButton" onClick={handleData}>
        Search
      </button>
      <br />

      {loading && <p>Loading...</p>} {/* Optionally show a loading message */}
      
      <div className="results">
        {showResults && !loading ? (
          <ShowSearch searchSong={searchSong} results={results} />
        ) : null}
      </div>
    </div>
  );
}

export default YourComponent;
