exports.authErrorBody = {
    errorType: 'Authentication Error',
    message: 'Incorrect username or password'
}

exports.emailExistsError = {
    errorType: 'Authentication Error',
    message: 'Email already exists..'
}

exports.invalidToken = {
    errorType: 'Invalid Token',
    message: 'Email and token Mismatch.'
}

exports.invalidParameters = {
    errorType: 'invalid body / query parameters',
    message: 'please check the body / query parameters'
}