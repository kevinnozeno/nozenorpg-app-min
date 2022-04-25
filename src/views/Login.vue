<template>
  <ion-page>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Formulaire de connexion</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <ion-label>Pseudo</ion-label>
          <ion-input
              type="text"
              name="form.username"
              v-model="form.username.value"
          />
        </ion-item>
        <ion-item>
          <ion-label>Mot de passe</ion-label>
          <ion-input
              type="password"
              name="form.password"
              v-model="form.password.value"
          />
        </ion-item>
      </ion-card-content>
    </ion-card>
    <ion-button @click="login">Se connecter</ion-button>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import {IonPage, IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton} from '@ionic/vue';
import {store} from '@/store/store'
import router from "@/router";

export default {
  name: "Login",
  components: {
    IonPage,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonCardContent,
    IonButton
  },
  setup() {
    const form = {
      username: ref(''),
      password: ref('')
    };
    const login = async () => {
      return await axios
          .post(process.env.VUE_APP_URL+'/api/login', {
            username: form.username.value,
            password: form.password.value
          })
          .then((response) => {
            store.commit('setUser', response.data)
            router.push('/choice-character')
          })
    };
    return  {
      form,
      login
    }
  },
};
</script>

<style scoped>
  .ion-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
