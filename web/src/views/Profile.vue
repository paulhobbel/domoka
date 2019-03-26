<template>
  <div>
    <b-container fluid>

        <b-row>
          <b-card title="Current Profile" class="text-left">
            Username: {{ username }}
          </b-card>

        <b-col>
          <b-card title="Edit Profile" class="text-left">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-row>
                <b-col>
                  <b-form-group
                    id="testGroup1"
                    label="Username"
                    label-for="exampleInput1"
                  >
                    <b-form-input
                      id="exampleInput1"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="New username"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    id="testGroup2"
                    label="Password"
                    label-for="exampleInput2"
                  >
                    <b-form-input
                      id="exampleInput2"
                      type="password"
                      v-model="form.oldpassword"
                      required
                      placeholder="Old password"
                    />
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="testGroup3"
                    label="Password"
                    label-for="exampleInput3"
                  >
                    <b-form-input
                      id="exampleInput3"
                      type="password"
                      v-model="form.newpassword"
                      required
                      placeholder="New password"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button type="submit" variant="primary" with>Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </b-card>
        </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  data () {
    return {
      form: {
        username: '',
        oldpassword: '',
        newpassword: ''
      },
      show: true
    };
  },
  computed: {
    ...mapState('devices', {
      items: state => state.devices.map(device => ({
        ...device,
        status: false
      }))
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset (evt) {
      evt.preventDefault();
      this.form.username = '';
      this.form.oldpassword = '';
      this.form.newpassword = '';
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
