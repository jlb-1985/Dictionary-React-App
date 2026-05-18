import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function SearchEngine() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  function handleResponse(response) {
    // Free Dictionary API geeft een array terug
    // response.data[0].word = het woord
    setResult(response.data[0].word);
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
          <h2 className="result-title">{result}</h2>
          <p className="text-muted fst-italic">
            (meer info komt zodra we meanings tonen)
          </p>
        </div>
      )}
    </div>
  );
}
