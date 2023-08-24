<template>
  <v-toolbar flat class="px-1 px-md-2">
      <v-btn
      text 
      plain
      :ripple="false"
      class="pl-0 v-btn--active"
      to="/"
      >
        <p class="text-h5 mb-0"><strong>arginanta</strong>form</p>
      </v-btn>
      <p class="ml-3 mb-0 muted" v-if="process">
        {{ $t(message) }}
      </p>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template  v-slot:activator="{ on }">
        <v-btn
          text 
          icon
          class="v-btn--active"
          v-on="on"
        >
            <v-icon color="purple" large>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
          <v-list-item to="/logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>  
    </v-menu>

  </v-toolbar>
</template>

<script>

import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('saves', ['process', 'message'])
  }
}

</script>