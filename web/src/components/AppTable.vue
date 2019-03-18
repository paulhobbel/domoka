<template>
  <div>
    <b-table striped hover :items="items">
      <template slot="status" slot-scope="row">
        <b-form-checkbox switch @change="toggleStatus(row, $event)" :checked="row.value">
        </b-form-checkbox>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { number: 1, name: 'lamp 1', location: 'Kitchen', status: true },
      { number: 2, name: 'lamp 2', location: 'Bedroom', status: false },
      { number: 3, name: 'lamp 3', location: 'Living Room', status: true },
      { number: 4, name: 'lamp 4', location: 'Bathroom', status: false }
    ]
  }),
  methods: {
    toggleStatus (row, flag) {
      this.items[row.index].status = flag;
    }
  }
};
</script>

<style scoped>
</style>
