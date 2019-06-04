# five ways to calculate an average with array reduce

a simple solution:

```js
function average(nums) {
  return nums.reduce((a, b) => a + b) / nums.length
}
```

Let’s suppose we have an array of, say, Victorian-era slang terms. We’d like to filter out the ones that don’t occur in Google Books and get the average popularity score. Here’s how the data might look:

```js
const victorianSlang = [
  {
    term: 'doing the bear',
    found: true,
    popularity: 108
  },
  {
    term: 'katterzem',
    found: false,
    popularity: null
  },
  {
    term: 'bone shaker',
    found: true,
    popularity: 609
  },
  {
    term: 'smothering a parrot',
    found: false,
    popularity: null
  },
  {
    term: 'damfino',
    found: true,
    popularity: 232
  },
  {
    term: 'rain napper',
    found: false,
    popularity: null
  },
  {
    term: 'donkey’s breakfast',
    found: true,
    popularity: 787
  },
  {
    term: 'rational costume',
    found: true,
    popularity: 513
  },
  {
    term: 'mind the grease',
    found: true,
    popularity: 154
  }
]

const isBookNotFoundInGoogleBooks = book => !book.found

const filterThatBooksIsNotFoundInGoogleBooks = (books = []) =>
  books.filter(isBookNotFoundInGoogleBooks)

const isBookHasPopularityScore = (book = {}) => book.popularity !== null

const getAverage = (sum, length) => sum / length

const getPopularity = item => item.popularity

const getTheAveragePopularityScoreOfBooks = (books = []) =>
  books.reduce((acc, curr, ind, books) =>
    ind < books.length - 1
      ? isBookHasPopularityScore(curr)
        ? acc + getPopularity(curr)
        : acc
      : isBookHasPopularityScore(curr)
      ? getAverage(acc + getPopularity(curr), books.length)
      : getAverage(acc, books.length)
  )
```
