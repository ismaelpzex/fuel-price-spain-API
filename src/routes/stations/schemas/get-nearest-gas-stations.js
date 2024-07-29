module.exports = {
    querystring: {
        type: "object",
        properties: {
            lat: {type: "number"},
            lon: {type: "number"},
            distance: {
                type: "number",
                minimum: 10,
                maximum: 20000
            }
        },
        required: ["lat", "lon"]
    },
    response: {
        400: {$ref: "bad-request"}
    }
};
