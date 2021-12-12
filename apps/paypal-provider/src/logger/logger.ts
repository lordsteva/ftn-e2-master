import winston, { format as logform } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = logform.combine(
  logform.timestamp(),
  logform.colorize({ all: true }),
  logform.printf(
    (information: any) => `${information.timestamp} ${information.level}: ${information.message}`,
  ),
);

const transports = [
  new winston.transports.Console({
    format: logform.combine(
      logform.timestamp(),
      logform.colorize({ all: true }),
      logform.printf(
        (information) => `${information.timestamp} ${information.level}: ${information.message}`,
      ),
    ),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: logform.combine(
      logform.timestamp(),
      logform.printf(
        (information) => `${information.timestamp} ${information.level}: ${information.message}`,
      ),
    ),
    maxsize: 5242880,
  }),
  new winston.transports.File({
    filename: 'logs/all.log',
    format: logform.combine(
      logform.timestamp(),
      logform.printf(
        (information) => `${information.timestamp} ${information.level}: ${information.message}`,
      ),
    ),
    maxsize: 5242880,
  }),
];

const logger = winston.createLogger({
  level: 'debug',
  levels,
  transports,
});

export default logger;
