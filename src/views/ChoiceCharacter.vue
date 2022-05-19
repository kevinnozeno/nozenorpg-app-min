<template>
  <ion-page>
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
  </ion-page>
</template>

<script>
import {computed, ref} from "vue";
import axios from "axios";
import {IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonSelect, IonSelectOption} from '@ionic/vue';
import {store} from "@/store/store";
import router from "@/router";

export default {
  name: "ChoiceCharacter",
  components: {
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonSelect,
    IonSelectOption
  },
  setup() {
    const characterSelected = ref(0)
    const user = computed(() => store.getters.getUser)
    const getCharacter = async () => {
      return await axios
          .get('users/' + user.value.id + '/characters/' + characterSelected.value )
          .then((response) => {
            store.commit('setCharacter', response.data)
            router.push('/rooms/')
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
  .ion-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: white;
  }
</style>
