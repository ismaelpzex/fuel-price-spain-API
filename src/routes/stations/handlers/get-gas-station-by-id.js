async function getGasStationById(req, reply) {
    const {id} = req.params;
    const response = await this.stations.getStationById(id);
    if (!response) {
        reply.code(404);
        return {error: "Not Found", message: "Station not found"};
    }
    return response;
}

module.exports = getGasStationById;