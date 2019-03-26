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
      img-src="@/assets/powersaver.jpg"
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
import AppTable from '@/components/AppTable.vue';

export default {
  components: {
    AppTable
  }
};
</script>
