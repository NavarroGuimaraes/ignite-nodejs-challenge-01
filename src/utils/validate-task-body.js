export function validateTaskBody(body) {
    let missingParamsMessage = 'Missing parameters: ';
    let isMissingRequiredParams = false;

    const { title, description } = body;
    
    if (!title) {
        missingParamsMessage += 'title';
        isMissingRequiredParams = true;
    }

    if (!description) {

        if (isMissingRequiredParams) {
            missingParamsMessage += ', ';
        }

        missingParamsMessage += 'description';
        isMissingRequiredParams = true;

    }

    if (isMissingRequiredParams) {
        return missingParamsMessage;
    }

    return null;
}