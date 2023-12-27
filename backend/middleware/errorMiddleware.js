const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass error to error handler
};

// overrisde default error handler
const errorHandler = (err, req, res, next) => {
  // set status code to 500 if not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message: 'Resource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };
