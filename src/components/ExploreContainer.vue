<template>
  <section class="container">
    <div class="ennemies-part">
      <strong>{{ boss.name }}</strong>
      <ion-text color="primary">
        <p><strong>{{ boss.actual_pv }} / {{ boss.pv }} PV</strong></p>
      </ion-text>
    </div>
    <div class="players-part">
      <div class="player-stats">
        <strong>{{ character.name }}</strong>
        <ion-text color="primary">
          <p><strong>{{ character.actual_pv }} / {{ character.pv }} PV</strong></p>
        </ion-text>
      </div>
      <div class="player-actions">
        <ion-button color="primary" @click="attack">Attaquer ({{ character.ad }})</ion-button>
        <ion-button color="primary" @click="cast">Lancer un sort  ({{ character.ap }})</ion-button>
        <ion-button color="primary" @click="heal">Soigner  ({{ character.heal }})</ion-button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Pusher from "pusher-js";
import {
  IonButton,
  IonText
} from "@ionic/vue";

export default {
  name: "ExploreContainer",
  props: {
    name: String,
  },
  components: {
    IonButton,
    IonText
  },
  data() {
    return {
      url: process.env.VUE_APP_URL,
      boss: {},
      pusherKey: process.env.VUE_APP_PUSHER_KEY,
      character: JSON.parse(localStorage.getItem('character'))
    };
  },
  methods: {
    async attack() {
      await axios.post(process.env.VUE_APP_URL + "/api/attack", {
        target: this.boss.id,
        damage: this.character.ad
      })
    },
    async cast() {
      await axios.post(process.env.VUE_APP_URL + "/api/cast", {
        target: this.boss.id,
        damage: this.character.ap
      })
    },
    async heal() {
      await axios.post(process.env.VUE_APP_URL + "/api/heal", {
        target: this.boss.id,
        damage: this.character.heal
      })
    },
    async getBoss () {
      await axios.get(process.env.VUE_APP_URL+ "/api/characters/4/users/1").then((response) => {
        this.boss = response.data
      })
    }
  },
  mounted() {
    this.getBoss()
    Pusher.logToConsole = true;

    const pusher = new Pusher(this.pusherKey, {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('channel');
    const that = this
    channel.bind('event', function(data) {
      that.boss = data.target;
    });
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 100%;
}

.container strong {
  font-size: 20px;
  line-height: 26px;
}

.container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

.container a {
  text-decoration: none;
}
</style>
