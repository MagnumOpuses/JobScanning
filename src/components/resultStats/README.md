# ResultStatsContainer

**[CONTAINER COMPONENT]**
A container component for displaying current amout of fetched jobs and from how many sources.
The component has one function which calculates the the number of unique sources from the hits list.

Uses this from redux store:

1. **hits**
   The result list, used to display number fetched jobs.
2. **searchTerm**
   String containing currect searched occupation. Used for redirect-to overview link.

These will be passed down as pros to <ResultStats />

```javascript
      <ResultStats
        hits={hits} // list = current result list
        searchTerm={searchTerm} // string = current searched occupation
        sources={this.getNumberOfSources()} // int = the number of unique sources
      />
/>
```

# ResultStats

**[PRESENTATIONAL COMPONENT]**
Displays the current amount of fetched jobs and the number of unique sources.
The component also includes a link to the overview page, only visible in tablet/mobile.

Props:

1. **searchTerm**
   String containing currect searched occupation. Used for redirect-to overview link.
2. **hits**
   The result list, used to display number fetched jobs.
3. **sources**
   Int. Number of unique sources.
