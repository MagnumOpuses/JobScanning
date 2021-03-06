![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/raw/master/img/jobtechdev_black.png "JobTech dev logo"
[A JobTech Project]( https://www.jobtechdev.se)

# JobScanner

This is a demonstration of what you can do with the JobTech API's. 
It shows ads and gives the posibilities to find ads in diffrent ways, it has also enriched all ads and shows them on a map if that information is applied in the ad.

## Version Beta - Disclaimer

The project is under development and should not be seen as production ready.
Features may be added, removed or modified.
Design is not finialized and will most likely be changed/improved.

## Get started!

### Prerequisites

* You will need [npm](https://www.npmjs.com/) on your computer.
* You need a API key from [Lantmäteriet](https://opendata.lantmateriet.se/#register) to get the map.
* You need API key for Job search API from [jobtechdev.se](https://jobtechdev.se) to get the ads
*optionally you can use Docker*


### Installation

Easiest way to get started:

1. Click **Clone or download**
2. Select **Download ZIP** (or clone it)
3. Unzip the project
4. Open a terminal of your liking, Terminal (Mac) or cmd/PowerShell (Windows)
5. Navigate to the unzipped project
6. Copy the [.env.default](./.env.default) to .env and add the API keys
7. Run the following command **`npm i`** or **`npm install`**
8. Start the project by running **`npm start`**
9. DONE! The project will be running at [http://localhost:3000](http://localhost:3000)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Built with

This project uses the component [MapWidget](https://github.com/MagnumOpuses/mapWidget) from another repo on Jobtech. <br />
You can read more about that in [readme.md](https://github.com/MagnumOpuses/mapWidget/blob/master/README.md) on that project. <br /> 
Also we have used [iamhosseindhv snackbar](https://iamhosseindhv.com/notistack/demos#custom-snackbar)
Otherwise there is more technical descriptions in readme files in each componets folders. 

## Docker
you might need to run them with `sudo`

1. goto project root
2. run: `docker build . -t <image name>`
3. run: `docker run -it -p 8080:8080 <image name>`
4. open a browser of your choice and goto: `http://localhost:8080/`

## Contributing

Contact us if you would like to contribute.
