import React from 'react';
import { SearchInput, SearchDetails, Facets, FilterList } from '../components';
import { Grid, Divider, Segment } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { flushSync } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchButtonText: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const FacetWrapper = ({ children }) => (
  <Segment basic className="facet">
    {children}
  </Segment>
);

const RightColumnFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
    onTriggerSearch,
    searchedText, // search text for previous search
    searchText, // search text currently being entered (controlled input)
    isEditMode,
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;
  const intl = useIntl();

  return (
    <Grid className="searchBlock-facets right-column-facets" stackable>
      <Grid.Row>
        <Grid.Column width={12}>
          <h3>{data.title}</h3>
          <SearchDetails text={searchedText} total={totalItems} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row verticalAlign="bottom">
        <Grid.Column width={12}>
          <div className="search-wrapper">
            {data.showSearchInput && <SearchInput {...props} isLive={isLive} />}
            {data.showSearchButton && (
              <Button onClick={() => onTriggerSearch(searchText)}>
                {data.searchButtonLabel ||
                  intl.formatMessage(messages.searchButtonText)}
              </Button>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>

      <FilterList
        {...props}
        isEditMode={isEditMode}
        setFacets={(f) => {
          flushSync(() => {
            setFacets(f);
            onTriggerSearch(searchedText || '', f);
          });
        }}
      />

      <Grid.Row>
        <Grid.Column mobile={12} tablet={8} computer={9}>
          <Divider />
          {children}
        </Grid.Column>

        <Grid.Column mobile={12} tablet={4} computer={3}>
          <Facets
            data={data}
            facets={facets}
            isEditMode={isEditMode}
            setFacets={(f) => {
              flushSync(() => {
                setFacets(f);
                onTriggerSearch(searchedText || '', f);
              });
            }}
            facetWrapper={FacetWrapper}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RightColumnFacets;
