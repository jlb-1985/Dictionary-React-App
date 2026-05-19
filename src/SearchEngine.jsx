import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function SearchEngine() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  function handleResponse(response) {
    setResult(response.data[0]); // volledig object
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch(() => {
        setResult({ word: "Not found" });
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
          <button className="btn btn-primary search-button">Search</button>
        </div>
      </form>

      {result && (
        <div className="card p-4 shadow-sm result-card">
          <h2 className="result-title">{result.word}</h2>

          {/* Fonetiek */}
          {result.phonetics && result.phonetics[0] && (
            <p className="text-muted">{result.phonetics[0].text}</p>
          )}

          {/* Alle meanings */}
          {result.meanings &&
            result.meanings.map((meaning, index) => (
              <div key={index} className="mt-4">
                <h5 className="fw-bold text-uppercase">
                  {meaning.partOfSpeech}
                </h5>

                {meaning.definitions.map((definition, i) => (
                  <p key={i} className="mb-2">
                    • {definition.definition}
                  </p>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
