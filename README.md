# **GitHub Repositories With Search Functionality**

## TO-DO
- no repetir codigo hacer utils o algo (handleClickLanguage llevarlo a Searchbox? o incluso meter todas las searches en el context)
- Animation / SOUND
- Document with [ref](https://google.github.io/styleguide/jsguide.html#jsdoc)
  
## Description
This application provides a simple search functionality for GitHub Repositories.

Given a user, the program attempts populates a simple list of linked repositories. The results can be filtered by searching the repositories names or selecting programming languages of interest.

## Specs
- React + Typescript
  - This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
  - This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
  - Start developing with live server with command `npm run dev`.
  - Environment variables are stored in `.env.local` but **must be also specified in `.next.config.js`**.
- CSS: 
  - Tailwind CSS
  - Utility-first Methodology
  - Compatibliity with dark-mode
- APIs: 
  - [GitHub REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28)
- Versioning: 
  - Git 
  - [GitHub Repository](https://github.com/edealfonso/github-repos-lists)
- Tested in: Google Chrome
- Deployed in: [Netlify](https://unique-eclair-16ca45.netlify.app/)

## Instructions

1. User Form Popup
   - The user is asked to write a GitHub username.
   - The program attempts to fetch its repositories, by making a call to GitHub's REST API.
   - In case of error, a message is displayed.
   - A **loader** shows every time we perform an asynchronous operation.
   - Data is saved and updated in `AppContext`: 
     - Popup is showing (`showPopup`)
     - Loader is showing (`isLoading`)

2. Population of user results and filters
   - If a correct response is obtained, a simple list of repositories is populated.
   - Each item is linked to repository page, and has an indication of its main programming language.
   - In parallel, a list of all the programming languages of this list of repositories **of that particular user** is populated, in order to create filters.
   - Data is saved and later updated in `AppContext`: 
      - GitHub user (`username`)
      - Repository list (`list`)
      - Language list including selection data (`languageList`)

3. Filtering
   - User can now interact with the filtering system.
   - In the "Keywords" input, the user can search repositories names. A new request to the API will take place when user presses "Search" submit, updating the results.
   - The "Languages" selectors can be toggled to filter by programming language. Each click on a selector will send a new request to the API, updating the results.
   - Data is saved and updated in `AppContext`: 
     - Search keywords (`keywords`)
  
4. Changing the username
    - User can also put back the popup and change the username.
    - In case username is changed, the filters are reset and we go back to point 2 (not only repositories list but also **language filters are re-popupated**)


## Instructions on testing
No test suite has been developed yet.


## Problems/findings encountered during development
Search for `**(*NOTEX*)**` in comments.
- **(*NOTE1*)**: The GitHub API offers a very complete repositories search that can satisfy all requerements, but the search query must be carefully constructed using `encodeURIComponent`.
- **(*NOTE2*)**: Languages names with spaces must be wrapped in `"  "` so that the API search query works.
- **(*NOTE3*)**: The `key` of listed components propreties becomes `undefined` at some point of the rendering and it's not something you can rely on.
- **(*NOTE4*)**: State variables of arrays are tricky to update.

## Future improvements
- Add pagination (now the maximum is set to 100 results)
- Improve loader (set local loaders and a more customized animation)
- Add animations
- Add Storybook
- Write tests
- Use the GraphQL [v4 API](https://docs.github.com/en/graphql)


## Credits

@2023 [Elsa de Alfonso](mailto:elsa.de.alfonso@gmail.com)