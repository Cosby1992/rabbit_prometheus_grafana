# RabbitMQ Prometheus Grafana

This project provides an example setup demonstrating the integration of **RabbitMQ**, **Prometheus**, and **Grafana** using **Docker** and **Docker Compose**. It showcases how to monitor RabbitMQ metrics in real-time through Prometheus and visualize them with Grafana.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

```
├── docker-compose.yml   # Docker Compose file to set up RabbitMQ, Prometheus, and Grafana
├── prometheus.yml       # Prometheus configuration to scrape RabbitMQ metrics
└── grafana/             # Grafana setup with custom dashboards and data source
```

## Components

- **RabbitMQ**: A widely used message broker to handle message queues.
- **Prometheus**: A time-series database and monitoring system that scrapes metrics from RabbitMQ.
- **Grafana**: A visualization tool to create custom dashboards for monitoring metrics.

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd rabbitmq-prometheus-grafana
   ```

2. Start the services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the services:
   - **RabbitMQ Management Console**: [http://localhost:15672](http://localhost:15672)
   - **Prometheus Dashboard**: [http://localhost:9090](http://localhost:9090)
   - **Grafana Dashboard**: [http://localhost:3000](http://localhost:3000)

4. **Grafana Setup**:
   - Login to Grafana with default credentials (`admin`/`admin`).
   - Configure the Prometheus data source if not pre-configured.
   - Import or create dashboards to visualize RabbitMQ metrics.

## Configuration Details

- **Prometheus**: The `prometheus.yml` file is configured to scrape metrics from RabbitMQ's exporter endpoint.
- **Grafana**: This project includes sample dashboards to visualize RabbitMQ metrics. Dashboards can be further customized as needed.

## RabbitMQ Metrics

Prometheus scrapes various RabbitMQ metrics, including:
- Queue lengths
- Message rates
- Connection statistics
- Consumer metrics

These metrics provide insights into the performance and health of your RabbitMQ instance.

## Stopping the Services

To stop and remove the services, run:
```bash
docker-compose down
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Enjoy monitoring RabbitMQ with Prometheus and Grafana!