'use strict';

const express = require('express');
const path = require('path');

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const app = express();

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../data')));

app.get('/read/:_main/:_sub/:_book/:_chapter', async (req, res) => {
	const main = req.params._main;
	const sub = req.params._sub;
	const suffix = '.' + req.params._book + '.' + req.params._chapter;

	const mainFilename = main + suffix;
	const mainFile = await readFile(path.join(__dirname, '../data', mainFilename));
	
	const subFilename = sub + suffix;
	const subFile = await readFile(path.join(__dirname, '../data', subFilename));

	res.json({main: JSON.parse(mainFile), sub: JSON.parse(subFile)});
});

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

var server = app.listen(3080, function () {
	console.log('Express server listening on port ' + server.address ().port);
});

