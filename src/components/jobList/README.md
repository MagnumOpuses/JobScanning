# JobList

**[CONTAINER & PRESENTATIONAL COMPONENT]**
Infinite scroll for search results.

Uses this from redux store:

1. **isFetching**
   Display loading state.
2. **error**
   Display error in respons.
3. **hits**
   The list of jobs.
4. **hasMore**
   Used to show end message if there's no more jobs in respons.
5. **selectedJob**
   Used to show indicator on list item.
6. **searchTerm**
   Current search term.
7. **location**
   Current location
8. **offset**
   Used to fetch more and new ads when user reach bottom of list

These will be passed down as pros to <ListItem />

```javascript
<ListItem
  key={item.id}
  job={item} // one item in hits list
  selectOrUnselectJob={this.props.selectOrUnselectJob} // select / unselect a job in the list
  selectedJob={selectedJob} // the selected job, used to show selected indicator
/>
```

# ListItem

**[PRESENTATIONAL COMPONENT]**
Displays one record of the current results list.

Props:

1. **selectOrUnselectJob**
   Function to select a job. Takes an job object.
2. **job**
   A job object containing all information.
3. **selectedJob**
   The current selected job object, used to show selected indicator in the background.
