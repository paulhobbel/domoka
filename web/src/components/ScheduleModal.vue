<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="modalSchedule"
      ref="modal"
      :title="title"
      @ok="handleSubmit">
      <p v-if="type == 'delete'">Are you sure you want to delete the schedule "{{ name }}". This action is irreversible!</p>
      <form v-else>
        <b-form-group label="Name:">
          <b-form-input type="text" placeholder="Name" v-model="name" />
        </b-form-group>
        <b-form-group label="Description:">
          <b-form-input type="text" placeholder="Description" v-model="description" />
        </b-form-group>
        <b-form-group>
          <b-form-select label="Devices" multiple v-model="selected" :options="options" />
        </b-form-group>
        <b-form-group label="Begin Time:">
          <b-form-input type="time" placeholder="Begin Time" v-model="beginTime" />
        </b-form-group>
        <b-form-group label="End Time:">
          <b-form-input type="time" placeholder="End Time" v-model="endTime" />
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
    id: null,
    name: '',
    description: '',
    selected: [],
    beginTime: '',
    endTime: ''
  }),
  computed: {
    title() {
      return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} ${this.name || 'Schedule'}`;
    },
    ...mapState('devices', {
      options: state => state.devices.map(device => ({
        ...device,
        status: false
      }))
    })
  },
  methods: {
    ...mapActions('schedule', ['create', 'edit', 'delete']),
    ...mapActions('devices', ['fetchAll']),
    async handleSubmit (evt) {
      evt.preventDefault();
      // TODO Change name
      switch(this.type) {
        case 'add':
          await this.create({name: this.name, description: this.description, devices: this.selected, beginTime: this.beginTime, endTime: this.endTime});
          break;
        case 'edit':
          await this.edit({ id: this.id, name: this.name, description: this.description, devices: this.selected, beginTime: this.startTime, endTime: this.endTime });
          break;
        case 'delete':
          await this.delete(this.id);
          break;
      }

      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    }
  },
  created() {
    this.$on('add', () => {
      const date = new Date();

      this.type = 'add';
      this.id = null;
      this.name = null;
      this.description = null;
      this.beginTime = `${date.getHours()}:${date.getMinutes()}`;
      this.endTime = `${date.getHours()}:${date.getMinutes()}`;
      this.$refs.modal.show();
    });

    this.$on('edit', (schedule) => {
      this.type = 'edit';
      this.id = schedule.id;
      this.name = schedule.name;
      this.description = schedule.description;
      this.beginTime = schedule.beginTime;
      this.endTime = schedule.endTime;
      this.$refs.modal.show();
    });

    this.$on('delete', (schedule) => {
      this.type = 'delete';
      this.id = schedule.id;
      this.name = schedule.name;
      this.description = schedule.description;
      this.beginTime = schedule.beginTime;
      this.endTime = schedule.endTime;
      this.$refs.modal.show();
    });
  },
  mounted(){
    this.fetchAll();
  }
};
</script>
