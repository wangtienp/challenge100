export function filteredDestination(req,locationType,destinations) {
    const location = req.url.split('/').pop()
    return destinations.filter(destination => destination[locationType].toLowerCase() == location.toLowerCase())
}