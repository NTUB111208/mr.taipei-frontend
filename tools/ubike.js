import axios from 'axios'

 export default {
    getUbikeApi() {
     axios
     .get(`https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json`)
     .then((response)=>{
        let ubikeDate =response.data;
        for (var i = 0; i < ubikeDate.length; i++) {
            if (ubikeDate[i].sna == "YouBike2.0_愛國金山路口") {
                localStorage.setItem('愛國金山路口-sbi', ubikeDate[i].sbi)
            }
            if (ubikeDate[i].sna == "YouBike2.0_捷運東門站(3號出口)") {
                localStorage.setItem('東門站出口-bemp', ubikeDate[i].bemp)
            }
        }
     })
    },
}