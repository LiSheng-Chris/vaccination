<template>
  <div class="container">
    <h1 style="font-size: 40px; padding-top: 10%">Register</h1>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <span class="col-2 inputLabel">Email :</span>
      <input class="col-3 form-control" type="text" v-model="email" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 2%">
      <span class="col-2 inputLabel">Password :</span>
      <input class="col-3 form-control" type="password" v-model="password" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 2%">
      <span class="col-2 inputLabel">Name :</span>
      <input class="col-3 form-control" type="text" v-model="name" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <button type="submit" class="col-2 btn btn-primary" @click="register">
        Register
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
    };
  },
  methods: {
    register() {
      if (this.name.trim().length > 0) {
        this.$fb
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(async (res) => {
            await this.$db
              .doc(`User/${res.user.uid}`)
              .set({ userName: this.name });
            this.$router.push("/Resident");
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        alert("User Name Required");
      }
    },
  },
};
</script>

<style scoped>
.inputLabel {
  padding-top: 6px;
}
</style>
