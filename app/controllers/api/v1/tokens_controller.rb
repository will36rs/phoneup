# frozen_string_literal: true

module Api
  module V1
    class TokensController < ApiController
      def show
        render json: GetTwilioToken.call.result
      end
    end
  end
end
