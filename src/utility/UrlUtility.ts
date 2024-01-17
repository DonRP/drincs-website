export function getURLSearchParams(location: Location) {
    let url = location.search + location.hash
    if (location.href.endsWith('#')) {
        url = url + '#'
    }
    return new URLSearchParams(url)
}
