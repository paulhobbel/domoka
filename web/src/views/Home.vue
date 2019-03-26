<template>
  <div class="home">
    <b-card-group deck>
      <b-card
        title="Devices Overview"
        class="mb-4">
        <b-table striped :fields="fieldsDevices" :items="activeDevices"/>
      </b-card>

      <b-card
        title="Schedules Overview"
        class="mb-4">
        <b-table striped :fields="fieldsSchedule" :items="activeSchedules"/>
      </b-card>
    </b-card-group>

    <b-card
    title="Savings"
    class="mb-4">
    <b-card-group deck>
      <b-card
      img-src="@/assets/powersaver.jpg"
      img-left
      img-height= 148
      img widht= 148
      title="Power overview">
        <b-card-text>
          Power usage: {{ powerUsage }}
        </b-card-text>

        <b-card-text>
           Power used total: {{ powerUsed }}
        </b-card-text>

        <b-card-text>
           Power savings: {{ powerSavings }}
        </b-card-text>

      </b-card>

      <b-card
        img-src="@/assets/cash.png"
        img-left
        img-height= 148
        img-widht= 148
        title="Cost overview">
          <b-card-text>
            Cost: €20,56
          </b-card-text>

          <b-card-text>
            Money saved: €5,23
          </b-card-text>

        </b-card>
      </b-card-group>
    </b-card>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  data: () => ({
    fieldsSchedule: ['name', 'description'],
    fieldsDevices: ['name', 'location']

  }),
  computed: {
    ...mapGetters('devices', ['activeDevices']),
    ...mapGetters('schedule', ['activeSchedules']),
    ...mapState('power', ['powerUsage','powerUsed', 'powerSavings'])
  },
  methods: {
    ...mapActions('devices', {
      fetchDevices: 'fetchAll'
    }),
    ...mapActions('schedule', {
      fetchSchedules: 'fetchAll'
    }),
    ...mapActions('power', ['getPower'])
  },
  mounted () {
    this.fetchDevices();
    this.fetchSchedules();
    this.getPower();
  }
};
</script>
