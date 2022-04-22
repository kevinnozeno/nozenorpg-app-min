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
      character: JSON.parse(localStorage.getItem('character')),
      user: JSON.parse(localStorage.getItem('user'))
    };
  },
  methods: {
    async attack() {
      await axios.patch(process.env.VUE_APP_URL + "/api/characters/" + this.character.id + "/users/" +  this.character.user_id +"/attack", {
        target: this.boss
      })
    },
    async cast() {
      await axios.patch(process.env.VUE_APP_URL + "/api/characters/" + this.character.id + "/users/" +  this.character.user_id + "/cast", {
        target: this.boss
      })
    },
    async heal() {
      await axios.patch(process.env.VUE_APP_URL + "/api/characters/" + this.character.id + "/users/" +  this.character.user_id + "/heal", {
        target: this.character
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
    channel.bind('attack', function(response) { that.boss = response.data });
    channel.bind('cast', function(response) { that.boss = response.data });
    channel.bind('heal', function(response) {
      localStorage.setItem( 'character', JSON.stringify(response.data) )
      that.character = response.data
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
