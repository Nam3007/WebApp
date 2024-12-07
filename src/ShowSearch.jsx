import React, { useState } from "react";

function ShowSearch({ results }) {
    const [visibleLyricIndex, setVisibleLyricIndex] = useState(null);

    const handleShowLyric = (index) => {
        // Toggle visibility for the clicked lyric
        setVisibleLyricIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const formatLyrics = (lyrics) => {
        // Replace newline characters with <br /> for formatted display
        return lyrics?.split("\n").map((line, i) => (
            <span key={i}>
                {line}
                <br />
            </span>
        ));
    };

    // Function to download lyrics as .txt file
    const downloadLyrics = (lyrics, trackName) => {
        const blob = new Blob([lyrics], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${trackName} - Lyrics.txt`;
        link.click();
    };

    return (
        <div className="resultBox">
            {results && results.length > 0 ? (
                results.map((result, index) => (
                    <div className="result" key={index}>
                        <h4>Track: {result.trackName}</h4>
                        <p>Artist: {result.artistName}</p>
                        <button onClick={() => handleShowLyric(index)}>
                            {visibleLyricIndex === index ? "Hide Lyric" : "Show Lyric"}
                        </button>
                        <button
                            onClick={() => downloadLyrics(result.plainLyrics, result.trackName)}
                                >
                                    Download Lyrics as .txt
                                </button>

                        {/* Show lyrics if the index matches the visibleLyricIndex */}
                        {visibleLyricIndex === index && result.plainLyrics && (
                            <div className="Lyrics">
                                {formatLyrics(result.plainLyrics)}
                                {/* Add button to download lyrics */}
                               
                            </div>
                        )}
                        <br />
                    </div>
                ))
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}

export default ShowSearch;
