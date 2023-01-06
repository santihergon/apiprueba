function Search({ search, setSearch, setNPages, sethasCalledAPI }) {

  const searchBtn = (e) => {
    e.preventDefault();
    sethasCalledAPI(false);
    // let staticContext = 404;
    // if (staticContext) {
    //   staticContext.statusCode = 404;
    //   console.log("Error 404 chaval")
    // }
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
