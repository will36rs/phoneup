# Phone Up

A proof of concept for making phone calls through the browser using [Twilio Voice API](https://www.twilio.com/en-us/voice).

## Run

1. Ensure [Docker](https://docs.docker.com/get-docker/) is running.
2. Copy [`.env.example`](.env.example) to `.env`.
   ```shell
   cp .env.example .env
   ```
3. Run the application container.
   ```shell
   docker compose up app
   ```
4. Browse to http://localhost:3000/.
   ```shell
   open http://localhost:3000/
   ```
5. Stop the application container.
   ```shell
   docker compose down
   ```
