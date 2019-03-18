<template>
  <div class="home">
    <b-card
      title="Schedules"
      class="mb-4">
       <b-table striped hover :items="items" :fields='fields'>
        <template slot="status" slot-scope="row">
          <b-form-checkbox switch @change="toggleStatus(row, $event)" :checked="row.value">
          </b-form-checkbox>
        </template>
        <template slot="edit" slot-scope="row">
           <b-button v-b-modal.modalGroup variant="primary">Edit</b-button >
           <b-button @click="deleteItem(row, $event)" variant="danger">Delete</b-button>
        </template>
       </b-table>
      <app-edit-groups/>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import AppEditGroups from '@/components/AppEditGroups.vue';

export default {
  data: () => ({
    fields: ['number', 'name', 'disciprtion', 'status', 'starttime', 'endtime', 'edit'],
    items: [
      { number: 1, name: 'wake-up bedroom', disciprtion: 'When I wake up thete is light', status: true, starttime: '06:32', endtime: '08:20' },
      { number: 3, name: 'Light in evening', disciprtion: 'Sensor that looks if it is dark enough for the lights. and turns them on', status: true, starttime: '20:00', endtime: '02:00' }
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
    AppEditGroups
  }
};
</script>
