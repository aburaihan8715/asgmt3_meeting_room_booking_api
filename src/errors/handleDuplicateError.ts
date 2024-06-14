import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const message = err.message;
  const statusCode = 400;
  const errorMessages: TErrorSources = [
    {
      path: '',
      message,
    },
  ];

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleDuplicateError;
