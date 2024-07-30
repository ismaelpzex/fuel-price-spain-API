# FuelPriceSpainAPI

## Español.

FuelPriceSpainAPI es una API RESTful basada en Fastify que proporciona información actualizada sobre los precios de combustible en estaciones de servicio en toda España. Esta API está containerizada utilizando Docker y utiliza PostgreSQL como su base de datos. La aplicación incluye varios endpoints para acceder a los datos de precios de combustible, los cuales se pueden explorar a través de la documentación disponible en `/docs`.

## Características

- **Datos en Tiempo Real**: Recupera automáticamente los últimos precios de combustible del sitio web oficial del gobierno español dos veces al día.
- **Cobertura Integral**: Incluye datos de estaciones de servicio en todas las provincias de España.
- **Containerizado**: Totalmente containerizado utilizando Docker para una fácil implementación y escalabilidad.
- **Documentación Detallada**: La documentación de la API se proporciona mediante Scalar, accesible en `/docs`.

## Prerrequisitos

- Docker
- Docker Compose
- Make

## Comenzando

### Instalación

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/ismaelpzex/fuel-price-spain-api.git
    cd fuel-price-spain-api
    ```

2. Crea un archivo `.env` en el directorio raíz con el siguiente contenido:

    ```bash
    POSTGRES_USER=example
    POSTGRES_PASSWORD=example
    POSTGRES_DB=db
    POSTGRES_HOST=database
    ```

### Uso

#### Construir y Arrancar la Aplicación

Para construir y arrancar los contenedores Docker, usa los siguientes comandos:

Construir los contenedores:

```bash
make build
```

#### Administrar la Aplicación

Detener los contenedores:

```bash
make stop
```

Detener y limpiar (incluyendo el contenido de la base de datos):

```bash
make clean
```

#### Acceso a la API

Documentación de la API: Visita /docs para explorar los endpoints disponibles y su uso.

#### Obtención Automática de Datos

La aplicación recupera automáticamente los últimos precios de combustible del sitio web oficial del gobierno español dos veces al día para asegurar que la base de datos esté actualizada.

#### Documentación Scalar

La documentación detallada de la API se proporciona a través de Scalar. Explora y prueba los endpoints disponibles a través de la documentación en /docs.

## License

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](./LICENSE) para más detalles.

## Contribución

¡Las contribuciones son bienvenidas! Por favor, consulta nuestro archivo [CONTRIBUTING.md](./CONTRIBUTING.md) para instrucciones detalladas sobre cómo hacer fork el repositorio, crear una PR y asegurarte de que tu código se ajuste al estilo existente e incluya tests aadecuados.

## Contacto

Para cualquier pregunta o sugerencia, por favor abre una issue o contacta a [ismaelpzex@gmail.com](mailto:ismaelpzex@gmail.com).


## English.

FuelPriceSpainAPI is a Fastify-based RESTful API that provides up-to-date information on fuel prices at gas stations across Spain. This API is containerized using Docker and leverages PostgreSQL as its database. The application includes several endpoints for accessing fuel price data, which can be explored via the documentation available at `/docs`.

## Features

- **Real-Time Data**: Automatically fetches the latest fuel prices from the official Spanish government website twice a day.
- **Comprehensive Coverage**: Includes data from gas stations across all provinces in Spain.
- **Containerized**: Fully containerized using Docker for easy deployment and scalability.
- **Detailed Documentation**: API documentation is provided using Scalar, accessible at `/docs`.

## Prerequisites

- Docker
- Docker Compose
- Make

## Getting Started

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/ismaelpzex/fuel-price-spain-api.git
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

API Documentation: Visit /docs to explore available endpoints and their usage.

#### Automatic Data Fetch

The application automatically fetches the latest fuel prices from the official Spanish government website twice a day to ensure the database is up-to-date.

#### Scalar Documentation

Detailed API documentation is provided through Scalar. Explore and test the available endpoints via the documentation at /docs.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please refer to our [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed instructions on how to fork the repository, create a pull request, and ensure your code adheres to the existing style and includes appropriate tests.

## Contact

For any questions or suggestions, please open an issue or contact [ismaelpzex@gmail.com](mailto:ismaelpzex@gmail.com).

## Topics

### English

- Fuel Price API
- Gasoline Price API
- Fuel Price Data
- Fuel Price Lookup
- Gasoline Price Lookup
- Fuel Pricing Information
- Gas Station Prices
- Fuel Cost API
- Petrol Price API
- Diesel Price API
- Gas Price API Spain
- Spain Fuel Prices
- Spanish Fuel Prices
- Gas Stations Spain
- Fuel Stations Spain
- Fuel Price Data Spain
- Gasoline Stations Spain
- Diesel Stations Spain
- Fuel Prices by Region Spain
- Gas Prices by Province Spain
- RESTful API
- Fastify API
- JSON API
- API Integration
- Real-Time Fuel Data
- API Endpoints
- API Documentation
- Web API
- API Data Access
- API Development
- API for Developers
- Node.js API
- Fuel Price Tracking
- Fuel Price Updates
- Real-Time Gas Prices
- Gasoline Cost Tracker
- Diesel Cost Tracker
- Fuel Price Comparison Tool
- Find Gas Prices
- Compare Fuel Prices
- Fuel Price Alerts
- Location-Based Fuel Prices
- For Developers
- For Businesses
- Fuel Price API for Apps
- Fuel Price Data for Websites
- Fuel Pricing for Enterprises
- Energy Management API
- Fuel Cost Management
- Fleet Management Fuel Prices
- Easy API Integration
- Accurate Fuel Prices
- Reliable Fuel Data
- Fast API Response
- Scalable Fuel API
- Fuel API for Mobile Apps
- Fuel API for Web Services
- Customizable Fuel Pricing API
- Fuel Price Trends
- Fuel Price Insights
- Gasoline Price Trends
- Diesel Price Insights
- Fuel Market Data
- Fuel Economy
- Energy Prices
- Gasoline Cost Trends
- Diesel Cost Trends
- Best Fuel Price API
- Top Fuel Price API
- Fuel Price API for Developers
- Reliable Gas Price Data
- Comprehensive Fuel Price API
- Efficient Fuel Pricing Solution
- Affordable Fuel Data API
- Innovative Fuel Price API
- Fuel Price API for Startups
- Fuel Price API for Developers
- Industry-Leading Fuel Price API
- Fast Fuel Price Updates
- Accurate Gas Price Information
- Nationwide Fuel Price Coverage
- Advanced Fuel Price API

### Español

- API de Precios de Combustible
- API de Precios de Gasolina
- Datos de Precios de Combustible
- Consulta de Precios de Combustible
- Consulta de Precios de Gasolina
- Información sobre Precios de Combustible
- Precios de Gasolineras
- API de Costo de Combustible
- API de Precio de Petróleo
- API de Precio de Diésel
- API de Precios de Gas en España
- Precios de Combustible en España
- Precios de Combustible en España
- Gasolineras en España
- Estaciones de Combustible en España
- Datos de Precios de Combustible en España
- Estaciones de Gasolina en España
- Estaciones de Diésel en España
- Precios de Combustible por Región en España
- Precios de Gas por Provincia en España
- API RESTful
- API Fastify
- API JSON
- Integración de API
- Datos de Combustible en Tiempo Real
- Endpoints de API
- Documentación de API
- API Web
- Acceso a Datos de API
- Desarrollo de API
- API para Desarrolladores
- API Node.js
- Seguimiento de Precios de Combustible
- Actualizaciones de Precios de Combustible
- Precios de Gas en Tiempo Real
- Rastreador de Costo de Gasolina
- Rastreador de Costo de Diésel
- Herramienta de Comparación de Precios de Combustible
- Encontrar Precios de Gas
- Comparar Precios de Combustible
- Alertas de Precios de Combustible
- Precios de Combustible Basados en Ubicación
- Para Desarrolladores
- Para Empresas
- API de Precios de Combustible para Aplicaciones
- Datos de Precios de Combustible para Sitios Web
- Precios de Combustible para Empresas
- API de Gestión de Energía
- Gestión de Costos de Combustible
- Precios de Combustible para Gestión de Flotas
- Integración de API Fácil
- Precios de Combustible Precisos
- Datos de Combustible Fiables
- Respuesta Rápida de API
- API de Combustible Escalable
- API de Combustible para Aplicaciones Móviles
- API de Combustible para Servicios Web
- API de Precios de Combustible Personalizable
- Tendencias de Precios de Combustible
- Perspectivas de Precios de Combustible
- Tendencias de Precios de Gasolina
- Perspectivas de Precios de Diésel
- Datos del Mercado de Combustible
- Economía de Combustible
- Precios de Energía
- Tendencias de Costo de Gasolina
- Tendencias de Costo de Diésel
- Mejor API de Precios de Combustible
- API de Precios de Combustible Más Popular
- API de Precios de Combustible para Desarrolladores
- Datos Fiables de Precios de Gas
- API de Precios de Combustible Integral
- Solución Eficiente de Precios de Combustible
- API de Datos de Combustible Asequible
- API de Precios de Combustible Innovadora
- API de Precios de Combustible para Nuevas Empresas
- API de Precios de Combustible para Desarrolladores
- API de Precios de Combustible Líder en la Industria
- Actualizaciones Rápidas de Precios de Combustible
- Información Precisa sobre Precios de Gas
- Cobertura Nacional de Precios de Combustible
- API Avanzada de Precios de Combustible


