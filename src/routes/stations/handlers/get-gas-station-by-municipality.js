async function getGasStationsByMunicipality(req, reply) {
    const {municipality} = req.params;
    const response = await this.stations.getStationsByMunicipality(municipality);
    if (!response || response.length === 0) {
        reply.code(404);
        return {error: "Not Found", message: "Station not found"};
    }
    return response;
}

module.exports = getGasStationsByMunicipality;