<template>
  <div>
    <b-table striped hover :items="items">
      <template slot="switch_light" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { number: 1, name: 'lamp 1', location: 'Kitchen', status: 'On' },
        { number: 2, name: 'lamp 2', location: 'Bedroom', status: 'Off' },
        { number: 3, name: 'lamp 3', location: 'Living Room', status: 'On' },
        { number: 4, name: 'lamp 4', location: 'Bathroom', status: 'On' }
      ]
    };
  }
};
</script>

<style scoped>
</style>
