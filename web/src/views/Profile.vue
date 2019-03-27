<template>
  <div>
    <b-container fluid>
      <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
        <b-row>
          <b-col md="3" sm="12" class="mb-4">
            <b-card title="Current Profile" class="text-left profile-card">
              Username: {{ username }}
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Edit Profile" class="text-left">
              <b-form @submit="onSubmit" @reset.prevent="onReset" v-if="show">
                <b-form-group
                  label="Username"
                  label-for="username"
                >
                  <b-form-input
                    id="username"
                    type="text"
                    v-model="form.username"
                    required
                    placeholder="New username"
                  />
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-form-group
                      label="Current Password"
                      label-for="password"
                    >
                      <b-form-input
                        id="password"
                        type="password"
                        v-model="form.oldpassword"
                        placeholder="Current password"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                      label="New Password"
                      label-for="newPassword"
                    >
                      <b-form-input
                        id="newPassword"
                        type="password"
                        v-model="form.newpassword"
                        placeholder="New password"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
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

<style scoped>
.profile-card {
  height: 100%;
}
</style>
