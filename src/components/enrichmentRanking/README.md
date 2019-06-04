# EnrichmentRanking

**[PRESENTATIONAL COMPONENT]**
Ranking of enrichment data (skills and traits).

Props:

1. **hits**
   List, used for displaying how many ads where used.
2. **usedSearchTerm**
   String, used for displaying searched job.
3. **target**
   List, the list to render, either competences or skills.
4. **targetName**
   String, used as header

# SkillsRankingContainer

**[CONTAINER COMPONENT]**
Container component for skills ranking. Uses **EnrichmentRanking** as presentational component.

Uses this from redux store:

1. hits
2. usedSearchTerm
3. topCompetences

These will be passed down as pros to <EnrichmentRanking />

```javascript
<EnrichmentRanking
    hits={hits}
    usedSearchTerm={usedSearchTerm}
    target={topCompetences}
    targetName={'kompetenser'} />.
```

# TraitsRankingContainer

**[CONTAINER COMPONENT]**
Container component for traits ranking. Uses **EnrichmentRanking** as presentational component.

Uses this from redux store:

1. hits
2. usedSearchTerm
3. topTraits

These will be passed down as pros to <EnrichmentRanking />

```javascript
<EnrichmentRanking
    hits={hits}
    usedSearchTerm={usedSearchTerm}
    target={topTraits}
    targetName={'förmågor'} />.
```
