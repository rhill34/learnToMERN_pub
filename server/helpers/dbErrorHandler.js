/**Mongoose error handling */
const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Somethign went wrong'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
            message = err.errors[errName].message
        }
    }
    return message
}
/**Errors not thrown by Mongoose validator. Helper to parse the unique constrant related error object and construct an appropriate error message */
const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = 
        err.message.substring(err.message.lastIndexOf('.$') + 2,
        err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
    }catch (ex) {
        output = 'Unique field already exists'
    }
    return output
}
/**Function exported to add meaningful error messages when handling errors thrown by Mongoose operations perform CRUD */
export default {getErrorMessage}