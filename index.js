const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

const generateHtml = size => (val, i) => {
    let style;
    if (size === 'full')
        style = 'width: 200px; height: 200px; background-color: dodgerblue;';
    if (size === 'sidebar')
        style = `width: 340px; height: 300px; background-color: crimson; color: white`;
    if (size === 'skyscraper')
        style = `width: 500px; height: 80px; background-color: orange`;

    return `<div style="${style}">${size}<img width="1px" height="1px" src="/impression" /></div>`;
};

app.get('/impression', (req, res) => {
    console.log('recorded impression');
});

app.get('/inserts', (req, res) => {
    const {full, sidebar, skyscraper} = req.query;

    res.json({
        full: Array.apply(null, Array(+full)).map(generateHtml('full')),
        sidebar: Array.apply(null, Array(+sidebar)).map(generateHtml('sidebar')),
        skyscraper: Array.apply(null, Array(+skyscraper)).map(generateHtml('skyscraper'))
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, err => {
    if (err) throw err;

    console.log('app is listeneing on ' + port);
});
