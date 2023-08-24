<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card>
        <v-toolbar dark class="primary">Login</v-toolbar>
        <v-card-text>
          <v-alert color="red lighten-2" dark v-if="isError">
            {{ $t(message) }}
          </v-alert>
          <v-form ref="form">
            <v-text-field
              label="Email"
              :rules="rules.email"
              v-model="form.email"
              required
            />

            <v-text-field
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
              required
            />

          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          :loading="isLoading" 
          color="primary" 
          @click="onSubmit"
          >Login</v-btn>
        </v-card-actions>
      </v-card>

      <div class="d-flex align-baseline">
        <p>Kamu sudah punya akun ? </p>
        <v-btn
          text
          plain
          to="/register"
          :ripple="false"
          color="primary"
          class="pl-1"
        >Register</v-btn>
        <!-- :to="localePath('/register')" -->
      </div>
      <!-- <p>Nama kamu : {{ fullname }}</p> -->
    </v-col>
  </v-row>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  middleware: ['unauthenticated'],
  layout: 'auth',
  data() {
    return {
      isLoading: false,
      isError: false,
      message: null,
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'email' }),
          (v) => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v) || this.$t('EMAIL_INVALID')
        ],
        password: [
          (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'password' }),
          (v) => v.length >= 6 || this.$t('FIELD_MIN', { field: 'password', min: 6 }),
        ]
      },
    }
  },
  methods: {
    async onSubmit() {
      try{
        this.isLoading = true

        const user = await this.$store.dispatch('auth/login', this.form)

        this.$router.push({ name: 'index___' + this.$i18n.locale })
        this.isLoading = false
      } catch (error) {
        this.isError = true
        this.isLoading = false

        this.message = error.response ? error.response.data.message : "SERVER_ERROR"
      }
    }
  }
  // computed: {
  //   ...mapState('auth', ['fullname'])
  // }
}
</script>
