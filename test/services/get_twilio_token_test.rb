# frozen_string_literal: true

require 'test_helper'

class GetTwilioTokenTest < ActiveSupport::TestCase
  def setup
    ENV['TWILIO_ACCOUNT_SID'] = 'test_sid'
    ENV['TWILIO_API_KEY'] = 'test_api_key'
    ENV['TWILIO_API_SECRET'] = 'test_api_secret'
    ENV['TWILIO_TWIML_APP_SID'] = 'test_twiml_app_sid'
    ENV['APP_DEFAULT_CALLER_IDENTITY'] = 'test_caller_identity'
  end

  test 'call should return token with correct structure' do
    Twilio::JWT::AccessToken.stubs(:to_jwt).returns('mocked_token') do
      service = GetTwilioToken.new
      result = service.call

      assert_equal 'test_caller_identity', result[:identity]
      assert_equal 'mocked_token', result[:token]
    end
  end
end
