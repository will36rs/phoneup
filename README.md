# Phone Up

A proof of concept for making phone calls through the browser using [Twilio Voice API](https://www.twilio.com/docs/voice).

## Stack

- [Ruby 3.3.0](https://www.ruby-lang.org/en/news/2023/12/25/ruby-3-3-0-released/)
- [Ruby on Rails 7.1.3](https://rubyonrails.org/2024/1/16/Rails-7-1-3-has-been-released)
- [PostgreSQL 16.1](https://www.postgresql.org/docs/release/16.1/)
- [Docker](https://docs.docker.com/get-docker/)
- [Twilio Voice API](https://www.twilio.com/docs/voice)

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
