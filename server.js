#!/usr/bin/env node
var prerender = require('prerender');

/* 
	Define configuration options if needed 
	--------------------------------------
*/

//process.env.BASIC_AUTH_USERNAME	= "prerender";
//process.env.BASIC_AUTH_PASSWORD	= "test";
//process.env.BLACKLISTED_DOMAINS	= "somedomain.com,anotherone.com";
//process.env.CACHE_MAXSIZE			= 100;
//process.env.CACHE_TTL				= 60;
//process.env.S3_BUCKET_NAME		= "a_wonderful_bucket"; 
//process.env.S3_PREFIX_KEY			= "some_prefix_key";
//process.env.ALLOWED_DOMAINS		= "somedomain.com,anotherone.com";


/*
	Initialize the server
	---------------------
*/
var server = prerender({
	port: process.env.PORT || 3000,
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT,
	chromeLocation: '/usr/bin/chromium-browser',
	chromeFlags: [ '--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222', '--hide-scrollbars' ]
});


/* 
	Enable plugins
	--------------
*/

// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();