export class UserManagerResponse {
  message: string;
  isSuccess: boolean;
  errors: string[];
  userInfo: string[];
  expireDate: string[];

  constructor(
    message: string,
    isSuccess: boolean,
    errors: string[],
    userInfo: string[],
    expireDate: string[]
  ) {
    this.message = message;
    this.isSuccess = isSuccess;
    this.errors = errors;
    this.userInfo = userInfo;
    this.expireDate = expireDate;
  }
}

export class LoginPayload {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class RegisterPayload {
  email: string;
  firstName: string;
  indexNumber: string;
  password: string;
  confirmPassword: string;

  constructor(
    email: string,
    firstName: string,
    indexNumber: string,
    password: string,
    confirmPassword: string
  ) {
    this.email = email;
    this.firstName = firstName;
    this.indexNumber = indexNumber;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
