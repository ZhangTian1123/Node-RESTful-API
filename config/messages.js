/**
 * Export messages
 */
module.exports = {
    OPERATION_SUCCESS:{
        message: 'The operation was successful.',
        messageObject :{success:'The operation was successful.'},
        statusCode: 200,
        object: {status:'SUCCESS', statusCode: 200, message:'The operation was successful'}
     },     
     
     DATA_NOT_EXISTS:{
        message: 'Data dose not exists',
        messageObject :{error:'Data dose not exists'},
        statusCode: 404 ,
        object: {status:'ERROR', statusCode: 404 , message:'Data dose not exists'}
     },
    INTERNAL_ERROR: {
         message: 'Internal error',
         messageObject: {error: 'Internal error'},
         statusCode: 500,
         object: {status: 'ERROR', statusCode: 500, message: 'Internal error'}
     },
     UNAUTHORIZED: {
         message: 'Unauthorized',
         messageObject: {error: 'Unauthorized'},
         statusCode: 401,
         object: {status: 'ERROR', statusCode: 401, message: 'Unauthorized'}
     },     
     INVALID_REQUEST: {
         message: 'Invalid request',
         messageObject: {error: 'Invalid request'},
         statusCode: 400,
         object: {status: 'ERROR', statusCode: 400, message: 'Invalid request'}
     },
     INVALID_VERIFY_CODE: {
         message: 'Invalid verification code',
         messageObject: {error: 'Invalid verification code'},
         statusCode: 400,
         object: {status: 'ERROR', statusCode: 400, message: 'Invalid verification code'}
     },     
     INVALID_USERINFO: {
         message: 'Invalid email or mobile',
         messageObject: {error: 'Invalid email or mobile'},
         statusCode: 400,
         object: {status: 'ERROR', statusCode: 400, message: 'Invalid email or mobile'}
     },     
    INVALID_PASSWORD:{
        message: 'Invalid password',
        messageObject :{error:'Invalid password'},
        statusCode: 400 ,
        object: {status:'ERROR', statusCode: 400 , message:'Invalid password'}
    },
    INVALID_EMAIL:{
        message: 'Invalid email',
        messageObject :{error:'Invalid email'},
        statusCode: 400 ,
        object: {status:'ERROR', statusCode: 400 , message:'Invalid email'}
    },
    INVALID_MOBILE:{
        message: 'Invalid mobile',
        messageObject :{error:'Invalid mobile'},
        statusCode: 400 ,
        object: {status:'ERROR', statusCode: 400 , message:'Invalid mobile'}
    },
     DUPLICATED_USERINFO: {
        message: 'Exists email or mobile number',
        messageObject: {error: 'Exists email or mobile number'},
        statusCode: 401,
        object: {status: 'ERROR', statusCode: 401, message: 'Exists email or mobile number'}
    },
     INVALID_CREDENTIAL: {
         message: 'Invalid email or password',
         messageObject: {error: 'Invalid email or password'},
         statusCode: 401,
         object: {status: 'ERROR', statusCode: 401, message: 'Invalid email or password'}
     },
     USER_DEACTIVATED: {
         message: 'Account deactivated',
         messageObject: {error: 'Account deactivated'},
         statusCode: 401,
         object: {status: 'ERROR', statusCode: 401, message: 'Account was deactivated'}
     },
     USER_EMAIL_DONT_VERIFIED: {
        message: 'Account was not verified by Email verification code',
        messageObject: {error: 'Account was not verified by Email verification code'},
        statusCode: 400,
        object: {status: 'ERROR', statusCode: 400, message: 'Account was not verified by Email verification code'}
    },
    USER_MOBILE_DONT_VERIFIED: {
        message: 'Account was not verified by SMS verification code',
        messageObject: {error: 'Account was not verified by SMS verification code'},
        statusCode: 400,
        object: {status: 'ERROR', statusCode: 400, message: 'Account was not verified by SMS verification code'}
    },
     USER_NOT_EXIST: {
         message: 'User does not exist',
         messageObject: {error: 'User does not exist'},
         statusCode: 404,
         object: {status: 'ERROR', statusCode: 404, message: 'User does not exist'}
     }
 };
 