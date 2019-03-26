<template>
  <div>
    <b-container fluid>
      <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
        <b-row>
          <b-card title="Current Profile" class="text-left">
            Username: {{ username }}
          </b-card>

        <b-col>
          <b-card title="Edit Profile" class="text-left">
            <b-form @submit="onSubmit" @reset.prevent="onReset" v-if="show">
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
                      placeholder="Current password"
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

import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    form: {
      username: '',
      oldpassword: '',
      newpassword: ''
    },
    show: true
  }),
  computed: {
    ...mapState('auth', ['username', 'error'])
  },
  methods: {
    ...mapActions('auth', ['changeName']),
    onSubmit (evt) {
      evt.preventDefault();
      this.changeName({ username: this.form.username, oldPassword: this.form.oldpassword, newPassword: this.form.newpassword });
      evt.preventDefault();
      this.onReset();
    },
    onReset () {
      this.form.oldpassword = '';
      this.form.newpassword = '';
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  mounted () {
    this.form.username = this.username;
  }
};
</script>
