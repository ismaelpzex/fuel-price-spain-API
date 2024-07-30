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
        200: {
            type: "array",
            items: {
                $ref: "station-response-dto"
            }
        },
        400: {$ref: "bad-request"},
        404: {$ref: "not-found"},
        500: {$ref: "server-error"}
    }
};
