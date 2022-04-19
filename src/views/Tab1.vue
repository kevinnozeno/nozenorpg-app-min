<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer v-if="token" name="Tab 1 page"/>
      <CustomForm v-else @logged="setToken"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import CustomForm from "@/views/CustomForm";

export default {
  name: "Tab1",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    CustomForm
  },
  setup() {
    const token = ref(localStorage.getItem('token'))
    const setToken = (newToken) => {
      console.log(newToken)
      console.log(localStorage.getItem('token'))
      token.value = localStorage.getItem('token')
    }
    return  {
      token,
      setToken
    }
  },
};
</script>
