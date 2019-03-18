<template>
  <div class="home">
    <b-card
      title="Devices"
      class="mb-4">

      <b-table striped hover :items="items" :fields='fields'>
        <template slot="status" slot-scope="row">
          <b-form-checkbox switch @change="toggleStatus(row, $event)" :checked="row.value">
          </b-form-checkbox>
        </template>
        <template slot="edit" slot-scope="row">
           <b-button v-b-modal.modalPrevent variant="primary">Edit</b-button >
           <b-button @click="deleteItem(row, $event)" variant="danger">Delete</b-button>
        </template>
      </b-table>

    </b-card>

    <app-edit-pop-up/>

  </div>
</template>

<script>
// @ is an alias to /src
import AppEditPopUp from '@/components/AppEditPopUp.vue';

export default {
  data: () => ({
    fields: ['number', 'name', 'location', 'status', 'edit'],
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
    },
    deleteItem (row) {
      this.items.splice(row.index, 1);
    },
    editItem (row) {

    },
    addItem () {

    }
  },
  components: {
    AppEditPopUp
  }
};
</script>
