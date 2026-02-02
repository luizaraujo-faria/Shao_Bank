interface AppResponseType {
  success: boolean;
  message: string;
}

export class SuccessResponse<T> implements AppResponseType {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static res<T>(message: string, data?: T): SuccessResponse<T> {
    return new SuccessResponse<T>(true, message, data);
  }
}

export class SignInResponse implements AppResponseType {
  success: boolean;
  message: string;
  token?: string;

  constructor(success: boolean, message: string, token?: string) {
    this.success = success;
    this.message = message;
    this.token = token;
  }

  static res(token: string): SignInResponse {
    return new SignInResponse(true, 'Login realizado com sucesso!', token);
  }
}
