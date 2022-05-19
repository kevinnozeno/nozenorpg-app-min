<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Choisir les cibles</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-row class="ion-justify-content-around ion-align-items-center" v-for="target in targets" :key="target.id">
        <ion-col size="3">
          <ion-text>{{ target.name }}</ion-text>
        </ion-col>
        <ion-col size="3">
          <ion-checkbox
              @update:modelValue="target.isChecked = $event"
              :modelValue="target.isChecked">
          </ion-checkbox>
        </ion-col>
      </ion-row>
      <ion-footer>
        <ion-toolbar>
          <ion-button color="primary" expand="full" @click="use()"><strong>Utiliser</strong></ion-button>
        </ion-toolbar>
      </ion-footer>
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
  IonFooter,
  IonText,
  IonRow,
  IonCol,
  IonButton,
  IonCheckbox, modalController
} from "@ionic/vue";
import axios from "axios";

export default {
  name: "UseSkillMulti.vue",
  props: {
    player: Object,
    skill: Object,
    targetsProps: [Array, Object]
  },
  computed: {
    targets () {
      return this.targetsProps.map((target) => {
        target.isChecked = false
        return target
      })
    },
    targetsSelected () {
      return this.targets ? this.targets.filter((target) => {
        return target.isChecked === true
      }) : null
    },
  },
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonText,
    IonRow,
    IonCol,
    IonButton,
    IonCheckbox
  },
  methods: {
    async use () {
      await axios.post("roomables/" + this.player.pivot.id + "/use/" + this.skill.slug, {
        target: this.targetSelected.pivot.id
      })
          .finally(() => {
            modalController.dismiss();
          })
    }
  }
};
</script>
