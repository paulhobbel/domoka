<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      v-model="show"
      title="Edit Device"
      @ok.prevent="handleSubmit"
    >
      <!-- <b-form> -->
        <b-form-group label="Name:">
          <b-form-input type="text" placeholder="Name" v-model="name" />
        </b-form-group>
        <b-form-group label="Location:">
          <b-form-input type="text" placeholder="Location" v-model="location" />
        </b-form-group>
      <!-- </b-form> -->
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    show: false,
    id: null,
    name: null,
    location: null
  }),
  methods: {
    ...mapActions('devices', ['edit']),
    async handleSubmit () {
      try {
        await this.edit({ id: this.id, name: this.name, location: this.location });

        this.$nextTick(() => {
          this.show = false;
        });
      } catch (err) {
        alert(err.message);

        // TODO: Handle error properly
      }
    }
  },
  created() {
    this.$on('editDevice', (device) => {
      this.id = device.id;
      this.name = device.name;
      this.location = device.location;
      this.show = true;
    });
  }
};
</script>
