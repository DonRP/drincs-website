export interface AuthData {
    token: string;
    tokenExpirationTime: number;
    id: string;
    emailVerified: boolean;
}