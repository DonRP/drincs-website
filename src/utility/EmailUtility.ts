import * as EmailValidator from 'email-validator';

export function checkIfIsValidEmail(email: string): boolean {
    return EmailValidator.validate(email)
}
