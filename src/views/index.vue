<template>
<v-card>
    <v-card-title class="primary">Memes Graf
    <v-spacer></v-spacer>
        <v-icon @click="searchPanel=!searchPane">search</v-icon>
    </v-card-title>
    <v-card-action class="blue darken-2" v-if="searchPane">
        <v-autocomplete
                class="mx-3 mt-5"
                label="Memes list"
                :items="states"
                filled
                rounded
        ></v-autocomplete>
    </v-card-action>
    <v-card-text class="grey darken-1"></v-card-text>
</v-card>
</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                model: null,
                states: [
                    'Alabama', 'Alaska', 'American Samoa', 'Arizona',
                    'Arkansas', 'California', 'Colorado', 'Connecticut',
                    'Delaware', 'District of Columbia', 'Federated States of Micronesia',
                    'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
                    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                    'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
                    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                    'Missouri', 'Montana', 'Nebraska', 'Nevada',
                    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                    'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
                    'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
                    'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
                    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
                ],}}
                methods

    }
</script>

<style scoped>

</style>