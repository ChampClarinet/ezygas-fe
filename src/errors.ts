export class TokenExpiresError extends Error {
  constructor() {
    super("Token is expired");
  }
}

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

export class RegistrationError extends Error {
  constructor(public message = `Something's wrong with register api`) {
    super(message);
  }
}
