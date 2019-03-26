<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="deviceModal"
      ref="modal"
      :title="title"
      @ok="handleSubmit"
    >
      <p v-if="type == 'delete'">Are you sure you want to delete the device "{{ device.name }}". This action is irreversible!</p>
      <template v-else>
        <b-form-group label="ID:">
          <b-form-input type="number" placeholder="Name" v-model="device.deviceId" required />
        </b-form-group>
        <b-form-group label="Name:">
          <b-form-input type="text" placeholder="Name" v-model="device.name" required />
        </b-form-group>
        <b-form-group label="Location:">
          <b-form-input type="text" placeholder="Location" v-model="device.location" required />
        </b-form-group>
        <b-form-group label="Watt:">
          <b-form-input type="number" placeholder="Watt" v-model="device.watt" required />
        </b-form-group>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    type: 'add',
    device: {
      id: null,
      deviceId: 0,
      name: null,
      location: null,
      watt: 0
    }
  }),
  computed: {
    title () {
      return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} ${this.device.name || 'Device'}`;
    }
  },
  methods: {
    ...mapActions('devices', ['create', 'edit', 'delete']),
    async handleSubmit (evt) {
      evt.preventDefault();
      try {
        switch (this.type) {
          case 'add':
            await this.create(this.device);
            break;
          case 'edit':
            await this.edit(this.device);
            break;
          case 'delete':
            await this.delete(this.device.id);
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
  created () {
    this.$on('add', () => {
      this.type = 'add';
      this.device = {
        id: null,
        deviceId: 0,
        name: null,
        location: null,
        watt: null
      };
      this.$refs.modal.show();
    });

    this.$on('edit', (device) => {
      this.type = 'edit';
      this.device = device;
      this.$refs.modal.show();
    });

    this.$on('delete', (device) => {
      this.type = 'delete';
      this.device = device;
      this.$refs.modal.show();
    });
  }
};
</script>
