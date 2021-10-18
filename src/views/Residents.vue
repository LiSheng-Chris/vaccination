<template>
  <div class="container">
    <h1 style="font-size: 40px; padding-top: 10%">Vaccination Reservation</h1>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <span class="col-2 inputLabel">UserName :</span>
      <input class="col-3 form-control" type="text" v-model="userName" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 2%">
      <span class="col-2 inputLabel">Password :</span>
      <input class="col-3 form-control" type="password" v-model="password" />
    </div>
    <div class="row justify-content-md-center" style="padding-top: 5%">
      <button
        type="button"
        class="col-2 btn btn-primary"
        @click="$router.push('/DashBoard')"
      >
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
      userName: "Test",
      password: "123456",
    };
  },
};
</script>

<style scoped>
.inputLabel {
  padding-top: 6px;
}
</style>
