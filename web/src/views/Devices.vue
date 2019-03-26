<template>
  <div class="home">
    <b-card
      class="mb-4">
      <b-card-title class="card-title-actions">
        Devices
        <!-- <b-button-toolbar aria-label="Toolbar with button groups and input groups"> -->
          <b-button-group size="sm">
            <b-button variant="primary" @click="addItem">Add</b-button>
            <b-button @click="fetchAll">Refresh</b-button>
          </b-button-group>
        <!-- </b-button-toolbar> -->
        <!-- <b-button @click="addItem" variant="primary">Add</b-button> -->
      </b-card-title>
      <b-table striped hover :items="items" :fields='fields'>
        <template slot="status" slot-scope="row">
          <b-form-checkbox switch @change="toggleStatus(row, $event)" :checked="row.value">
          </b-form-checkbox>
        </template>
        <template slot="edit" slot-scope="row">
          <b-button-group size="sm">
            <b-button variant="primary" @click="editItem(row)">Edit</b-button>
            <b-button variant="danger" @click="deleteItem(row)">Delete</b-button>
          </b-button-group>
           <!-- <b-button @click="editItem(row)" variant="primary" size="sm">Edit</b-button >
           <b-button @click="deleteItem(row, $event)" variant="danger" size="sm">Delete</b-button> -->
        </template>
      </b-table>
    </b-card>

    <device-modal ref="modal"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DeviceModal from '@/components/DeviceModal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    fields: ['id', 'name', 'location', 'status', 'edit']
    // items: [
    //   { number: 1, name: 'lamp 1', location: 'Kitchen', status: true },
    //   { number: 2, name: 'lamp 2', location: 'Bedroom', status: false },
    //   { number: 3, name: 'lamp 3', location: 'Living Room', status: true },
    //   { number: 4, name: 'lamp 4', location: 'Bathroom', status: false }
    // ]
  }),
  computed: {
    ...mapState('devices', {
      items: state => state.devices.map(device => ({
        ...device,
        status: false
      }))
    })
  },
  methods: {
    toggleStatus (row, flag) {
      this.items[row.index].status = flag;
    },
    deleteItem (row) {
      this.$refs.modal.$emit('delete', row.item);
    },
    editItem (row) {
      this.$refs.modal.$emit('edit', row.item);
    },
    addItem () {
      this.$refs.modal.$emit('add');
    },
    ...mapActions('devices', ['fetchAll'])
  },
  mounted () {
    this.fetchAll();
  },
  components: {
    DeviceModal
  }
};
</script>

<style>
.card-title-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
