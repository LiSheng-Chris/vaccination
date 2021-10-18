<template>
  <div class="container">
    <h1 style="font-size: 40px; padding-top: 10%">Testing</h1>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <span class="col-2 inputLabel">Email :</span>
      <input class="col-3 form-control" type="text" v-model="email" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 2%">
      <span class="col-2 inputLabel">Password :</span>
      <input class="col-3 form-control" type="password" v-model="password" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <button type="submit" class="col-2 btn btn-primary" @click="login">
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
        .then(() => {
          console.log(1);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  async created() {
    const user = await this.$db.collection("User").get();
    console.log(user.docs.length);
  },
};
</script>

<style scoped>
.inputLabel {
  padding-top: 6px;
}
</style>
