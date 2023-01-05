import React from "react"; //Creo que esto lo puedo quitar porque me sobra

function Search({ search, setSearch, setNPages, sethasCalledAPI }) {

  const searchBtn = (e) => {
    e.preventDefault();
    sethasCalledAPI(false);
    console.log(search);
  };

  return <form className="searchBar">{/* porque necesito un form??? */}
    <input placeholder="Search for characters" className="searchBarInput" type="text" value={search}
        onChange={(e) => {
          setNPages (1);
          setSearch(e.target.value);
          // console.log();
        }}
      />
      <button onClick={searchBtn} className="searchBarBtn"> Search </button>
    </form>

}
export default Search;
