// Handle Node/Browser context

/*
    https://recoverybrands.atlassian.net/wiki/spaces/PPMO/pages/50530394/Ad-Server+Requirements
    300 * 250 responsive MPU
    720 * 90 responsive Skyscraper
    300 * 600 sidebar, tall
    */

var full = document.getElementsByClassName('as-full');
var sidebar = document.getElementsByClassName('as-sidebar');
var skyscraper = document.getElementsByClassName('as-skyscraper');

var sidebarLength = sidebar.length;
var fullLength = full.length;
var skyscraperLength = skyscraper.length;

if (sidebar.length || full.length || skyscraper.length) {
    fetchInserts();
}

function fetchInserts() {
    var queryString =
        '/inserts?full=' +
        fullLength +
        '&sidebar=' +
        sidebarLength +
        '&skyscraper=' +
        skyscraperLength;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            try {
                var parsed = JSON.parse(xhr.responseText);
                handleResponse(parsed);
            } catch (e) {
                throw new Error(e);
            }
        }
    };
    xhr.open('GET', queryString, true);
    xhr.send();
}

function handleResponse(response) {
    if (!response || !response.inserts) {
        return;
    }

    var sidebarElementsAdded = 0;
    var fullElementsAdded = 0;
    var skyscraperElementsAdded = 0;

    for (var i = 0; i < response.inserts.length; i++) {
        var html = response.inserts[i].html;
        switch (response.inserts[i].size) {
            case 'sidebar':
                sidebar[sidebarElementsAdded].innerHTML = html;
                sidebarElementsAdded++;
                break;
            case 'full':
                full[fullElementsAdded].innerHTML = html;
                fullElementsAdded++;
                break;
            case 'skyscraper':
                skyscraper[skyscraperElementsAdded].innerHTML = html;
                skyscraperElementsAdded++;
                break;
        }
    }
}
