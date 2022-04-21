<template>
  <section class="login-form">
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
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import {IonLabel, IonInput, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton} from '@ionic/vue';

export default {
  name: "CustomForm",
  components: {
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonCardContent,
    IonButton
  },
  setup(props, context) {
    const form = {
      username: ref(''),
      password: ref('')
    };
    const login = async () => {
      return await axios
          .post('http://127.0.0.1:8000/api/login', {
            username: form.username.value,
            password: form.password.value
          })
          .then((response) => {
            console.log(response.data)
            localStorage.setItem( 'user', JSON.stringify(response.data) )
            context.emit("logged", JSON.stringify(response.data))
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
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
