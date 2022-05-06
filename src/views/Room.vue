<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ room.name }}</ion-title>
      </ion-toolbar>
      <ion-row>
        <ion-col class="items-overflow" v-if="userCharacters">
          <ion-chip v-for="userCharacter in userCharacters" :key="userCharacter.id" :style="userCharacter.pivot.statistics.playing === true ? 'border: solid red 3px' : 'border: solid red 0px'">
            <ion-icon :icon="personCircleOutline" color="primary"></ion-icon>
            <ion-label>{{ userCharacter.name }}</ion-label>
          </ion-chip >
        </ion-col>
      </ion-row>
    </ion-header>
    <ion-content v-if="otherEntities">
      <ion-card v-for="otherEntity in otherEntities" :key="otherEntity.id">
        <ion-card-header>
          <ion-card-title>{{ otherEntity.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p><strong>{{ otherEntity.pivot.statistics.actualPv }} / {{ otherEntity.character.pv }} PV</strong></p>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-footer class="player">
      <ion-toolbar>
        <ion-title class="character-name" v-if="player">{{ player.name }} [{{ player.character.name }}] - Level {{ player.level }}</ion-title>
      </ion-toolbar>
      <div class="pv-infos">
        <span class="progress-bar" :style="'width:'+ this.pourcentagePv + '%'"></span>
        <ion-text>
          {{ character.roomActive.pivot.statistics.actualPv }} / {{ character.character.pv }} PV
        </ion-text>
      </div>
      <div class="resume-infos">
        <ion-img src="assets/icon.png"></ion-img>
        <div class="player-stats">
          <ion-item>
            <ion-label>AD</ion-label>
            <ion-note slot="end" color="primary">{{ character.character.ad }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label>AP</ion-label>
            <ion-note slot="end" color="primary">{{ character.character.ap }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-label>Heal</ion-label>
            <ion-note slot="end" color="primary">{{ character.character.heal }}</ion-note>
          </ion-item>
        </div>
<!--        <div class="player-actions">-->
<!--          <ion-button color="primary" @click="attack">Attaquer ({{ character.character.ad }})</ion-button>-->
<!--          <ion-button color="primary" @click="cast">Lancer un sort  ({{ character.character.ap }})</ion-button>-->
<!--          <ion-button color="primary" @click="heal">Soigner  ({{ character.character.heal }})</ion-button>-->
<!--        </div>-->
      </div>
      <div class="actions">
        <ion-button color="primary" expand="full" :disabled="!playing"><strong>Jouer</strong></ion-button>
        <ion-button color="warning" expand="full" @click="leave"><strong>Quitter</strong></ion-button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonChip,
  IonIcon,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonFooter,
  IonImg,
  IonText,
  IonItem,
  IonLabel,
  IonNote
} from "@ionic/vue";
import {
  personCircleOutline
} from 'ionicons/icons';
import {store} from "@/store/store";
import {computed} from "vue";
import axios from "axios";
import Pusher from "pusher-js";
import router from "@/router";

export default {
  name: "Room",
  props: {
    id: Number
  },
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonChip,
    IonIcon,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonFooter,
    IonImg,
    IonText,
    IonItem,
    IonLabel,
    IonNote
  },
  data () {
    return {
      url: process.env.VUE_APP_URL,
      pusherKey: process.env.VUE_APP_PUSHER_KEY,
      character: computed(() => store.getters.getCharacter),
      user: computed(() => store.getters.getUser),
      room: {},
      personCircleOutline
    }
  },
  computed : {
    userCharacters () {
      return this.room ? this.room.user_characters : this.character.roomActive
    },
    player () {
      return this.userCharacters ? this.userCharacters.find((userCharacter) => userCharacter.id === this.character.id) : null
    },
    playing () {
      return this.player ? this.player.pivot.statistics.playing === true : false
    },
    otherEntities () {
      return this.userCharacters ? this.userCharacters.filter((userCharacter) => {
        return userCharacter.id !== this.character.id
      }) : null
    },
    pourcentagePv () {
      const actualPv = this.character.roomActive.pivot.statistics.actualPv
      const pvMax = this.character.character.pv
      return (actualPv*100)/pvMax
    }
  },
  methods: {
    async attack() {
      await axios.patch(process.env.VUE_APP_URL + "/api/entity/1/action/1", {
        user_id: this.character.id,
        target_id: this.boss.id,
        target_type: 1
      })
    },
    async cast() {
      await axios.patch(process.env.VUE_APP_URL + "/api/entity/1/action/2", {
        user_id: this.character.id,
        target_id: this.boss.id,
        target_type: 1
      })
    },
    async heal() {
      await axios.patch(process.env.VUE_APP_URL + "/api/entity/1/action/3", {
        user_id: this.character.id,
        target_id: this.character.id,
        target_type: 1
      })
    },
    async getRoom () {
      await axios.get(process.env.VUE_APP_URL+ "/api/rooms/" + this.id).then((response) => {
        this.room = response.data
      })
    },
    leave () {
      router.push({path:'/rooms/', replace: true})
    }
  },
  mounted() {
    this.getRoom()
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
.ion-page {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 100%;
}

.ion-page strong {
  font-size: 20px;
  line-height: 26px;
}

.ion-page p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

.ion-page a {
  text-decoration: none;
}

.items-overflow {
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  row-gap: 50px;
  grid-auto-rows: minmax(50px, auto);
  justify-items: center;
  overflow-y: scroll;
  background: white;
}

ion-header ion-chip {
  min-width: 100px;
}

.player {
  background: white;
}

.player .character-name {
  font-weight: bold;
}

.player .pv-infos {
  display: flex;
  height: 50px;
  background: #f5f6f9;
  position: relative;
}

.player .pv-infos .progress-bar {
  background: #ff4961;
  /*width: 60%;*/
  height: 100%;
}

.player .pv-infos ion-text {
  position: absolute;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.player .resume-infos {
  display: flex;
}

.player .resume-infos ion-img {
  max-width: 150px;
}

.player .resume-infos .player-stats {
  width: 100%;
}

.player .actions {
  display: flex;
}

.player .actions ion-button {
  width: 100%;
  height: 80px;
  margin: 0;
}
</style>
