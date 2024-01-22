# frozen_string_literal: true

class GetTwilioToken < Patterns::Service
  def initialize
    super
    @account_sid = ENV.fetch('TWILIO_ACCOUNT_SID', nil)
    @api_key = ENV.fetch('TWILIO_API_KEY', nil)
    @api_secret = ENV.fetch('TWILIO_API_SECRET', nil)
    @outgoing_application_sid = ENV.fetch('TWILIO_TWIML_APP_SID', nil)
  end

  def call
    {
      identity:,
      token:
    }
  end

  private

  def grant
    grant = Twilio::JWT::AccessToken::VoiceGrant.new
    grant.outgoing_application_sid = @outgoing_application_sid
    grant.incoming_allow = true
    grant
  end

  def identity
    ENV.fetch('APP_DEFAULT_CALLER_IDENTITY', nil)
  end

  def token
    Twilio::JWT::AccessToken.new(
      @account_sid,
      @api_key,
      @api_secret,
      [grant],
      identity:
    ).to_jwt
  end
end
