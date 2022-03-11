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
      <ExploreContainer name="Tab 1 page" />
      {{ hasToken === true ? 'token récupéré' : 'token pas récupéré' }}
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { ref, onMounted } from "vue";
import axios from 'axios';

export default {
  name: "Tab1",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  setup() {
    const hasToken = ref(false)
    const fetch = async () => {
      return await axios
        .post('http://127.0.0.1:8000/api/login', {
          username: "airdox2",
          password: "kevincanico"
        })
        .then((response) => {
          localStorage.token = response.data
          hasToken.value = !!localStorage.token
        })
    }
    onMounted(() => {
      fetch()
    })
    return  {
      hasToken,
      fetch
    }
  },
};
</script>
