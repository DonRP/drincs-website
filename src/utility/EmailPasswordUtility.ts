import * as EmailValidator from 'email-validator';
import { validPasswordRegex } from '../values/constant';

export function checkIfIsValidEmail(email: string): boolean {
    return EmailValidator.validate(email)
}

export function checkIfIsEqualPassword(password: string | null, repeatPassword: string | null) {
    if (!password || !repeatPassword) {
        return true
    }
    if (password === repeatPassword) {
        return true
    }
    return false
}

export function checkIfIsValidPassword(password: string | null) {
    if (!password) {
        return true
    }
    var strongRegex = new RegExp(validPasswordRegex);
    return strongRegex.test(password)
}
