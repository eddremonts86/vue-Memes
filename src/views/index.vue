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
      <v-layout wrap>
        <v-flex xs12 class="">
          <v-layout wrap class="grey lighten-3 ma-1">
            <v-flex class="ml-5" xs12>
              <v-layout wrap>
                <v-radio-group v-model="options" row>
                  <v-flex xs12 md4
                    ><v-radio label="Ancestors" value="ancestors"></v-radio
                  ></v-flex>
                  <v-flex xs12 md4
                    ><v-radio label="Siblings" value="siblings"></v-radio
                  ></v-flex>
                  <v-flex xs12 md4
                    ><v-radio label="Descendants" value="descendants"></v-radio
                  ></v-flex>
                </v-radio-group>
              </v-layout>
            </v-flex>
            <v-flex xs10>
              <v-autocomplete
                :items="data.nodes"
                class="mx-3 mt-5"
                filled
                rounded
                item-text="name"
                label="Search by Memes"
                return-object
                v-model="memeObj"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs2>
              <v-btn
                @click="searchMemes"
                class="mt-5 center"
                slot="activator"
                color="primary"
                dark
                fab
                ><v-icon>search</v-icon>
              </v-btn>
            </v-flex>
          </v-layout></v-flex
        >
        <v-flex xs12 class="grey lighten-3 ma-1">
          <v-layout wrap>
            <v-flex xs10>
              <v-autocomplete
                :items="data.nodes"
                class="mx-3 mt-5"
                filled
                item-text="name"
                label="Search by tags"
                return-object
                multiple
                rounded
                v-model="tags"
              ></v-autocomplete>
            </v-flex>
            <v-flex xs2>
              <v-btn
                @click="searchMemesTags"
                class="mt-5 center"
                slot="activator"
                color="primary"
                dark
                fab
                ><v-icon>search</v-icon></v-btn
              >
            </v-flex>
          </v-layout></v-flex
        >
      </v-layout>
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
      dialogImage: false,
      options: "ancestors",
      tags: [],
      memeObj: []
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
          vue.data = data;
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(
            "Cannot proceed with simulation, failed to  retrieve data. " + error
          );
        });
    },
    searchMemes() {
      const obj = {
        id: this.memeObj.group,
        options: this.options
      };
      this.$store.dispatch("fetchMemeByFamily", obj);
    },
    searchMemesTags() {
      let options = "";
      for (let t in this.tags) {
        options += "tag=" + this.tags[t].name;
        if (this.tags.length - 1 != t) {
          options += "&";
        }
      }
      const obj = {
        options: options
      };
      this.$store.dispatch("fetchMemeByTags", obj);
    }
  }
};
</script>

<style scoped></style>
