<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="deviceModal"
      ref="modal"
      :title="title"
      @ok="handleSubmit"
    >
      <!-- <form @submit.stop.prevent="handleSubmit"> -->
      <p v-if="type == 'delete'">Are you sure you want to delete the device "{{ name }}". This action is irreversible!</p>
      <template v-else>
        <b-form-group label="Name:">
          <b-form-input type="text" placeholder="Name" v-model="name" required />
        </b-form-group>
        <b-form-group label="Location:">
          <b-form-input type="text" placeholder="Location" v-model="location" required />
        </b-form-group>
      </template>
      <!-- </form> -->
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    type: 'add',
    id: null,
    name: null,
    location: null,
    watt: null
  }),
  computed: {
    title() {
      return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} ${this.name || 'Device'}`;
    }
  },
  methods: {
    ...mapActions('devices', ['create', 'edit', 'delete']),
    async handleSubmit (evt) {
      evt.preventDefault();
      try {
        switch(this.type) {
          case 'add':
            await this.create({ name: this.name, location: this.location });
            break;
          case 'edit':
            await this.edit({ id: this.id, name: this.name, location: this.location, watt: this.watt });
            break;
          case 'delete':
            await this.delete(this.id);
            break;
        }

        this.$nextTick(() => {
          this.$refs.modal.hide();
        });
      } catch (err) {
        alert(err.message);

        // TODO: Handle error properly
      }
    }
  },
  created() {
    this.$on('add', () => {
      this.type = 'add';
      this.id = null;
      this.name = null;
      this.location = null;
      this.watt = null;
      this.$refs.modal.show();
    });

    this.$on('edit', (device) => {
      this.type = 'edit'
      this.id = device.id;
      this.name = device.name;
      this.location = device.location;
      this.watt = device.watt;
      this.$refs.modal.show();
    });

    this.$on('delete', (device) => {
      this.type = 'delete'
      this.id = device.id;
      this.name = device.name;
      this.location = device.location;
      this.watt = device.watt;
      this.$refs.modal.show();
    });
  }
};
</script>
