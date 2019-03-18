<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="modalPrevent"
      ref="modal"
      title="Edit Device"
      @ok="handleOk"
      @shown="clearFields"
    >
      <form >
        <b-form-input type="text" placeholder="name" v-model="name" />
        <b-form-input type="text" placeholder="location" v-model="location" />
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      location: ''
    };
  },
  methods: {
    clearFields () {
      this.name = '';
      this.location = '';
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.name && !this.location) {
        alert('Please enter your name');
      } else {
        this.handleSubmit();
      };
    },
    handleSubmit () {
      // TODO Change name

      this.clearFields();
      this.$nextTick(() => {
        // Wrapped in $nextTick to ensure DOM is rendered before closing
        this.$refs.modal.hide();
      });
    }
  }
};
</script>
