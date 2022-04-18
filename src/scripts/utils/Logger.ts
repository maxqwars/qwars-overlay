class Logger {
  private __PREFIX: string;

  constructor(prefix = "USR_WEB_EXTENSION") {
    this.__PREFIX = prefix;
  }

  log(value: any) {
    console.log(this.__PREFIX, value);
  }
}

export default Logger;
