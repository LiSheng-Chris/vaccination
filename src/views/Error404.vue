<template>
  <div class="container">
    <div style="padding-top: 10%">
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <button
        type="button"
        class="col-2 btn btn-primary"
        @click="$router.push('/')"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
};
</script>
