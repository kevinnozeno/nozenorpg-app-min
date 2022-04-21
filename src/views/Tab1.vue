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
      <ExploreContainer v-if="user && character" name="Tab 1 page"/>
      <ChoiceCharacter v-else-if="user && !character" @select="setCharacter"/>
      <CustomForm v-else @logged="setUser"/>
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
import ChoiceCharacter from "@/views/ChoiceCharacter";

export default {
  name: "Tab1",
  components: {
    ChoiceCharacter,
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    CustomForm
  },
  setup() {
    const user = ref(localStorage.getItem('user'))
    const character = ref(localStorage.getItem('character'))
    const setUser = (newUser) => {
      console.log(newUser)
      console.log(JSON.parse(localStorage.getItem('user')))
      user.value = JSON.parse(localStorage.getItem('user'))
    }
    const setCharacter = (newCharacter) => {
      console.log(newCharacter)
      console.log(JSON.parse(localStorage.getItem('character')))
      character.value = JSON.parse(localStorage.getItem('character'))
    }
    return  {
      user,
      character,
      setUser,
      setCharacter
    }
  },
};
</script>
