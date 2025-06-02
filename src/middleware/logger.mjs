import fs from 'fs';

fs.mkdir('logs', { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

export const logger = (req, res, next) => {
  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
    'sv-SE'
  )}`;

  const logFile = 'logs/logs.txt';
  fs.appendFile(logFile, message + '\n', (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });

  next();
};
