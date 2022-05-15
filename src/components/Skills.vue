<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Compétences</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-row class="ion-justify-content-around ion-align-items-center" v-for="skill in skills" :key="skill.id">
        <ion-col>
          <ion-button :style="'--background:' + skill.color" expand="full" :disabled="skill.disabled" @click="skill.type === 'me' ? use(skill) : target(skill)">
            <strong>{{ skill.name }}</strong>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonButton,
  modalController
} from "@ionic/vue";
import UseSkillOne from "@/components/UseSkillOne.vue";
import UseSkillMulti from "@/components/UseSkillMulti.vue";
import axios from "axios";

export default {
  name: "Skills.vue",
  props: {
    player: Object,
    skills: [Array, Object],
    targets: [Array, Object],
  },
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonRow,
    IonCol,
    IonButton
  },
  methods: {
    async target (skill) {
      const modal = await modalController.create({
        component: skill.type === 'one' ? UseSkillOne : UseSkillMulti,
        componentProps: {
          player: this.player,
          skill: skill,
          targetsProps: this.targets
        },
        swipeToClose: true
      });

      modal.onDidDismiss().then(data => {
        modalController.dismiss()
      });

      return modal.present();
    },
    async use (skill) {
      await axios.post(process.env.VUE_APP_URL + "/api/roomables/" + this.player.pivot.id + "/use/" + skill.slug)
      .finally(() => {
        modalController.dismiss()
      })
    }
  },
};
</script>
