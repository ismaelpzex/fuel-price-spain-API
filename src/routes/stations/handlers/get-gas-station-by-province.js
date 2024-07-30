async function getGasStationsByProvince(req, reply) {
    const {province} = req.params;
    const response = await this.stations.getStationsByProvince(province);
    if (!response || response.length === 0) {
        reply.code(404);
        return {error: "Not Found", message: "Station not found"};
    }
    return response;
}

module.exports = getGasStationsByProvince;