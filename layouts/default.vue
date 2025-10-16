<template>
  <div>
    <header>
      <BarraNav />
    </header>
      <hr>
    <div class="m-5">
      <slot />
    </div>

    <hr>

    <Footer :links=true />
  </div>
</template>

<style scoped>
  .router-link-exact-active{
    color: rgb(58, 125, 103);
  }
</style>