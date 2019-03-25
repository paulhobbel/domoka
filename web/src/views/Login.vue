<template>
  <div class="home">
   <b-card
    title="Login">
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
import { mapActions } from 'vuex';

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
    async onSubmit (evt) {
      //evt.preventDefault();
      //alert(JSON.stringify(this.form));

      await this.login(this.form);
      this.$router.push(this.$route.query.redirect || '/');


    }
  }
};
</script>

<style scoped>
  .content{
    padding-top: 30px;
  }
</style>
