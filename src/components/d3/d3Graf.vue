<template>
  <div>
    <svg :height="height" :width="width">
      <g transform="translate(50,50)">
        <circle
          :cx="c.x"
          :cy="c.y"
          :fill="c.fill"
          :key="c.id"
          :r="c.r"
          :stroke="c.stroke"
          v-for="c in output"
        ></circle>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "PackChart",
  props: ["tweetData"],
  data() {
    return {
      msg: "👋 from the Chart Component",
      height: 600,
      width: 600
    };
  },
  created() {
    this.colourScale = d3
      .scaleOrdinal()
      .range(["#5EAFC6", "#FE9922", "#93c464", "#75739F"]);
  },
  methods: {
    packChart() {
      const packChart = d3.pack();
      packChart.size([500, 500]);
      packChart.padding(10);
      const output = packChart(this.packData).descendants();
      return output.map((d, i) => {
        const fill = this.colourScale(d.depth);
        return {
          id: i + 1,
          r: d.r,
          x: d.x,
          y: d.y,
          fill,
          stroke: "grey"
        };
      });
    }
  },
  computed: {
    packData() {
      const nestedTweets = d3
        .nest()
        .key(d => d.user)
        .entries(this.tweetData);
      const packableTweets = { id: "All Tweets", values: nestedTweets };
      return d3
        .hierarchy(packableTweets, d => d.values)
        .sum(d =>
          d.retweets ? d.retweets.length + d.favorites.length + 1 : 1
        );
    },
    output() {
      return this.packChart();
    }
  }
};
</script>
