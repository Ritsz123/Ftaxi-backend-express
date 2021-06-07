exports.success = (message, body, statusCode) => {
    return {
        message,
        status: statusCode,
        body
    }
}

exports.failure = (errors, statusCode) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    var findCode = codes.find((code) => code == statusCode)

    if (statusCode == 500) {
        errors = [
            {
                errorType: 'ServerFailure',
                message: 'Internal server error',
            }
        ]
    }

    return {
        'message': 'failed',
        errors
    }
}

