# SearchFormContainer

**[CONTAINER COMPONENT]**
A container component for the search form. Manages current input and fires updates in redux store.

Uses this from redux store:

1. **searchTerm**
   String, current input in occupation field
2. **location**
   Object, current selected location and it's properties.

This component uses <SearchForm /> as presentational component.
These will be passed down as pros to <SearchForm />

```javascript
      <SearchForm
        searchTerm={searchTerm} // string, current value in input field and redux store
        location={location.value} // string, the location object contains all information about current selected location. Location.value is the short name of the selected location.
        handleChange={this.handleChange} // function to either update search term or location in redux store
        handleSubmit={this.handleSubmit} // fetch jobs
        countiesAndMunicipalities={countiesAndMunicipalities} // all counties and municipalities in sweden, used as possible values in dropdown
        upward={upward} // boolean, in the dropdown should be upward or not
        isDesktop={isDesktop} // boolean, if it's desktop or not
      />
/>
```

# SearchForm

**[PRESENTATIONAL COMPONENT]**
This component renders a form containing one text field, one dropdown menu and a submit button.

Props:

1. **handleSubmit**
   function, this function will be called when the user press the submit button. The function calls redux actions and fetch jobs.
2. **countiesAndMunicipalities**
   list, contains all possible locations to choose from. Used as options list in dropdown menu
3. **isDesktop**
   boolean, used to add class "isDesktop" to the search form for special design in desktop mode. The prop is barely used anymore and could be rewritten since the designs doesn't differ much anymore.
4. **searchTerm**
   string, the current search term in input and redux store
5. **location**
   string, the name of the currently selected location. Used to control selected location in dropdown.
6. **handleChange**
   function, updates either search term or location in redux store
7. **upward**
   boolean, if the dropdown is supposed to be upward or downward
