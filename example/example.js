console.log("Example project started");
import amqp from "amqplib";

const queues = {
  direct1: { name: "direct_q_1", routingKey: "direct1.key" },
  direct2: { name: "direct_q_2", routingKey: "direct2.key" },
  fanout1: { name: "fanout_q_1", routingKey: "" },
  fanout2: { name: "fanout_q_2", routingKey: "" },
  fanout3: { name: "fanout_q_3", routingKey: "" },
};

const exchanges = {
  direct: "direct_x",
  fanout: "fanout_x",
};

const settings = {
  demoIterations: 50,
  messagesPerPublish: 12000,
  delayBetweenIterations: 20000, // 20 seconds
};

const start = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URI);

  const channel = await connection.createChannel();

  process.on("SIGTERM", () => {
    channel.close();
    connection.close();
  });
  process.on("SIGINT", () => {
    channel.close();
    connection.close();
  });

  await channel.assertQueue(queues.direct1.name, { durable: true });
  await channel.assertQueue(queues.direct2.name, { durable: true });
  await channel.assertQueue(queues.fanout1.name, { durable: true });
  await channel.assertQueue(queues.fanout2.name, { durable: true });
  await channel.assertQueue(queues.fanout3.name, { durable: true });

  await channel.assertExchange(exchanges.direct, "direct", { durable: true });
  await channel.assertExchange(exchanges.fanout, "fanout", { durable: true });

  // Bind queues to the direct exchange
  await channel.bindQueue(
    queues.direct1.name,
    exchanges.direct,
    queues.direct1.routingKey
  );
  await channel.bindQueue(
    queues.direct2.name,
    exchanges.direct,
    queues.direct2.routingKey
  );

  // Bind queues to the fanout exchange
  await channel.bindQueue(queues.fanout1.name, exchanges.fanout, "");
  await channel.bindQueue(queues.fanout2.name, exchanges.fanout, "");
  await channel.bindQueue(queues.fanout3.name, exchanges.fanout, "");

  console.log("Registering consumers");
  // Consumer gets own connection and channel
  const consumerConnection = await amqp.connect(process.env.RABBITMQ_URI);
  const consumerChannel = await consumerConnection.createChannel();
  await registerConsumers(consumerChannel);

  for (let iteration = 0; iteration < settings.demoIterations; iteration++) {
    const messages = new Array(settings.messagesPerPublish).fill({
      name: `message${iteration}`,
    });

    console.log(`Publishing ${messages.length} messages...`);
    messages.forEach((message) => {
      const config = getRandomRoute();
      channel.publish(
        config.exchange,
        config.routingKey,
        Buffer.from(JSON.stringify(message))
      );
    });

    await new Promise((resolve) =>
      setTimeout(resolve, settings.delayBetweenIterations)
    );
  }

  console.log("Closing connections");
  channel.close();
  consumerChannel.close();
  connection.close();

  console.log("Example project stopped");
};

const getRandomRoute = () => {
  // choose random queue
  const queueEntries = Object.values(queues);
  const randomQueueIndex = Math.floor(Math.random() * queueEntries.length);
  const randomQueue = queueEntries[randomQueueIndex];

  return {
    routingKey: randomQueue.routingKey,
    exchange:
      randomQueue.routingKey === "" ? exchanges.fanout : exchanges.direct,
  };
};

const registerConsumers = async (channel) => {
  channel.prefetch(10);
  try {
    // Assert and consume from each queue
    for (const queue of Object.values(queues)) {
      channel.consume(
        queue.name,
        async (msg) => {
          if (msg == null) return;
            await new Promise((resolve) => setTimeout(resolve, 20));
            channel.ack(msg);
        },
        { noAck: false }
      );
    }
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

await start();
