async function getNearestGasStations(req, reply) {
    const {lat, lon, distance} = req.query;
    const response = await this.stations.getNearestGasStations({lon, lat, distance});
    return response;
}

module.exports = getNearestGasStations;