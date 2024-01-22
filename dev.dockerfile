FROM ruby:3.3.0

WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle install

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
