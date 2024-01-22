# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    class VoicesControllerTest < ActionDispatch::IntegrationTest
      test 'should create voice response' do
        fake_response = OpenStruct.new(result: '<Response><Say>Hello</Say></Response>')

        CreateVoiceResponse.stubs(:call).returns(fake_response) do
          post api_v1_voices_url, params: { 'To' => '1234567890' }

          assert_response :success
          assert_equal fake_response.result, @response.body
          assert_equal 'application/xml', @response.content_type
        end
      end
    end
  end
end
