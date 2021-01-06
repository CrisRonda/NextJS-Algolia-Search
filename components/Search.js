import {
  InstantSearch,
  Hits,
  SearchBox,
  ClearRefinements,
  RefinementList,
  Configure,
  Pagination,
  Highlight,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

const Hit = ({ hit }) => (
  <div>
    <div className="hit-name">
      📈{` `}
      <Highlight attribute="name" hit={hit} />
    </div>
    <div className="hit-description">
      <Highlight attribute="description" hit={hit} />
    </div>
  </div>
);

const Search = () => {
  return (
    <div className={"ais-InstantSearch"}>
      <InstantSearch searchClient={searchClient} indexName="files_search">
        <div className={"left-panel"}>
          <Configure hitsPerPage={2} />
        </div>
        <div className={"right-panel"}>
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

export default Search;
