import axios from 'axios'
import jwtDecode from 'jwt-decode'
import config from '~/config'

export default {
    async writeFavRouteToDB(userID, fromLocation, destination) {
        axios.post(`${config.api}/api/favRoute`, {
            startPoint: fromLocation,
            destination: destination
        })
        .then((response) => {
            // let authData = response.data
            // localStorage.setItem('User', JSON.stringify(authData)) 
            console.log(response)
            window.$nuxt.$snackbar({
                message: response.data.message,
            })
        })
        .catch((error) => {
            console.error('[favRoute]', 'favRoute insert error.', error)
            return null
        })
    }
}