import { UserSchemaType } from "../models/UserSchema.type";

export default class UserValidator {
  readonly #regexEmail = new RegExp(
    /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/
  );
  readonly email: string | boolean;
  readonly password: string | boolean;

  constructor(data: UserSchemaType) {
    this.email = this.validateEmpty(data.email);
    this.password = this.validateEmpty(data.password);

    if (this.email === true) {
      this.email = this.validateEmail(data.email);
    }
  }

  public validateEmail(email: string): boolean {
    return this.#regexEmail.test(email);
  }

  public validateEmpty(data: string): string | boolean {
    switch (data) {
      case "":
        return "empty";
      case " ":
        return "space";
      default:
        return true;
    }
  }
}
