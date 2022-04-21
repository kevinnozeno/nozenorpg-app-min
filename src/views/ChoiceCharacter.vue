<template>
  <section class="login-form">
    <ion-card>
      <ion-card-header>
        <ion-card-title>Choix du personnage</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-select placeholder="Choisir un personnage..." v-model="characterSelected">
          <ion-select-option v-for="(character) in characters" :key="character.id" :value="character.id">{{ character.name }} (Level {{ character.pivot.level }})</ion-select-option>
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
    const characters = ref(JSON.parse(localStorage.getItem('user')).characters)
    const getCharacter = async () => {
      console.log(characterSelected)
      return await axios
          .get('http://127.0.0.1:8000/api/characters/' + characterSelected.value)
          .then((response) => {
            console.log(response.data)
            localStorage.setItem( 'character', JSON.stringify(response.data) )
            context.emit("select", JSON.stringify(response.data))
          })
    };
    return  {
      characterSelected,
      characters,
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
