<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="modalSchedule"
      ref="modal"
      :title="title"
      @ok="handleSubmit">
      <p v-if="type == 'delete'">Are you sure you want to delete the schedule "{{ schedule.name }}". This action is irreversible!</p>
      <form v-else>
        <b-form-group label="Name:">
          <b-form-input type="text" placeholder="Name" v-model="schedule.name" />
        </b-form-group>
        <b-form-group label="Description:">
          <b-form-input type="text" placeholder="Description" v-model="schedule.description" />
        </b-form-group>
        <b-form-row>
          <b-form-group label="Begin Time:" class="col">
            <b-form-input type="time" placeholder="Begin Time" v-model="schedule.beginTime" />
          </b-form-group>
          <b-form-group label="End Time:" class="col">
            <b-form-input type="time" placeholder="End Time" v-model="schedule.endTime" />
          </b-form-group>
        </b-form-row>
        <b-form-group label="Devices:">
          <b-form-select multiple v-model="selected" :options="devices" />
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  data: () => ({
    type: 'add',
    schedule: {
      id: null,
      name: '',
      description: '',
      beginTime: '',
      endTime: ''
    },
    selected: []
  }),
  computed: {
    title () {
      return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} ${this.name || 'Schedule'}`;
    },
    ...mapState('devices', {
      devices: state => state.devices.map(device => ({
        value: device.id,
        text: device.name
      }))
    })
  },
  methods: {
    ...mapActions('schedule', ['create', 'edit', 'delete']),
    ...mapActions('devices', ['fetchAll']),
    async handleSubmit (evt) {
      evt.preventDefault();
      switch (this.type) {
        case 'add':
          await this.create({ ...this.schedule, devices: this.selected });
          break;
        case 'edit':
          await this.edit(this.schedule);
          break;
        case 'delete':
          await this.delete(this.schedule.id);
          break;
      }

      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  },
  created () {
    this.$on('add', () => {
      const date = new Date();

      this.type = 'add';
      this.schedule = {
        id: null,
        name: null,
        description: null,
        beginTime: `${date.getHours()}:${date.getMinutes()}`,
        endTime: `${date.getHours()}:${date.getMinutes()}`
      };
      this.selected = [];
      this.$refs.modal.show();
    });

    this.$on('edit', (schedule) => {
      console.log(schedule);
      this.type = 'edit';
      this.schedule = schedule;
      this.selected = schedule.devices.map(device => device.id) || [];
      this.$refs.modal.show();
    });

    this.$on('delete', (schedule) => {
      this.type = 'delete';
      this.schedule = schedule;
      this.$refs.modal.show();
    });
  },
  mounted () {
    this.fetchAll();
  }
};
</script>
