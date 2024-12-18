# RabbitMQ Prometheus Grafana Example

This project demonstrates an example setup for integrating **RabbitMQ**, **Prometheus**, and **Grafana** using **Docker** and **Docker Compose**. The project showcases how to monitor RabbitMQ metrics in real-time through Prometheus and visualize them with Grafana.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

```
├── docker-compose.yml               # Docker Compose file to set up RabbitMQ, Prometheus, and Grafana
├── .env                              # Environment variables for Docker Compose
├── prometheus/
│   ├── prometheus.yml                # Prometheus configuration to scrape RabbitMQ metrics
├── grafana/
│   ├── grafana.ini                   # Grafana main configuration file
│   ├── provisioning/
│   │   ├── datasources/
│   │   │   └── datasource.yml        # Configures Prometheus as Grafana data source
│   │   └── dashboards/
│   │       └── dashboard.yml         # Dashboard provisioning configuration
│   └── dashboards/
│       └── rabbitmq-dashboard.json   # Preconfigured RabbitMQ dashboard for Grafana
├── example/
│   └── example.js                    # Example project to simulate RabbitMQ activity
```

## Components

- **RabbitMQ**: A message broker used to handle message queues.
- **Prometheus**: A time-series database and monitoring system that scrapes metrics from RabbitMQ.
- **Grafana**: A visualization tool for monitoring and analyzing metrics on custom dashboards.
- **Example Project**: A sample Node.js application to simulate RabbitMQ activity, showcasing real-time metrics.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd rabbitmq-prometheus-grafana
   ```

2. Create a .env file from example.env:

   - Set Grafana credentials in the .env file.
   - RabbitMQ URI is already provided in example.env (using the default user from rabbitmq.conf), but you can update it if needed.

3. Start the services with Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. Access the services:

   - **RabbitMQ Management Console**: [http://localhost:15672](http://localhost:15672)
   - **Prometheus Dashboard**: [http://localhost:9090](http://localhost:9090)
   - **Grafana Dashboard**: [http://localhost:3000](http://localhost:3000)

5. **Grafana Setup**:
   - Login to Grafana with credentials defined in the `.env` file.
   - The Prometheus data source is pre-configured to fetch RabbitMQ metrics.
   - A RabbitMQ metrics dashboard is automatically loaded; you can customize it as needed.

## Configuration Details

- **Prometheus**: Configured in `prometheus/prometheus.yml` to scrape RabbitMQ metrics from the Prometheus-compatible endpoint exposed by RabbitMQ.
- **Grafana**: Includes a sample RabbitMQ dashboard to monitor metrics like queue lengths, message rates, and connections. The dashboard and Prometheus data source are automatically provisioned from the `grafana/provisioning` directory.
- **Example Project**:
  - Publishes messages to RabbitMQ using both **direct** and **fanout** exchanges.
  - Consumes messages from multiple queues.
  - Demonstrates how RabbitMQ queues and exchanges operate under load.

## RabbitMQ Metrics

The dashboard includes key RabbitMQ metrics, such as:

- **Queue Lengths**: Tracks the number of messages in queues.
- **Message Rates**: Monitors publish, deliver, and acknowledgment rates.
- **Connections and Channels**: Shows the number of open connections and active channels.
- **Consumers**: Displays active consumer counts.

These metrics provide insights into the performance and health of the RabbitMQ instance. Running the example project will populate these metrics in real-time.

## Stopping the Services

To stop and remove the services, run:

```bash
docker-compose down
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
