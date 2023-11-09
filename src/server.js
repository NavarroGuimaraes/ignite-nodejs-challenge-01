import http from 'node:http';
import { jsonParser } from './middleware/json-parser.js';
import { routes } from './routes.js';
import { extractQueryParameters } from './utils/extract-query-parameters.js';

const server = http.createServer(async (req, res) => {

    await jsonParser(req, res); 

    const route = routes.find(route => {
        return route.method === req.method && route.path.test(req.url)
    });

    if (route) {

        const routeParams = req.url.match(route.path).groups;
        const { query, ...params } = routeParams;

        req.params = params;
        req.query = query ? extractQueryParameters(query) : {};

        return route.handler(req, res);
    }

    res.statusCode = 404;
    res.end('Not Found');

});


server.listen(3342);