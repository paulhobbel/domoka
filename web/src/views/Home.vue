<template>
  <div class="home">
    <b-card
      title="Devices"
      class="mb-4">

      <app-table/>

    </b-card>

    <b-card
    title="Savings"
    class="mb-4">
    <b-card-group deck>
      <b-card
      img-src="http://chittagongit.com//images/power-saver-icon/power-saver-icon-7.jpg"
      img-left
      img-height= 148
      img widht= 148
      title="Power overview">
        <b-card-text>
          Power usage: 20 kwh
        </b-card-text>

        <b-card-text>
           Power saved: 10 kwh
        </b-card-text>

      </b-card>

      <b-card
        img-src="data:image/png;base64,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"
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
import AppTable from '@/components/AppTable.vue';

export default {
  components: {
    AppTable
  }
};
</script>
