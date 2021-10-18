<template>
  <div class="container">
    <div class="row justify-content-md-center" style="padding-top: 10%">
      <span class="col-2 inputLabel">Resident Name :</span>
      <span class="col-2 inputLabel">{{ user.userName }}</span>
    </div>
    <div v-if="userAppointmentList.length > 0" style="padding-top: 5%">
      <div>Your appointments</div>
      <div
        v-for="(appointment, index) in userAppointmentList"
        :key="index"
        class="row"
        style="padding-top: 2%"
      >
        <span class="col-2 offset-1 inputLabel">
          Centre: {{ appointment.centreName }}</span
        >
        <span class="col-2 inputLabel">
          Nurse: {{ appointment.nurseName }}
        </span>
        <span class="col-6 inputLabel">
          Date: {{ new Date(appointment.date.seconds * 1000) }}
        </span>
      </div>
    </div>
    <div v-else>
      <div class="row form-group" style="padding-top: 5%">
        <span class="col-2 offset-1 inputLabel"> Centre </span>
        <select class="custom-select col-2" v-model="selectedCentre">
          <option
            v-for="(centre, index) in centreList"
            :key="index"
            :value="centre"
          >
            {{ centre.centreName }}
          </option>
        </select>
        <span v-if="selectedCentre" class="col-2 offset-1 inputLabel">
          Nurse
        </span>
        <select
          v-if="selectedCentre"
          class="custom-select col-2"
          v-model="selectedNurse"
        >
          <option
            v-for="(nurse, index) in selectedCentre.nurseList"
            :key="index"
            :value="nurse"
          >
            {{ nurse.nurseName }}
          </option>
        </select>
      </div>
      <div class="row form-group" style="padding-top: 2%">
        <span class="col-2 offset-1 inputLabel"> Date </span>
        <select class="custom-select col-2" v-model="selectedDate">
          <option v-for="(date, index) in dateList" :key="index" :value="date">
            {{ date.dateStr }}
          </option>
        </select>
        <span v-if="selectedDate" class="col-2 offset-1 inputLabel">
          Time
        </span>
        <select
          v-if="selectedDate"
          class="custom-select col-2"
          v-model="selectedTime"
        >
          <option v-for="(time, index) in timeList" :key="index" :value="time">
            {{ time.timeStr }}
          </option>
        </select>
      </div>
      <div style="padding-top: 5%">Available capacity: {{ capacity }}</div>
      <div class="row justify-content-md-center" style="padding-top: 2%">
        <button
          type="button"
          class="col-2 btn btn-primary"
          @click="makeAppointment"
        >
          Make Appointment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resident",
  data() {
    return {
      user: {},
      centreList: [],
      selectedCentre: {},
      selectedNurse: {},
      appointmentList: [],
      dateList: [],
      selectedDate: {},
      timeList: [],
      selectedTime: {},
      userAppointmentList: [],
    };
  },
  computed: {
    capacity: {
      get() {
        if (this.selectedCentre && this.selectedDate.date) {
          let capacity = this.selectedCentre.capacity;
          const start = new Date(this.selectedDate.date);
          start.setHours(0, 0, 0, 0);
          const end = new Date(this.selectedDate.date);
          end.setHours(23, 59, 59, 59);
          for (const appointment of this.appointmentList) {
            if (appointment.date) {
              if (
                new Date(appointment.date.seconds * 1000) <= end &&
                new Date(appointment.date.seconds * 1000) > start
              ) {
                capacity--;
              }
            }
          }
          return capacity;
        } else {
          return 0;
        }
      },
    },
  },
  methods: {
    zeroPadding(num, digit) {
      let zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    async makeAppointment() {
      const user = this.$fb.auth().currentUser;
      if (this.capacity <= 0) {
        alert("Not enough capacity");
        return;
      }
      for (const appointment of this.appointmentList) {
        if (appointment.date) {
          if (
            appointment.date.seconds * 1000 ==
              this.selectedTime.time.getTime() &&
            appointment.nurseId == this.selectedNurse.nurseId
          ) {
            alert("Slot already been selected");
            return;
          }
        }
      }
      try {
        await Promise.all([
          this.$db.collection(`User/${user.uid}/Appointment`).add({
            centrId: this.selectedCentre.id,
            centreName: this.selectedCentre.centreName,
            nurseId: this.selectedNurse.nurseId,
            nurseName: this.selectedNurse.nurseName,
            date: this.selectedTime.time,
          }),
          this.$db
            .collection(`Centre/${this.selectedCentre.id}/Appointment`)
            .add({
              userId: user.uid,
              userName: this.user.userName,
              nurseId: this.selectedNurse.nurseId,
              nurseName: this.selectedNurse.nurseName,
              date: this.selectedTime.time,
            }),
        ]);
        alert("Make appointment successfully");
      } catch (error) {
        if (error.message) {
          alert(error.message);
        } else {
          alert("Make appointment failed");
        }
      }
    },
  },
  async created() {
    const user = this.$fb.auth().currentUser;
    if (user) {
      await this.$bind("user", this.$db.doc(`User/${user.uid}`));
      await this.$bind(
        "userAppointmentList",
        this.$db.collection(`User/${user.uid}/Appointment`)
      );
      await this.$bind("centreList", this.$db.collection("Centre"));
      if (this.centreList.length > 0) {
        this.selectedCentre = this.centreList[0];
      }
    } else {
      this.$router.push("/");
    }
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const seconds = now.getTime();
      const date = new Date(seconds + i * 60 * 60 * 24 * 1000);
      const dateStr =
        this.zeroPadding(date.getFullYear(), 4) +
        "-" +
        this.zeroPadding(date.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(date.getDate(), 2);
      this.dateList.push({ date, dateStr });
    }
    this.selectedDate = this.dateList[0];
  },
  watch: {
    selectedCentre: async function () {
      if (this.selectedCentre.id) {
        await this.$bind(
          "appointmentList",
          this.$db.collection(`Centre/${this.selectedCentre.id}/Appointment`)
        );
      }
      if (
        this.selectedCentre.nurseList &&
        this.selectedCentre.nurseList.length > 0
      ) {
        this.selectedNurse = this.selectedCentre.nurseList[0];
      }
    },
    selectedDate: function () {
      if (this.selectedDate.date) {
        this.timeList = [];
        const date = this.selectedDate.date;
        date.setHours(0, 0, 0, 0);
        for (let i = 16; i <= 36; i++) {
          const seconds = date.getTime();
          const time = new Date(seconds + i * 30 * 60 * 1000);
          const timeStr =
            this.zeroPadding(time.getHours(), 2) +
            ":" +
            this.zeroPadding(time.getMinutes(), 2) +
            ":" +
            this.zeroPadding(time.getSeconds(), 2);
          if (time > new Date()) {
            this.timeList.push({ time, timeStr });
          }
        }
        if (this.timeList.length > 0) {
          this.selectedTime = this.timeList[0];
        }
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
