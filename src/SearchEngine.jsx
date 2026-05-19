import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function SearchEngine() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);


  function handleResponse(response) {
    // Free Dictionary API geeft een array terug
    // response.data[0].word = het woord
    setResult(response.data[0]);

  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

    axios.get(apiUrl).then(handleResponse).catch(function (error) {
      setResult("Not found");
    });
  }

  return (
    <div className="SearchEngine">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="search"
            className="form-control search-input"
            placeholder="Search a word…"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-primary search-button">
            Search
          </button>
        </div>
      </form>

     {result && (
  <div className="card p-4 shadow-sm result-card">
    <h2 className="result-title">{result.word}</h2>

    {/* Fonetiek */}
    {result.phonetics && result.phonetics[0] && (
      <p className="text-muted">
        {result.phonetics[0].text}
      </p>
    )}

    {/* Definitie */}
    {result.meanings && result.meanings[0] && (
      <p>
        {result.meanings[0].definitions[0].definition}
      </p>
    )}

    {/* Synoniemen */}
    {result.meanings[0].synonyms &&
      result.meanings[0].synonyms.length > 0 && (
        <p className="mt-3">
          <strong>Synonyms:</strong> {result.meanings[0].synonyms.join(", ")}
        </p>
      )}
  </div>
)}
    </div>
  );
}



