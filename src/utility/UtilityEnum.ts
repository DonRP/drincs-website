export function getEnumDescriptions(value: string[] | any): string[] {
    return Object.values(value).filter((v) => isNaN(Number(v))) as string[]
}
