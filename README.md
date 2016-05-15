# Protodash
A quick hack to aggregate a number of Akvo metrics on one page. Static HTML served from Express with Flexbox-layout (to make it responsive-ish) and a few lines of really ugly JavaScript is all that it is for now. Uses some d3.js but otherwise just displays widgets generated by Waffle and Tessera. Also pulls real time operations status from Tessera.

***

## Installation/setup

    > cd backend
    > npm install
    
***

## Configuration

    > cd backend/local_config
    > cp secretpasswords.json.template secretpasswords.json

Edit secretpasswords.json to add usernames, passwords and API-url:s to relevant end points.

## Running Protodash

	> cd backend
    > node app.js

Point your preferred web browser at http://localhost:80/ and enjoy.

***

## Features

* Cache middleware (kwhitley/apicache) for routes that hit external API:s. (Not fully implemented, but middleware is installed and in use on one route.)
* Github api integration (mikedeboer/node-github).

***

### Plans for the future

Yes. Probably adding a few more sources of data.

#### Ideas for the future
* Github statistics using d3.js
* Pipedrive statistics
* Reamaze statistics using d3.js
* Sorting widgets?
* Grouping widgets?
* Modularizing code
* Hiding widgets (and keeping them hidden using url parameters?)