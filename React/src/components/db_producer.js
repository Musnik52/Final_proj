const amqp = require("amqplib/callback_api");

const SendMsg = (input) => {
  const data = 30;
  const queue_name = 'rpc_queue';

  if (data.length === 0) {
    console.log("No data recieved");
    process.exit(1);
  }

  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (error2, q) {
          if (error2) {
            throw error2;
          }
          const correlationId = generateUuid();

          console.log(` [x] Requesting (${data})`);

          channel.consume(
            q.queue,
            function (msg) {
              if (msg.properties.correlationId === correlationId) {
                console.log(` [.] Got ${msg.content.toString()}`);
                setTimeout(function () {
                  connection.close();
                  process.exit(0);
                }, 500);
              }
            },
            {
              noAck: true,
            }
          );

          channel.sendToQueue(queue_name, Buffer.from(data.toString()), {
            correlationId: correlationId,
            replyTo: q.queue,
          });
        }
      );
    });
  });

  function generateUuid() {
    return (
      Math.random().toString() +
      Math.random().toString() +
      Math.random().toString()
    );
  }
};
SendMsg()
export default SendMsg;