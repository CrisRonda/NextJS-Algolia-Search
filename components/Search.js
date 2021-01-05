// Update the import
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  "2J3H4NW9CQ",
  "c0e0d7ec14bd74c00c07f4f581bb2139"
);
const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="files_search">
      <SearchBox />
      <Hits
        hitComponent={(item, key) => (
          <div key={key} style={{ display: "flex" }}>
            <p>{item.hit.name}</p>
          </div>
        )}
      />
    </InstantSearch>
  );
};

export default Search;
