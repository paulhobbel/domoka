<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="modalSchedule"
      ref="modal"
      title="Add Schedule"
      @ok="handleOk"
      @shown="clearFields">
      <form>
        <b-form-input type="text" placeholder="Name" v-model="name" />
        <b-form-input type="text" placeholder="Description" v-model="description" />
        <b-form-input type="time" placeholder="Start Time" v-model="starttime" />
        <b-form-input type="time" placeholder="End Time" v-model="endtime" />
      </form>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  data () {
    return {
      name: '',
      description: '',
      starttime: '',
      endtime: ''
    };
  },
  methods: {
    ...mapActions('schedule', ['create']),
    clearFields () {
      this.name = '';
      this.description = '';
      this.starttime = '';
      this.endtime = '';
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.name) {
        alert('Please enter your name');
      } else {
        this.handleSubmit();
      };
    },
    handleSubmit () {
      // TODO Change name
      this.create({name: this.name, description: this.description, devices: null, beginTime: this.starttime, endTime: this.endtime});
      this.clearFields();
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide();
      });
    }
  }
};
</script>
