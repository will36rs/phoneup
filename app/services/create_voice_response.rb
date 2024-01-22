# frozen_string_literal: true

class CreateVoiceResponse < Patterns::Service
  def initialize(to:) # rubocop:disable Lint/MissingSuper
    @to = to
  end

  def call
    twiml.to_s
  end

  private

  def twiml
    return incoming_call if incoming_call?
    return outgoing_call if outgoing_call?

    unanswered_call
  end

  def incoming_call?
    @to.present? && @to == ENV['TWILIO_CALLER_ID']
  end

  def outgoing_call?
    @to.present? && @to != ENV['TWILIO_CALLER_ID']
  end

  def incoming_call
    Twilio::TwiML::VoiceResponse.new do |r|
      r.dial do |d|
        d.client identity: ENV.fetch('APP_DEFAULT_CALLER_IDENTITY', nil)
      end
    end
  end

  def outgoing_call
    Twilio::TwiML::VoiceResponse.new do |r|
      r.dial(caller_id: ENV.fetch('TWILIO_CALLER_ID', nil)) do |d|
        if /^[\d+\-() ]+$/.match?(@to)
          d.number @to
        else
          d.client identity: @to
        end
      end
    end
  end

  def unanswered_call
    Twilio::TwiML::VoiceResponse.new do |r|
      r.say(message: 'Thank you for calling!')
    end
  end
end
