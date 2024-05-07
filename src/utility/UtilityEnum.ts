import { GenericLookupModel } from "../model/GenericLookupModel";

export function getEnumKeys<TOid>(value: string[] | any): TOid[] {
    return Object.values(value) as TOid[];
}

export function getEnumDescriptions(value: string[] | any): string[] {
    return Object.keys(value) as string[]
}

export function getEnumLookup<TOid>(value: any, t?: (text: string) => string): GenericLookupModel<TOid>[] {
    let a = getEnumKeys<TOid>(value)
    let b = getEnumDescriptions(value)

    let c: GenericLookupModel<TOid>[] = []
    if (a.length !== b.length) {
        console.log("Error: Enum keys and descriptions are not the same length")
        return []
    }
    for (let i = 0; i < a.length; i++) {
        if (t) {
            b[i] = t(b[i]?.toLowerCase())
        }
        c.push(new GenericLookupModel<TOid>(a[i], b[i]))
    }

    // get last item
    if (c.length === 0) {
        return []
    }
    let lastItem = c[c.length - 1]
    // when Enum is number type, there are 2 last items, one is number, one is string
    let typeLastItem = typeof lastItem?.oid
    c = c.filter(x => (typeof x.oid == typeLastItem))

    return c
}
