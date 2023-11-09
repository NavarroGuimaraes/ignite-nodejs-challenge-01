export function extractQueryParameters(query) {
    const queryParameters = {};

    if (!query) {
        return queryParameters;
    }

    const queryParametersArray = query.substr(1).split('&');

    for (const queryParameter of queryParametersArray) {
        const [key, value] = queryParameter.split('=');
        queryParameters[key] = value;
    }

    return queryParameters;
}