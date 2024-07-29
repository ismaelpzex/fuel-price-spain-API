# FuelPriceSpainAPI

    ______           __   ____       _              _____             _          ___    ____  ____
   / ____/_  _____  / /  / __ \_____(_)_______     / ___/____  ____ _(_)___     /   |  / __ \/  _/
  / /_  / / / / _ \/ /  / /_/ / ___/ / ___/ _ \    \__ \/ __ \/ __ `/ / __ \   / /| | / /_/ // /  
 / __/ / /_/ /  __/ /  / ____/ /  / / /__/  __/   ___/ / /_/ / /_/ / / / / /  / ___ |/ ____// /   
/_/    \__,_/\___/_/  /_/   /_/  /_/\___/\___/   /____/ .___/\__,_/_/_/ /_/  /_/  |_/_/   /___/   
                                                     /_/                                          

FuelPriceSpainAPI is a Fastify-based RESTful API that provides up-to-date information on fuel prices at gas stations across Spain. This API is containerized using Docker and leverages PostgreSQL as its database. The application includes several endpoints for accessing fuel price data, which can be explored via the documentation available at [http://localhost:4000/docs](http://localhost:4000/docs).

## Features

- **Real-Time Data**: Automatically fetches the latest fuel prices from the official government website twice a day.
- **Comprehensive Coverage**: Includes data from gas stations across all provinces in Spain.
- **Containerized**: Fully containerized using Docker for easy deployment and scalability.
- **Detailed Documentation**: API documentation is provided using Scalar, accessible at [http://localhost:4000/docs](http://localhost:4000/docs).

## Prerequisites

- Docker
- Docker Compose
- Make

## Getting Started

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/fuel-price-spain-api.git
    cd fuel-price-spain-api
    ```

2. Create a `.env` file in the root directory with the following content:

    ```bash
    POSTGRES_USER=example
    POSTGRES_PASSWORD=example
    POSTGRES_DB=db
    POSTGRES_HOST=database
    ```

### Usage

#### Build and Start the Application

To build and start the Docker containers, use the following commands:

Build the containers:

```bash
make build
```

Start the containers:

```bash
make start
```

#### Manage the Application

Stop the containers:

```bash
make stop
```

Stop and clean up (including database content):

```bash
make clean
```

#### Accessing the API

API Documentation: Visit [http://localhost:4000/docs](http://localhost:4000/docs) to explore available endpoints and their usage.

#### Automatic Data Fetch

The application automatically fetches the latest fuel prices from the official government website twice a day to ensure the database is up-to-date.

#### Scalar Documentation

Detailed API documentation is provided through Scalar. Explore and test the available endpoints via the documentation at [http://localhost:4000/docs](http://localhost:4000/docs).

#### Example Endpoint

To retrieve all stations, send a GET request to `/stations`:

```http
GET /stations
```

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the existing code style and includes appropriate tests.

## Contact

For any questions or suggestions, please open an issue or contact ismaelpzex@gmail.com
