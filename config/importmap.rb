# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application'
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js'
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js'
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin '@twilio/voice-sdk', to: '@twilio--voice-sdk.js' # @2.10.1
pin 'charenc' # @0.0.2
pin 'crypt' # @0.0.2
pin 'is-buffer' # @1.1.6
pin 'loglevel' # @1.6.7
pin 'md5' # @2.3.0
pin 'rtcpeerconnection-shim' # @1.2.8
pin 'sdp' # @2.12.0
pin 'events' # @3.3.0
