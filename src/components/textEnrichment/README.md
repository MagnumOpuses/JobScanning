# TextEnrichmentContainer

**[CONTAINER COMPONENT]**
Container component for showing detected competences and traits in a job ad.
Uses <TextEnrichment /> as presentational component.

Uses this from redux store:

1. **selectedJob**
   Object - The current selected job ad, competences and traits will be extracted from this object.

These will be passed down as pros to <TextEnrichment />

```javascript
  <TextEnrichment
    header="Eftertraktade kompetenser" // header
    list={skills.slice(0, 10)} // max top 10 competences
    icon="briefcase" // which icon to use
    margin="0 5px 0 0" // margin
  />
/>
```

# TextEnrichment

**[PRESENTATIONAL COMPONENT]**
A presentational component used to show detected skills and traits in selected job ad. The list is expandable if enough keywords are detected.

Props:

1. **header**
   String - Used as header in the box.
2. **icon**
   String - Icon to accompany header text.
3. **list**
   List - List of either skills or traits.
4. **margin**
   String - Margin.
