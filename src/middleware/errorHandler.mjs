import fs from 'fs';

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error';
  res.status(err.statusCode).json({
    success: err.success,
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });

  // Write error to ./logs/error.log
  const errorLog = `${new Date().toISOString()} - ${err.status} - ${err.statusCode} - ${err.message}\n`;
  fs.appendFile('logs/error.log', errorLog, (err) => {
    if (err) {
      console.error('Error logging error:', err);
    }
  });
};
export default errorHandler;

// const errorHandler = (err, req, res, next) => {
//   const errorLog = `[${new Date().toISOString()}] ${err.message}\n`;
//   fs.appendFileSync('error.log', errorLog);
//   res.status(err.statusCode || 500).json({ error: err.message });
// };
// export default errorHandler;
