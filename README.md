# Protodash
A quick hack to aggregate a number of Akvo metrics on one page. Static HTML with Flexbox-layout (to make it responsive-ish) and a few lines of really ugly JavaScript is all that it is for now. Uses some d3.js but otherwise just displays widgets generated by Waffle and Tessera. Also pulls real time operations status from Tessera.

***

Install http-server like this to serve the static html:

    npm install http-server -g
    
***

Run Protodash like this:

    http-server -a localhost -p 80

