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
          Power usage: {{ power.powerUsage }} watt
        </b-card-text>

        <b-card-text>
           Power used total: {{ power.powerUsed }} watt
        </b-card-text>

        <b-card-text>
           Power savings: {{ power.powerSavings }} watt
        </b-card-text>

      </b-card>

      <b-card
        img-src="@/assets/cash.png"
        img-left
        img-height= 148
        img-widht= 148
        title="Cost overview">
          <b-card-text>
            Cost: € {{ power.cost }}
          </b-card-text>

          <b-card-text>
            Money saved: € {{ power.moneySaved }}
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
    fieldsDevices: ['name', 'location'],
    power: {
      powerUsage: 0,
      powerUsed: 0,
      powerSavings: 0,
      cost: 0,
      moneySaved: 0
    }
  }),
  computed: {
    ...mapGetters('devices', ['activeDevices']),
    ...mapGetters('schedule', ['activeSchedules']),
    ...mapState('power',{
      power: state => state.power
    })
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
