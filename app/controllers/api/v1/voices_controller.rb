# frozen_string_literal: true

module Api
  module V1
    class VoicesController < ApiController
      def create
        render xml: CreateVoiceResponse.call(to: params['To']).result
      end
    end
  end
end
