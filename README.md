# work in progress!


## open site locally

### Start frontend
In repo root folder:
```bash
npm i
npm start
```

### Start backend

Using MAMP
1. Add new virtual host, set a name
2. Set document root to repo root directory, click "next"
3. Start Apache server
4. Right-click and select open host in browser. When browser window opens with directories, navigate to `src/php/upload.php` , copy the current URL to your clipboard 
5. In `src/components/common/uploadPage/uploadPage.js` there's a `fetch`-function. Paste your URL as its first parameter. Like so: `fetch("your-url")` 

Using XAMPP
1. Start Apache server
2. Open browser and navigate to `src/php/upload.php`. Copy the URL
3. In `src/components/common/uploadPage/uploadPage.js` there's a `fetch`-function. Paste your URL as its first parameter. Like so: `fetch("your-url")` 

## TODO
- Ordne Filopplasting
- expand minify images guide
- evt. støtte for HTML filer. Konverter det til JSON
- evt. lag en versjon med mest sette youtubere
- evt. DEMO / playground som viser hvordan appen funker?

* * * * * * * *
---------------


Husk at du har dette
ES7+ React snippets addon

https://github.com/dsznajder/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md

### `rafcp`
```js
import React from 'react'
import PropTypes from 'prop-types'

const $1 = (props) => {
  return <div>$0</div>
}

$1.propTypes = {}

export default $1
```

### `rafce`
```js
import React from 'react'

const $1 = () => {
  return <div>$0</div>
}

export default $1

```


https://feathericons.com/