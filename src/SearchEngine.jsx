import { useState } from "react";
import "./App.css";
import axios from "axios";

export default function SearchEngine() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  function handleResponse(response) {
    setError(false);
    setResult(response.data[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch(() => {
        setError(true);
        setResult(null);
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

      {/* Error‑melding */}
      {error && (
        <div
          className="card p-4 shadow-sm"
          style={{
            border: "1px solid rgba(255, 215, 0, 0.5)",
            background: "#fff7dd",
          }}
        >
          <h4 className="fw-bold" style={{ color: "#b8962f" }}>
            Word not found — try another word.
          </h4>
        </div>
      )}

      {/* Resultaten */}
      {result && !error && (
        <div className="card p-4 shadow-sm result-card">
          <h2 className="result-title">{result.word}</h2>

          {/*Fonetiek + Audio */}
          {result.phonetics && result.phonetics[0] && (
            <div className="d-flex align-items-center gap-3">
              {result.phonetics[0].text && (
                <p className="text-muted m-0">{result.phonetics[0].text}</p>
              )}

              {result.phonetics[0].audio && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    const audio = new Audio(result.phonetics[0].audio);
                    audio.play();
                  }}
                >
                  🔊 Play
                </button>
              )}
            </div>
          )}

          {/*  Alle Betekenissen */}
          {result.meanings &&
            result.meanings.map((meaning, index) => (
              <div key={index} className="mt-4">
                <h5 className="fw-bold text-uppercase">
                  {meaning.partOfSpeech}
                </h5>

                {/* Definities */}
                {meaning.definitions.map((definition, i) => (
                  <p key={i} className="mb-2">
                    • {definition.definition}
                  </p>
                ))}

                {/* ⭐ Synoniemen */}
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <p className="mt-2">
                    <strong>Synonyms:</strong>{" "}
                    {meaning.synonyms.slice(0, 10).join(", ")}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}