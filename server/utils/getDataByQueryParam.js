export function getDataByQueryParams(data, queryObj) {
    const { continent, country, is_open_to_public } = queryObj
    if (continent) {
        data = data.filter(destination => destination.continent.toLowerCase() === continent)
    }
    if (country) {
        data = data.filter(destination => destination.country.toLowerCase() === country)
    }
    if (is_open_to_public) {
        data = data.filter(destination => JSON.parse(is_open_to_public.toLowerCase()) === destination.is_open_to_public)
    }
    return data
}