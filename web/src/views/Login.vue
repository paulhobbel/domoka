<template>
  <div class="login">
    <b-card
      title="Login">
      <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="usernameInput" label="Username:" label-for="exampleInput1">
          <b-form-input
            id="username"
            type="text"
            v-model="form.username"
            required
            placeholder="Enter username" />
        </b-form-group>

        <b-form-group id="passwordInput" label="Password:" label-for="exampleInput2">
         <b-form-input
            id="password"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password" />
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async onSubmit () {
      await this.login(this.form);
      this.$router.push(this.$route.query.redirect || '/');
    }
  },
  computed: mapState('auth', ['error'])
};
</script>

<style scoped>
  .login {
    max-width: 600px;
    margin: 0 auto;
  }
  .content{
    padding-top: 30px;
  }
</style>
