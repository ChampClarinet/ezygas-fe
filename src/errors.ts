export class NoToastContextError extends Error {
  constructor() {
    super("No ToastContext found");
  }
}

export class UnauthorizedError extends Error {
  data: object;
  constructor(data: object) {
    super(JSON.stringify(data));
    this.data = data;
  }

  toString() {
    return JSON.stringify(this.data);
  }
}

export class TokenExpiresError extends UnauthorizedError {
  constructor() {
    super({ message: "Token is expired" });
  }
}

export class NullParamsException extends Error {
  constructor(trace?: any) {
    super("Params cannot be null" + trace ? `: ${trace}` : "");
  }
}

export class TooManyRequestsAtOnceError extends Error {
  constructor() {
    super("Too many requests at once");
  }
}

export class FetchAbortedError extends Error {
  constructor(where?: string) {
    super("Fetch aborted" + where ? `: ${where}` : "");
  }
}