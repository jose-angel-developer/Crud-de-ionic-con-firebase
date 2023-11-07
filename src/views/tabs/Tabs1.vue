<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Estudiantes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-input v-model="estudiante.nombre" label="Nombre" color="warning" label-placement="stacked"
              maxlength="30" counter fill="outline" shape="round" clear-input="true" placeholder="Nombre y Apellido">
            </ion-input>
            <br>
            <ion-input v-model="estudiante.edad" label="Edad" color="warning" label-placement="stacked"
              fill="outline" type="number" shape="round" clear-input="true" placeholder="Edad">
            </ion-input>
            <br>
            <ion-input v-model="estudiante.correo" label="Correo Electronico" color="warning" label-placement="stacked"
              fill="outline" type="email" shape="round" clear-input="true" placeholder="Correo Electronico">
            </ion-input>
            <br>
            <ion-input v-model="estudiante.telefono" label="Telefono" color="warning" label-placement="stacked"
              maxlength="11" counter fill="outline" type="number" shape="round" clear-input="true"
              placeholder="Numero de Telefono">
            </ion-input>
            <br>
            <ion-button shape="round" color="warning" expand="block" @click="addStudent">
              <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
              Guardar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-toast :duration="2500" :message="toastMessage" :is-open="toastState" @didDismiss="toastState = false"
        :icon="informationCircleOutline">
      </ion-toast>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton,
  IonIcon, IonToast
} from '@ionic/vue';
import { checkmarkOutline, informationCircleOutline } from 'ionicons/icons';

// Importa las funciones de Firebase necesarias
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/services/firebase.service.js";

export default {
  name: 'AddStudent',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton, IonIcon,
    IonToast
  },
  data() {
    return {
      checkmarkOutline,
      informationCircleOutline,

      // Variable para guardar contenido del formulario
      estudiante: {},
      // Variable para controlar la visibilidad del toast
      toastState: false,
      // Variable para guardar el mensaje a mostrar
      toastMessage: null
    }
  },
  methods: {
    addStudent() {
      // Guardar el estudiante en Firebase (Firestore)
      addDoc(collection(firestore, 'estudiantes'), this.estudiante)
        .then((docRef) => {
          this.toastMessage = 'Estudiante guardado exitosamente con ID: ' + docRef.id;
          this.toastState = true;
          this.estudiante = {}; // Limpiar los campos del formulario
        })
        .catch((error) => {
          this.toastMessage = 'Error al guardar el estudiante: ' + error.message;
          this.toastState = true;
        });
    }
  }
}
</script>

<style scoped>
</style>
