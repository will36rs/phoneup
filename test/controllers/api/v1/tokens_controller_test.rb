# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class TokensControllerTest < ActionDispatch::IntegrationTest
      test 'should get token' do
        fake_response = OpenStruct.new(result: { identity: 'test_identity', token: 'test_token' })

        GetTwilioToken.stubs(:call).returns(fake_response) do
          get api_v1_token_url

          assert_response :success
          json_response = response.parsed_body

          assert_equal 'test_identity', json_response['identity']
          assert_equal 'test_token', json_response['token']
        end
      end
    end
  end
end
