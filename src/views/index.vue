<template>
  <v-card>
    <v-card-title class="primary"
      >Memes Graf
      <v-spacer></v-spacer>

      <v-btn
        class="mx-3"
        slot="activator"
        color="primary"
        dark
        fab
        @click="searchPanel = !searchPanel"
        small
      >
        <v-icon dark>
          search
        </v-icon>
      </v-btn>
      <upload></upload>
    </v-card-title>
    <v-card-actions class="grey lighten-2" v-if="searchPanel">
      <v-autocomplete
        :items="data.nodes"
        class="mx-3 mt-5"
        filled
        item-text="name"
        label="Memes list"
        return-object
        rounded
      ></v-autocomplete>
    </v-card-actions>
    <v-card-text class="blue lighten-2 pa-5">
      <Graf :data="data"></Graf>
    </v-card-text>
  </v-card>
</template>

<script>
import Graf from "@/components/d3/Graf.vue";
import upload from "@/components/memesAdministration/upload.vue";
import * as d3 from "d3";

export default {
  name: "index",
  components: { Graf, upload },
  data() {
    return {
      data: [],
      model: null,
      searchPanel: false,
      dialogImage: false
    };
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("App loaded");
    this.changeData();
  },
  methods: {
    async changeData() {
      let vue = this;
      await d3
        .json("http://localhost:3000/graf")
        .then(data => {
          // eslint-disable-next-line no-console
          vue.data = data;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(
            "Cannot proceed with simulation, failed to  retrieve data. " + error
          );
        });
    }
  }
};
</script>

<style scoped></style>
