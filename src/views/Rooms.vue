<template>
  <ion-page>
    <section class="flex">
      <ion-card v-for="room in character.rooms" :key="room.id">
        <ion-card-header>
          <ion-card-title>{{ room.name }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-button color="primary" :href="'/rooms/' + room.id">Entrer</ion-button>
        </ion-card-content>
      </ion-card>
    </section>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";
import {store} from "@/store/store";
import {computed} from "vue";

export default {
  name: "Rooms",
  props: {
    id: Number
  },
  components: {
    IonPage,
    IonCardTitle,
    IonCardHeader,
    IonCardContent
  },
  data () {
    return {
      character: computed(() => store.getters.getCharacter)
    }
  },
  computed : {
    room () {
      return this.character.rooms.find(room => room.id === parseInt(this.id))
    }
  }
};
</script>
