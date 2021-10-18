import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb_qNV2Umw-eN4uAWfSd1uyYX2qrP76tY",
  authDomain: "smartapp-60069.firebaseapp.com",
  projectId: "smartapp-60069",
  storageBucket: "smartapp-60069.appspot.com",
  messagingSenderId: "890851066011",
  appId: "1:890851066011:web:fa223dcc77990fc9fe063e",
  measurementId: "G-KV204JVYN2",
};

Vue.use(firestorePlugin);
Vue.config.productionTip = false;
Vue.prototype.$fb = firebase;
Vue.prototype.$db = firebase.initializeApp(firebaseConfig).firestore();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
