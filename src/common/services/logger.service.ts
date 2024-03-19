import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';
import { serialize } from '../utils/serialization-utils';

type LogLevel = 'log' | 'warn' | 'error' | 'debug' | 'verbose';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService<T = any> extends ConsoleLogger {
  private logLevelPriority = {
    error: 0,
    warn: 1,
    log: 2,
    debug: 3,
    verbose: 4,
  };

  private currentLogLevel: LogLevel = 'log';

  constructor(context?: string) {
    super(context);
    const configuredLevel: LogLevel =
      (process.env.LOG_LEVEL as LogLevel) || 'log';
    if (configuredLevel in this.logLevelPriority) {
      this.currentLogLevel = configuredLevel;
    }
  }

  shouldLog(level: LogLevel): boolean {
    return (
      this.logLevelPriority[level] <=
      this.logLevelPriority[this.currentLogLevel]
    );
  }

  logMessage(
    level: LogLevel,
    message: string,
    data?: Partial<T>,
    context: string = this.context,
    trace?: string,
  ) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = data
      ? `${message} - Data: ${serialize(data)}`
      : message;

    switch (level) {
      case 'log':
      case 'debug':
      case 'verbose':
        this.log(formattedMessage, context);
        break;
      case 'warn':
        this.warn(formattedMessage, context);
        break;
      case 'error':
        this.error(formattedMessage, trace, context);
        break;
      default:
        throw new Error(`Unsupported log level: ${level}`);
    }
  }

  logInfo(message: string, data?: Partial<T>, context?: string) {
    this.logMessage('log', message, data, context);
  }

  logWarn(message: string, data?: Partial<T>, context?: string) {
    this.logMessage('warn', message, data, context);
  }

  logError(
    message: string,
    data?: Partial<T>,
    trace?: string,
    context?: string,
  ) {
    this.logMessage('error', message, data, context, trace);
  }

  logDebug(message: string, data?: Partial<T>, context?: string) {
    this.logMessage('debug', message, data, context);
  }

  logVerbose(message: string, data?: Partial<T>, context?: string) {
    this.logMessage('verbose', message, data, context);
  }
}
