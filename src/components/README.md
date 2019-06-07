# Chart

**[PRESENTATIONAL COMPONENT]**
Displays historical data of how many job ads have been published.

No props at the moment.
Uses a list of objects to display the graph:

```javascript
[
  {
    month: 'Jan',
    uv: 98
  },
  {
    month: 'Feb',
    uv: 145
  }
];
```

# JobDetails

**[PRESENTATIONAL COMPONENT]**
Displays the selected job ad. This component acts as the container for the selected job ad.
At mounting phase an eventListener will be initated to listen for mousedown. This will be used to close the container when clicking outside.

Props:

1. **selectedJob**
   Object - The selected job ad.
2. **unselectJob**
   Function - Function to deselect the job ad.

# PageHeader

**[PRESENTATIONAL COMPONENT]**
The page header which is used on /jobs and /overview. Contains logo and search form.

No props.

# TermAndLocation

**[CONTAINER & PRESENTATIONAL COMPONENT]**
Displays the last used search term and location. Only visible in <PageHeader /> in mobile resolution.

No props.
