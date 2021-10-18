<template>
  <div class="container">
    <div
      class="row justify-content-md-center"
      style="padding-top: 10%; padding-bottom: 5%"
    >
      <span class="col-2 inputLabel">Nurse Name :</span>
      <span class="col-2 inputLabel">{{ user.userName }}</span>
    </div>
    <div>Your appointments</div>
    <div
      v-for="(appointment, index) in appointmentList"
      :key="index"
      class="row"
      style="padding-top: 2%"
    >
      <span class="col-4 offset-1 inputLabel">
        Resident: {{ appointment.userName }}</span
      >
      <span class="col-6 inputLabel">
        Date: {{ new Date(appointment.date.seconds * 1000) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nurse",
  data() {
    return {
      user: {},
      appointmentList: [],
    };
  },
  async created() {
    const user = this.$fb.auth().currentUser;
    if (user) {
      await this.$bind("user", this.$db.doc(`User/${user.uid}`));
      await this.$bind(
        "appointmentList",
        this.$db.collection(`Centre/${this.user.centreId}/Appointment`)
      );
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.inputLabel {
  padding-top: 6px;
}
</style>
