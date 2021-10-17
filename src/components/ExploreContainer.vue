<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>
      Explore
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://ionicframework.com/docs/components"
        >UI Components</a
      >
    </p>
    <ion-button color="primary" @click="attack">Attack</ion-button>
    <ion-text color="primary">
      <p>Send to : {{ url }}</p>
    </ion-text>
    <ion-text color="primary">
      <p>{{ pv }}</p>
    </ion-text>
  </div>
</template>

<script>
import axios from "axios";
import Pusher from "pusher-js";

export default {
  name: "ExploreContainer",
  props: {
    name: String,
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      pv: 1000,
    };
  },
  methods: {
    async attack() {
      console.log(process.env.VUE_APP_TITLE)
      console.log(process.env.VUE_APP_URL)
      await axios.get(process.env.VUE_APP_URL+ "/api/attack");
    },
  },
  mounted() {
    Pusher.logToConsole = true;

    const pusher = new Pusher('9661c0bc705ce761260b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('channel');
    const that = this
    channel.bind('event', function(data) {
      console.log(data)
      console.log('passed')
      console.log(that.pv)
      that.pv -= data.damage;
    });
  }
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>