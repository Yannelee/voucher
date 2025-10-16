<template>
  <div>
    <header>
    </header>
      <hr>
    <div>
      <slot></slot>
    </div>

    <hr>

    <Footer :links=false />
  </div>
</template>


<script setup>

</script>

<style scoped>
  .router-link-exact-active{
    color: rgb(58, 125, 103);
  }
</style>