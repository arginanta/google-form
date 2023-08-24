export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        if (store.state.auth.accessToken) {
            config.headers['Authorization'] = `Bearer ${store.state.auth.accessToken}`
        }

        if (config.headers.Autosave) {
            console.log('Mulai proses penyimpanan otomatis')
            store.commit('saves/start')
        }
    })

    $axios.onResponse(response => {
        if (response.config.headers.Autosave) {
            setTimeout(() => {
                console.log('Selesai proses penyimpanan otomatis')
                store.commit('saves/success')
            }, 1000)
        }
    })

    $axios.onResponseError(async (error) => {
        try {
            if (error.response.config.headers.Autosave) {
                store.commit('saved/failed')
            }

            if (error.response.data.message === 'REFRESH_TOKEN_EXPIRED' || error.response.data.message === 'INVALID_REFRESH_TOKEN') {
                throw new Error('LGOOUT')
            }

            if (error.response.status === 401 && error.response.data.message === 'ACCESS_TOKEN_EXPIRED') {

                let refreshToken = store.state.auth.refreshToken

                const response = await $axios.$post('/refresh-token', { 'refreshToken': refreshToken })
                if (!response) { throw new Error('LGOOUT') }

                //Menyimpan token baru ke store/auth
                store.commit('auth/setAccessToken', response.accessToken)
                store.commit('auth/setRefreshToken', response.refreshToken)

                //request ulang 
                let originalRequest = error.config
                originalRequest.headers['Authorization'] = `Bearer ${response.accessToken}`
                return $axios(originalRequest)
            }

            return Promise.reject(error)
        } catch (error) {
            if (error.message === 'LGOOUT') {
                return redirect('/logout')
            }

            return Promise.reject(error)
        }
    })
}