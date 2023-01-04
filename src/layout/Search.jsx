import React from "react"; //Creo que esto lo puedo quitar porque me sobra

function Search({ setSearch, setNPages }) {

  const searchBtn = (e) => {
    e.preventDefault(e.target.value);
  };

  return <form className="searchBar">{/* porque necesito un form??? */}
      <input placeholder="Search for characters" className="searchBarInput" type="text"
        onChange={(e) => {
          setNPages (1);
          setSearch(e.target.value);
        }}
      />
      <button onClick={searchBtn} className="searchBarBtn"> Search </button>
    </form>

}
export default Search;
