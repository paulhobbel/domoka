<template>
  <div>
    <b-modal
    id="modalAdd"
    ref="modal"
    title="Add Device"
    @ok="handleOk"
    @shown="clearFields">
      <form>
        <b-form-input type="text" placeholder="Name" v-model="name" />
        <b-form-input type="text" placeholder="Location" v-model="location" />
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
      evt.preventDefault();
      if (!this.name && !this.location) {
        alert("REEE");
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

