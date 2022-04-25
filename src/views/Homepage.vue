<template>
  <ion-page>
    <ChoiceCharacter v-if="user && user.id" />
    <Login v-else />
  </ion-page>
</template>

<script>
import {
  IonPage
} from '@ionic/vue';
import {computed} from "vue";
import Login from "@/views/Login";
import ChoiceCharacter from "@/views/ChoiceCharacter";
import {store} from '@/store/store'

export default {
  name: "Homepage",
  components: {
    IonPage,
    ChoiceCharacter,
    Login
  },
  setup() {
    const user = computed(() => store.getters.getUser)
    return  {
      user
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
