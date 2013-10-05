function request(opts) {

    opts = opts          || {};

    if (opts.url === void 0) {
        throw new Error('no url given');
    }

    opts.method     = opts.method   || "GET";
    opts.user       = opts.user     || null;
    opts.password   = opts.password || null;
    opts.data       = opts.data     || null;
    opts.enctype    = opts.enctype  || 'application/x-www-form-urlencoded';
    opts.success    = opts.success  || function() {};

    if (opts.async === void 0) {
        opts.async = false;
    }

    if (typeof opts.data === "object") {
        var dataParts = [];
        for (var dataItem in opts.data) {
            dataParts.push(dataItem + '=' + opts.data[dataItem]);
        }

        opts.data = dataParts.join('&');
    }

    var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open(opts.method, opts.url, opts.async, opts.user, opts.password);
        xmlHttp.setRequestHeader('Content-Type', opts.enctype);
        xmlHttp.onreadystatechange = function() {

            if (xmlHttp.readyState === 4) {
                opts.success(xmlHttp.responseText, xmlHttp.status , xmlHttp);
            }
        };

        xmlHttp.send(opts.data);

    return xmlHttp;
}