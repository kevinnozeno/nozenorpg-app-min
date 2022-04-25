<template>
  <ion-page>
    <ion-tabs>
<!--      <ion-router-outlet></ion-router-outlet>-->
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/rooms/room1">
          <ion-icon :icon="triangle" />
          <ion-label>Room 1</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/rooms/room2">
          <ion-icon :icon="ellipse" />
          <ion-label>Room 2</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/rooms/room3">
          <ion-icon :icon="square" />
          <ion-label>Room 3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  // IonRouterOutlet
} from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Rooms',
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    // IonRouterOutlet
  },
  setup() {
    return  {
      ellipse,
      square,
      triangle
    }
  }
}
</script>
