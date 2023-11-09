export function buildRoutePath(path) {
    // the regex below will match any route parameter in our path declared in the format :parameter_name
    const routeParameterRegex = /:([a-zA-Z0-9]+)/g;

    // the regex below will replace any route parameter in our path declared in the format :parameter_name with another regex to only accept letters and numbers
    // and group the parameter name in a named capture group called :parameter_name
    const pathWithParams = path.replaceAll(routeParameterRegex, '(?<$1>[a-zA-Z0-9\-_]+)');

    // the regex below will match any query string in our path declared in the format ?query_string
    // so it will be able to match /tasks?completed=true, capturing query parameters as well
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

    return pathRegex;
}