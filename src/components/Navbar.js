export function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

export function Logo() {
  return (
    <div className="logo">
      <span className="img">🍿</span>
      <h1>PoPcorn</h1>
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      className="search"
      type="text"
      placeholder="Search here..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
