<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Estudiantes</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Estudiantes</ion-card-title>
                  <ion-card-subtitle>Listado de estudiantes</ion-card-subtitle>
                </ion-card-header>
  
                <ion-card-content>
                  <ion-list>
                    <!-- Iterar a través de la lista de estudiantes -->
                    <template v-for="estudiante in estudiantes" :key="estudiante.id">
                      <ion-item>
                        <ion-icon slot="start" :icon="personCircle"></ion-icon>
                        <ion-label>{{ estudiante.nombre }}</ion-label>
                        <ion-buttons slot="end">
                          <!-- Mostrar detalles del estudiante en un modal -->
                          <ion-button color="tertiary" @click="showStudent(estudiante.id, 1)">
                            <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                          </ion-button>
                          <!-- Editar los detalles del estudiante en un modal -->
                          <ion-button color="success" @click="showStudent(estudiante.id, 2)">
                            <ion-icon slot="icon-only" :icon="create"></ion-icon>
                          </ion-button>
                          <!-- Eliminar al estudiante -->
                          <ion-button color="danger" @click="deleteStudent(estudiante.id)">
                            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                          </ion-button>
                        </ion-buttons>
                      </ion-item>
                    </template>
  
                    <!-- Mostrar un mensaje en caso de no tener estudiantes -->
                    <ion-item v-if="estudiantes.length === 0">
                      <ion-icon slot="start" :icon="closeCircle"></ion-icon>
                      <ion-label>No hay registros</ion-label>
                    </ion-item>
                  </ion-list>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
  
        <!-- Modal para detalles de estudiante -->
        <ion-modal :is-open="modalState" @didDismiss="modalState=false">
          <ion-header>
            <ion-toolbar>
              <ion-title>Información del estudiante</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="modalState=false">
                  <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-list>
              <ion-item>
                <ion-icon slot="start" :icon="personCircle"></ion-icon>
                <ion-label>{{ estudiante.nombre }}</ion-label>
              </ion-item>
  
              <ion-item>
                <ion-icon slot="start" :icon="checkmark"></ion-icon>
                <ion-label>{{ estudiante.edad }}</ion-label>
              </ion-item>
  
              <ion-item>
                <ion-icon slot="start" :icon="mailOutline"></ion-icon>
                <ion-label>{{ estudiante.correo }}</ion-label>
              </ion-item>
  
              <ion-item>
                <ion-icon slot="start" :icon="call"></ion-icon>
                <ion-label>{{ estudiante.telefono }}</ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-modal>
  
           <!-- Modal para editar estudiante -->
           <ion-modal :is-open="modalState2" @didDismiss="modalState2=false">

            <ion-header>
              <ion-toolbar>
                <ion-title>Editar estudiante</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="modalState2=false">
                    <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <br>
            <ion-content class="ion-padding">
              <ion-input
                color="warning"
                label-placement="stacked"
                label="Nombre"
                maxlength="30"
                counter
                fill="outline"
                shape="round"
                clear-input="true"
                placeholder="Nombre y Apellido"
                :value="estudiante.nombre"
                @input="estudiante.nombre = $event.target.value"
              ></ion-input>
            <br>
            <ion-input
              :value="estudiante.edad"
              @input="estudiante.edad = $event.target.value"
              color="warning"
              label-placement="stacked"
              fill="outline"
              type="number"
              shape="round"
              clear-input="true"
              placeholder="Edad"
              label="Edad" 
            ></ion-input>
            <br>
            <ion-input
            label="Correo Electronico" 
              :value="estudiante.correo"
              @input="estudiante.correo = $event.target.value"
              color="warning"
              
              label-placement="stacked"
              fill="outline"
              type="email"
              shape="round"
              clear-input="true"
              placeholder="Correo Electronico"
            ></ion-input>
            <br>
            <ion-input
              :value="estudiante.telefono"
              @input="estudiante.telefono = $event.target.value"
              color="warning"
              label-placement="stacked"
              label="Telefono"
              maxlength="11"
              counter
              fill="outline"
              type="number"
              shape="round"
              clear-input="true"
              placeholder="Numero de Telefono"
            ></ion-input>
              <br>
              <ion-button shape="round"
              color="warning" expand="block" @click="editStudent(estudiante.id)"
              >
              <ion-icon slot="start" :icon="checkmarkOutline" ></ion-icon>
              Guardar Cambios
              </ion-button>
            </ion-content>
          </ion-modal>
  
  
        <ion-toast :duration="2500" :message="toastMessage" :is-open="toastState" @didDismiss="toastState=false" :icon="informationCircleOutline"></ion-toast>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonIcon, IonButtons, IonButton, IonLabel, IonModal, IonToast } from '@ionic/vue';
  import { personCircle, eye, create, trash, closeCircle, checkmark, call, mailOutline } from 'ionicons/icons';
  
  // Importa las funciones de Firebase necesarias
  import { firestore } from "@/services/firebase.service.js";
  import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
  
  export default {
    name: 'Student',
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonIcon, IonButtons, IonButton, IonLabel, IonModal, IonToast
    },
    data() {
      return {
        personCircle, eye, create, trash, closeCircle, checkmark, call, mailOutline,
        estudiantes: [],
        modalState: false,
        modalState2: false,
        estudiante: {},
        toastState: false,
        toastMessage: null,
      };
    },
    methods: {
      loadData() {
        // Cargar datos de estudiantes desde Firebase Firestore
        const estudiantesRef = collection(firestore, 'estudiantes');
        getDocs(estudiantesRef).then((querySnapshot) => {
          const estudiantes = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            estudiantes.push({ id: doc.id, ...data });
          });
          this.estudiantes = estudiantes;
        });
      },
  
      showStudent(id, action) {
        // Mostrar detalles o formulario de edición para un estudiante
        if (action === 1) {
          this.modalState = true; // Abrir el modal de detalles
        } else {
          this.modalState2 = true; // Abrir el modal de edición
  
          // Buscar el estudiante en la lista de estudiantes por ID
          const selectedStudent = this.estudiantes.find(student => student.id === id);
          if (selectedStudent) {
            // Copiar los datos del estudiante seleccionado al objeto estudiante
            this.estudiante = { ...selectedStudent };
          }
        }
      },
  
      editStudent() {
        // Actualizar los datos del estudiante en Firestore
        const estudianteRef = doc(firestore, 'estudiantes', this.estudiante.id);
        const estudianteData = {
          nombre: this.estudiante.nombre,
          edad: this.estudiante.edad,
          correo: this.estudiante.correo,
          telefono: this.estudiante.telefono
        };
  
        updateDoc(estudianteRef, estudianteData)
          .then(() => {
            this.toastState = true;
            this.toastMessage = "Estudiante actualizado con éxito";
            this.loadData(); // Volver a cargar la lista de estudiantes
            this.modalState2 = false; // Cerrar el modal de edición
          })
          .catch((error) => {
            console.error("Error al actualizar estudiante:", error);
          });
      },
  
      deleteStudent(id) {
        // Eliminar un estudiante de Firestore
        deleteDoc(doc(firestore, 'estudiantes', id))
          .then(() => {
            this.toastState = true;
            this.toastMessage = "Estudiante eliminado con éxito";
            this.modalState2 = false;
            this.loadData();
          })
          .catch((error) => {
            console.error("Error al eliminar estudiante: ", error);
          });
      },
    },
    ionViewWillEnter() {
      // Cargar datos cuando la vista esté a punto de mostrarse
      this.loadData();
    },
  };
  </script>
  
  <style scoped>
    /* Estilos CSS locales */
  </style>
  