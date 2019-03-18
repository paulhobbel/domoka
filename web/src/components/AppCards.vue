<template>
  <div>
  <b-card
    title="Devices"
    style="max-width: 100rem;"
    class="mb-2"
  >

  <app-table/>
<!--
    <b-button href="#" variant="primary">Switch</b-button> -->
  </b-card>
</div>
</template>

<script>
import AppTable from '@/components/AppTable.vue';

export default {
  components: {
    AppTable
  }
};
</script>
