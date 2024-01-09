export class GenericLookupModel<T> {
    constructor(oid: T, description: string, disabled: boolean = false) {
        this.oid = oid;
        this.description = description;
        this.disabled = disabled
    }
    oid: T;
    description: string;
    disabled: boolean | undefined = false;
}
