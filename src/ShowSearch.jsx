import React, { useState } from "react";

function ShowSearch({ results }) {
    const [visibleLyricIndex, setVisibleLyricIndex] = useState(null);

    function handleShowLyric(index) {
        // Toggle the visibility of the lyric for the specific track
        setVisibleLyricIndex(visibleLyricIndex === index ? null : index);
    }

    function formatLyrics(lyrics) {
        // Replace newline characters with <br /> tags
        return lyrics.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
        ));
    }

    return (
        <div className="resultBox">
            {results.length > 0 ? (
                results.map((result, index) => (
                    <div className="result" key={index}>
                        <h4>Track: {result.trackName}</h4>
                        <p>Artist: {result.artistName}</p>
                        <button onClick={() => handleShowLyric(index)}>
                            {visibleLyricIndex === index ? "Hide Lyric" : "Show Lyric"}
                        </button>

                        {visibleLyricIndex === index && (
                            <div className="Lyrics">{formatLyrics(result.plainLyrics)}</div>
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
