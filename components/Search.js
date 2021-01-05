import {
  InstantSearch,
  Hits,
  SearchBox,
  connectHighlight,
  ClearRefinements,
  RefinementList,
  Configure,
  Pagination,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);
const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  });

  return (
    <div>
      {parsedHit.map(({ value }, key) => (
        <div key={key}>
          <div>
            <p>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

const Hit = ({ hit }) => (
  <CustomHighlight attribute="name" hit={hit} nonHighlightedTagName="span" />
);

const Search = () => {
  return (
    <div className="ais-InstantSearch">
      <h1>Algolia Demo with Firebase!</h1>
      <InstantSearch searchClient={searchClient} indexName="files_search">
        <div className="left-panel">
          <ClearRefinements />
          <h2>Brands</h2>
          <RefinementList attribute="brand" />
          <Configure hitsPerPage={8} />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

export default Search;
