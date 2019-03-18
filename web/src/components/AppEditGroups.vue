<template>
  <div>
    <!-- Modal Component -->
    <b-modal
      id="modalGroup"
      ref="modal"
      title="Edit Device"
      @ok="handleOk"
      @shown="clearFields"
    >
      <form >
        <b-form-group
        id="newname"
        label="New name:"
        label-for="exampleInput1">
        <b-form-input
          id="newUsername"
          type="text"
          v-model="name"
          placeholder="Enter new name" />
      </b-form-group>

      <b-form-group
        id="newdes"
        label="New description:"
        label-for="exampleInput1">
        <b-form-textarea id="textarea" v-model="discription" placeholder="Enter something..." rows="3" max-rows="6"/>
      </b-form-group>

      <b-form-group
        id="newlist"
        label="Choose devices:"
        label-for="exampleInput1">
        <b-form-select multiple :select-size="4" v-model="options" :options="options" />
      </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: ['b'], // Array reference
      name: '',
      discription: '',
      options: [
        { value: '1', text: 'Device name 1' },
        { value: '2', text: 'Device name 2' },
        { value: '3', text: 'Device name 3' },
        { value: '4', text: 'Device name 4', disabled: true },
        { value: '5', text: 'Device name 5' },
        { value: '6', text: 'Device name 6' },
        { value: '7', text: 'Device name 7' }
      ]
    };
  },
  methods: {
    clearFields () {
      this.name = '';
      this.discription = '';
      this.devices = [];
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.name && !this.location && !this.devices) {
        alert('Please fill at least one new item to edit');
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
