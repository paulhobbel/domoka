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
    fields: [{ key: 'id', label: 'ID' }, 'name', 'description', 'beginTime', 'endTime', 'status', 'edit']
  }),
  computed: {
    ...mapState('schedule', {
      items: state => state.schedules
    })
  },
  methods: {
    ...mapActions('schedule', ['fetchAll', 'create', 'edit', 'delete', 'toggle']),
    async toggleStatus (row, flag) {
      await this.toggle(row.item.id);
    },
    deleteItem (row) {
      this.$refs.modal.$emit('delete', row.item);
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
