const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../')));

app.get('/impression', (req, res) => {
    console.log('recorded impression');
});

app.get('/inserts', (req, res) => {
    const {full, sidebar, skyscraper} = req.query;
    const arrayFromLength = length => Array.apply(null, Array(+length));

    res.json({
        inserts: [
            ...arrayFromLength(full).map(() => ({
                html: fetchAd('full'),
                size: 'full'
            })),
            ...arrayFromLength(sidebar).map(() => ({
                html: fetchAd('sidebar'),
                size: 'sidebar'
            })),
            ...arrayFromLength(skyscraper).map(() => ({
                html: fetchAd('skyscraper'),
                size: 'skyscraper'
            }))
        ]
    });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, err => {
    if (err) throw err;

    console.log('app is listeneing on ' + port);
});

/*
https://recoverybrands.atlassian.net/wiki/spaces/PPMO/pages/50530394/Ad-Server+Requirements
300 * 250 responsive MPU
720 * 90 responsive Skyscraper
300 * 600 sidebar, tall
*/

const fetchAd = size => {
    let style;

    switch (size) {
        case 'full':
            style = 'width: 300px; height: 250px; background-color: dodgerblue;';
            break;
        case 'sidebar':
            style =
                'width: 300px; height: 600px; background-color: crimson; color: white';
            break;
        case 'skyscraper':
            style = 'width: 720px;  height: 90px; background-color: orange';
    }

    return `<div style="${style}">${size}<img width="1px" height="1px" src="/impression" /></div>`;
};
