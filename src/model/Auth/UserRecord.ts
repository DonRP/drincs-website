export interface UserRecord {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoUrl: string;
    providerId: string;
    emailVerified: boolean;
    disabled: boolean;
    providerData: any[];
    tokensValidAfterTimestamp: string;
    userMetaData: any;
    customClaims: { [key: string]: any; };
    tenantId: string;
}