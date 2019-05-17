<template>
  <div>
    <h1>{{patientProp.name}}</h1>
    <h1>{{patientProp.sex}}</h1>
  </div>
</template>

<script>
    export default {
      name: "addDiagnose",
      props: {
        patientProp: Object,
        pageType: Number
      },
      data() {
        return {}
      }
    }
</script>

<style scoped>

</style>
