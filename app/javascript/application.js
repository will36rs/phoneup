// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import { Device } from "@twilio/voice-sdk"

let device
let identity
let token
const receiver = document.getElementById("receiver")
const callButton = document.getElementById("call")
const hangupButton = document.getElementById("hangup")
const status = document.getElementById("status")

callButton.addEventListener("click", (event) => {
    event.preventDefault()
    makeCall()
})

hangupButton.addEventListener("click", (event) => {
    event.preventDefault()
    cancelCall()
})

fetch(new Request("/api/v1/token"))
    .then((response) => response.json())
    .then((data) => {
        identity = data.identity
        token = data.token
        initializeDevice()
    })

function initializeDevice() {
    device = new Device(token, {
        appName: "Phone Up",
        closeProtection: true,
        enableImprovedSignalingErrorPrecision: true
    })

    device.register()

    device.on("registered", () => {
        receiver.disabled = false
        callButton.disabled = false
    })
}

async function makeCall() {
    let call = await device.connect({
        params: {
            To: receiver.value
        }
    })

    call.on("ringing", hasEarlyMedia => {
        status.innerText = 'Ringing...'
        callButton.disabled = true
        hangupButton.disabled = false
    })

    call.on("accept", call => {
        status.innerText = 'Accepted'
        callButton.disabled = true
        hangupButton.disabled = false
    })

    call.on("reject", () => {
        status.innerText = 'Rejected'
        callButton.disabled = false
        hangupButton.disabled = true
    })

    call.on("cancel", () => {
        status.innerText = 'Canceled'
        callButton.disabled = false
        hangupButton.disabled = true
    })

    call.on("disconnect", call => {
        status.innerText = 'Disconnected'
        callButton.disabled = false
        hangupButton.disabled = true
    })
}

function cancelCall() {
    device.disconnectAll()
    callButton.disabled = false
    hangupButton.disabled = true
}
