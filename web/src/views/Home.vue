<template>
  <div class="home">
    <app-cards />
  </div>
</template>

<script>
// @ is an alias to /src
import AppCards from '@/components/AppCards.vue';

export default {
  name: 'home',
  components: {
    AppCards
  }
};
</script>
