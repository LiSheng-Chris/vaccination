<template>
  <div class="container">
    <h1 style="font-size: 40px; padding-top: 10%">Vaccination Reservation</h1>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <span class="col-2 inputLabel">Email :</span>
      <input class="col-3 form-control" type="text" v-model="email" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 2%">
      <span class="col-2 inputLabel">Password :</span>
      <input class="col-3 form-control" type="password" v-model="password" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <button type="button" class="col-2 btn btn-primary" @click="login">
        Login
      </button>
    </div>
    <div class="row justify-content-md-center" style="padding-top: 2%">
      <button
        type="button"
        class="col-2 btn btn-primary"
        @click="$router.push('/Register')"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$fb
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async (res) => {
          const userSnap = await this.$db.doc(`User/${res.user.uid}`).get();
          const userData = userSnap.data();
          if (userData.role) {
            this.$router.push("/Nurse");
          } else {
            this.$router.push("/Resident");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
.inputLabel {
  padding-top: 6px;
}
</style>
