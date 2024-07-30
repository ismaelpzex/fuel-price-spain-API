async function getGasStationsByLocation(req, reply) {
    const {location} = req.params;
    const response = await this.stations.getStationsByLocation(location);
    if (!response || response.length === 0) {
        reply.code(404);
        return {error: "Not Found", message: "Station not found"};
    }
    return response;
}

module.exports = getGasStationsByLocation;