import { AuthenticatorTypeRequest } from "../middleware/authenticator.type";

export default class UserAuthenticatorValidator {
    static validate(req: AuthenticatorTypeRequest, userId: string) {
        return req.authenticator!.userId === userId;
    }
}
