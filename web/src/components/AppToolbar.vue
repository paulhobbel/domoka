<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand href="#" to="/">Domoka</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#" to="/" exact>Home</b-nav-item>
          <b-nav-item href="#" to="/schedule">Schedule</b-nav-item>
          <b-nav-item href="#" to="/devices">Devices</b-nav-item>
          <b-nav-item href="#" to="/settings">Settings</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="isLoggedIn">
            <!-- Using button-content slot -->
            <template slot="button-content">{{ username }}</template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['username']),
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: mapActions('auth', ['logout'])
}
</script>

