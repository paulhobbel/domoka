<template>
  <div class="home">
    <b-card
      title="Devices"
      class="mb-4">

      <app-table/>

    </b-card>
     <b-card
      title="Power Savings"
      class="mb-4">

    </b-card>

  </div>
</template>

<script>
// @ is an alias to /src
import AppTable from '@/components/AppTable.vue';

export default {
  components: {
    AppTable
  }
};
</script>
