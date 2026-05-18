export default function Header() {
  return (
    <header className="py-4 mb-4 border-bottom">
      <div className="container d-flex align-items-center gap-3">
        <img
          src="/logo.png"
          alt="Dictionary Logo"
          style={{ width: "400px", height: "400px" }}
        />
        <h1 className="m-0 fw-bold"> Dictionary App</h1>
      </div>
    </header>
  );
}
