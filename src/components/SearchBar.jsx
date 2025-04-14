function SearchBar({ searchTerm, setSearchTerm }) {
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
    );
  }
  
  export default SearchBar;