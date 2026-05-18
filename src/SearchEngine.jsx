import { useState } from "react";
import "./App.css";
import axios from "axios"

export default function SearchEngine() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setResult(keyword);
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
          <p className="text-muted fst-italic"></p>
        </div>
      )}
    </div>
  );
}
