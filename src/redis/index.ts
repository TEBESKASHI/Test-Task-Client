import Redis from 'ioredis';

enum RedisChannels {
  EVENT_CREATED = 'event-created',
  EVENT_DELETED = 'event-deleted',
}

const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

subscriber.on('connect', () => {
  console.log('Subscriber connected');
});

subscriber.subscribe(
  RedisChannels.EVENT_CREATED,
  RedisChannels.EVENT_DELETED,
  (err, count) => {
    if (err) {
      console.error('Failed to subscribe: %s', err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to event-created and event-deleted channel.`,
      );
    }
  },
);

export { subscriber, RedisChannels };
