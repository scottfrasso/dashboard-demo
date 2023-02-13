import { createLogger, format, transports } from 'winston'

export const winston = createLogger({
  level: 'debug',
  format: format.json(),
  defaultMeta: {},
  transports: [new transports.Console()],
})

if (process.env.NODE_ENV !== 'production') {
  winston.add(
    new transports.Console({
      format: format.simple(),
    }),
  )
}
