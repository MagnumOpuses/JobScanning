# SourceRankingContainer

**[CONTAINER COMPONENT]**
A container component for displaying ranking of sources.
The component uses **numberOfUniqueSources** from utils folder to count unique sources.

Uses this from redux store:

1. **hits**
   The result list, used to count unique sources.
2. **usedSearchTerm**
   String containing the last searched occupation. Used to separate current value in input field and search term in last fetch.
3. **scoreboard**
   List containing one object for each unique source.
   { source: 'example', score: 5}

These will be passed down as pros to <SourceRanking />.

```javascript
    <SourceRanking
      numberOfSources={this.getNumberOfSources()} // int, number of unique sources
      scoreboard={scoreboard} // sources and amount of job ads
      usedSearchTerm={usedSearchTerm} // used search term in last fetch
     />
/>
```

# SourceRanking

**[PRESENTATIONAL COMPONENT]**
Displays a ranking list of top sources, with name and number of job ads.

Props:

1. **numberOfSources**
   Int, number of unique sources
2. **usedSearchTerm**
   String containing the last searched occupation. Used to separate current value in input field and search term in last fetch.
3. **scoreboard**
   List containing one object for each unique source.
   { source: 'example', score: 5}
