# Kom i gang med Sanity

Denne guiden vil hjelpe deg med å sette opp en Sanity-backend og koble den til en frontend.

## Del 1: Sette opp Sanity Studio

### 1. Opprett et nytt Sanity-prosjekt

1. Åpne iTerm og naviger til mappen hvor du lagrer repositoriene dine:
   ```sh
   mkdir sanity-demo && cd sanity-demo
   ```
2. Inne i denne mappen, opprett en `backend`-mappe:
   ```sh
   mkdir backend && cd backend
   ```
3. Installer Sanity:
   ```sh
   npm create sanity@latest
   ```
4. Følg oppsettsinstruksjonene:

   - OK to proceed? (y)
   - **Login type:** Velg GitHub og logg inn.
   - **Create a new project or select an existing one :** Velg "Create new project."
   - **Your project name:** Skriv inn `gamelibrary`.
   - **Organization name:** Trykk Enter.
   - **Use the default dataset configuration?** Skriv `y`.
   - **Project output path: :** Trykk Enter.
   - **Select project template:** Velg "Clean project with no predefined schemas."
   - **Do you want to use TypeScript? (Y/n)** Skriv `n`.
   - **Package manager to use for installing dependencies?:** Velg `npm`.

5. Kjør prosjektet:
   ```sh
   npm run dev
   ```
   Du skal nå se en melding om "No document types" i nettleseren.

## Del 2: Oppsett av Schemas

### 1. Opprette skjemaet for games

1. Åpne prosjektet i VS Code og naviger til `schemaTypes`-mappen.
2. Opprett en ny fil kalt `games.js` og legg til følgende kode:
   ```js
   export default {
     name: "games",
     type: "document",
     title: "Games",
     fields: [
       {
         name: "Name",
         type: "string",
         title: "Navn på spill",
       },
       {
         name: "Year",
         type: "number",
         title: "År",
       },
     ],
   };
   ```
3. Åpne `index.js` i samme mappe og legg til:
   ```js
   import games from "./games";
   export const schemaTypes = [games];
   ```
4. Start prosjektet på nytt og sjekk Sanity Studio på `localhost:3333`. Du skal nå se "Games" i oversikten. Legg til noen spill!

### 2. Opprette skjemaet for companies

1. Opprett en ny fil i `schemaTypes` kalt `companies.js`.
2. Definer skjemaet for selskaper med et `name` field på samme måte som i `games.js`.
3. Oppdater `index.js` til å inkludere `companies`:
   ```js
   import companies from "./companies";
   export const schemaTypes = [games, companies];
   ```
4. Rediger `games.js` for å legge til en referanse til selskaper:
   ```js
   {
     name: 'Company',
     type: 'object',
     fields: [
       {
         name: 'companyName',
         type: 'reference',
         to: [{ type: 'companies' }],
       },
     ],
   }
   ```
5. Start prosjektet på nytt og sjekk at både "Games" og "Companies" vises i Sanity Studio. Hurra!

## Del 3: Koble frontend og backend sammen

### 1. Oppsett av frontend

1. Opprett en `frontend`-mappe og legg til en `index.html`-fil og en `script.js`-fil.
2. I `script.js`, definer din prosjektinformasjon. Den finner du på [sanity.io/manage](https://www.sanity.io/manage)
   ```js
   let PROJECT_ID = "<sett inn din ide her>";
   let DATASET = "production";
   let QUERY = encodeURIComponent('*[_type == "games"]');
   ```
3. Lag URL-en for å hente data:
   ```js
   let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
   ```
4. Hent data fra Sanity:
   ```js
   async function fetchData() {
     let response = await fetch(URL);
     let data = await response.json(); //hele data-bjektet fra Sanity
     let gamesList = data.result; //kun listen med spillobjekter
   }
   fetchData();
   ```
5. Kjør frontend-prosjektet og sjekk i konsollen om du får alle spillene. Hvis du får en CORS-feilmelding, sjekk neste steg!

### 2. Hvordan løse CORS errors

CORS (Cross-Origin Resource Sharing) er en sikkerhetsmekanisme i nettlesere som forhindrer en nettside fra å hente data fra en annen domene/server med mindre denne serveren eksplisitt tillater det.

For eksempel: Hvis din frontend kjører på http://localhost:3000, men prøver å hente data fra https://api.sanity.io, kan nettleseren blokkere forespørselen med en CORS-feilmelding.

For å løse dette i Sanity kan du tillate forespørsler fra frontend-en ved å legge til din `http://localhost:????` i CORS-innstillingene `sanity.io/manage --> game-library --> API CORS-origin`

## Veien videre

- [Se på GROC og queries med Sanity Studio Vision. ](https://www.sanity.io/learn/course/day-one-with-sanity-studio/a-taste-of-groq) Queries fungerer likt som SQL-spørringer.
- [Prøv å legg til bilder!](https://www.sanity.io/docs/presenting-images) `image` er en egen type, men det må pakkes ut på en spesiell måte på frontend-en.
- Kjør Sanity med Svelte, React, Next front end (google it)
- Se på [Environment variabler](https://www.sanity.io/docs/environment-variables)

**Gå inn på [Sanity Learn](https://www.sanity.io/learn/course?audience=developers) for mange flere kurs og tutorals!**
