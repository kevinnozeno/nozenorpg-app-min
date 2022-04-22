<template>
  <section class="login-form">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Choix du personnage</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-select placeholder="Choisir un personnage..." v-model="characterSelected">
          <ion-select-option v-for="(character) in user.characters" :key="character.id" :value="character.id">{{ character.name }} (Level {{ character.pivot.level }})</ion-select-option>
        </ion-select>
      </ion-card-content>
    </ion-card>
    <ion-button @click="getCharacter">Jouer</ion-button>
  </section>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonSelect, IonSelectOption} from '@ionic/vue';

export default {
  name: "ChoiceCharacter",
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonSelect,
    IonSelectOption
  },
  setup(props, context) {
    const characterSelected = ref(0)
    const user = ref(JSON.parse(localStorage.getItem('user')))
    const getCharacter = async () => {
      return await axios
          .get(process.env.VUE_APP_URL +'/api/characters/' + characterSelected.value + '/users/' + user.value.id)
          .then((response) => {
            localStorage.setItem( 'character', JSON.stringify(response.data) )
            context.emit("select", JSON.stringify(response.data))
          })
    };
    return  {
      characterSelected,
      user,
      getCharacter
    }
  }
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
