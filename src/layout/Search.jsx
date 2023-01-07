function Search({ search, setSearch, setNPages, sethasCalledAPI }) {

  const searchBtn = (e) => {
    e.preventDefault();
    sethasCalledAPI(false);
  };

  return <form className="searchBar">{/* porque necesito un form??? */}
    <input placeholder="Search for characters" className="searchBarInput" type="text" value={search}
      onChange={(e) => {
        setNPages(1);
        setSearch(e.target.value);
      }}
    />
    <button onClick={searchBtn} className="searchBarBtn"> Search </button>
  </form>

}
export default Search;
