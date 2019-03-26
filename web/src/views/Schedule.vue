<template>
  <div class="home">
    <b-card
      class="mb-4">
      <b-card-title class="card-title-actions">
        Schedules
        <b-button-group size="sm">
          <b-button variant="primary" @click="addItem">Add</b-button>
          <b-button @click="fetchAll">Refresh</b-button>
        </b-button-group>
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
        </template>
      </b-table>
    </b-card>
    <schedule-modal ref="modal"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ScheduleModal from '@/components/ScheduleModal.vue';

export default {
  data: () => ({
    fields: [{ key: 'id', label: 'ID' }, 'name', 'description', 'status', 'beginTime', 'endTime', 'edit']
  }),
  computed: {
    ...mapState('schedule', {
      items: state => state.schedules.map(schedule => ({
        ...schedule,
        status: false
      }))
    })
  },
  methods: {
    ...mapActions('schedule', ['fetchAll', 'create', 'edit', 'delete']),
    toggleStatus (row, flag) {
      this.items[row.index].status = flag;
    },
    deleteItem (row) {
      this.$refs.modal.$emit('delete', row.item);
      // this.items.splice(row.index, 1);
    },
    editItem (row) {
      this.$refs.modal.$emit('edit', row.item);
    },
    addItem () {
      this.$refs.modal.$emit('add');
    }
  },
  mounted () {
    this.fetchAll();
  },
  components: {
    ScheduleModal
  }
};
</script>
