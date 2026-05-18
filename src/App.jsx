import './App.css'
import Header from "./Header";
import SearchEngine from "./SearchEngine";

export default function App() {
  return (
    <>
      <Header />
      <div className="container py-4">
        <SearchEngine />
      </div>
    </>
  );
}


