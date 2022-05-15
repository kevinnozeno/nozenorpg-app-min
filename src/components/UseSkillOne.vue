<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Choisir la cible</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-radio-group
            @update:modelValue="targetSelected = $event"
            :modelValue="targetSelected">
          <ion-item v-for="target in targets" :key="target.id">
            <ion-label>{{ target.name }}</ion-label>
            <ion-radio :value="target"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>
    </ion-content>
    <ion-footer collapse="fade">
      <ion-toolbar>
        <ion-button color="primary" expand="full" @click="use()" :disabled="targetSelected === null"><strong>Utiliser</strong></ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonList,
  IonItem,
  IonLabel,
  modalController
} from "@ionic/vue";
import axios from "axios";

export default {
  name: "UseSkillOne.vue",
  data () {
    return {
      targetSelected: null
    }
  },
  props: {
    player: Object,
    skill: Object,
    targetsProps: [Array, Object]
  },
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonItem,
    IonLabel
  },
  computed: {
    targets () {
      return this.targetsProps.map((target) => {
        target.isChecked = false
        return target
      })
    }
  },
  methods: {
    async use () {
      await axios.post(process.env.VUE_APP_URL + "/api/roomables/" + this.player.pivot.id + "/use/" + this.skill.slug, {
        target: this.targetSelected.pivot.id
      })
      .finally(() => {
        modalController.dismiss();
      })
    }
  }
};
</script>
