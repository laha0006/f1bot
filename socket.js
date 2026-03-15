import mqtt from "mqtt";
import { getToken } from "./login.js";

const accessToken = await getToken();
console.log("token: ", accessToken);

const websocketUrl = "wss://mqtt.openf1.org:8084/mqtt";

const options = {
    username: "tolana",
    password: accessToken,
};

const client = mqtt.connect(websocketUrl, options);

client.on("connect", function () {
    console.log("Connected to OpenF1 via Websockets");
    // client.subscribe("v1/location", function (err) {
    //     if (!err) {
    //         console.log("Subscribed to v1/location");
    //     } else {
    //         console.error("Subscription error for v1/location:", err);
    //     }
    // });
    // client.subscribe("v1/laps", function (err) {
    //     if (!err) {
    //         console.log("Subscribed to v1/laps");
    //     } else {
    //         console.error("Subscription error for v1/laps:", err);
    //     }
    // });
    client.subscribe("v1/race_control", function (err) {
        if (!err) {
            console.log("Subscribed to v1/race_control");
        } else {
            console.error("Subscription error for v1/race_control:", err);
        }
    });
    //client.subscribe("v1/race_control"); // Subscribe to all topics
});
client.on("message", function (topic, message) {
    //console.log(`Received on ${topic}: ${message.toString()}`);
    const data = JSON.parse(message.toString());
    console.log(topic, data.message);
});

client.on("error", function (error) {
    console.error("MQTT Connection Error:", error);
});

client.on("close", function () {
    console.log("MQTT Connection closed");
});

client.on("offline", function () {
    console.log("MQTT Client is offline");
});

client.on("reconnect", function () {
    console.log("MQTT Client is attempting to reconnect");
});
