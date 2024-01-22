# frozen_string_literal: true

require 'test_helper'
require 'mocha/minitest'

class CreateVoiceResponseTest < ActiveSupport::TestCase
  def setup
    ENV['TWILIO_CALLER_ID'] = 'test_twilio_caller_id'
    ENV['APP_DEFAULT_CALLER_IDENTITY'] = 'test_caller_identity'
  end

  test 'call should return TwiML message for incoming call' do
    service = CreateVoiceResponse.new(to: 'test_twilio_caller_id')
    response = service.call

    assert_includes response, '<Client>'
    assert_includes response, 'test_caller_identity'
  end

  test 'call should return TwiML message for outgoing call' do
    service = CreateVoiceResponse.new(to: '1234567890')
    response = service.call

    assert_includes response, '<Dial callerId="test_twilio_caller_id">'
    assert_includes response, '<Number>'
    assert_includes response, '1234567890'
  end

  test 'call should return TwiML message for unanswered call' do
    service = CreateVoiceResponse.new(to: '')
    response = service.call

    assert_includes response, '<Say>'
    assert_includes response, 'Thank you for calling!'
  end
end
