exports.success = (message, body, statusCode) => {
    return {
        message,
        status: statusCode,
        body
    }
}

exports.error = (message, errors, statusCode) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    const findCode = codes.find((code) => code == statusCode)

    if (!findCode) findCode = 500
    else statusCode = findCode

    return {
        message,
        status: statusCode,
        errors
    }
}

