const getPos = (cb, fb) => {


    // console.log(p)
    // return p
    // return new Promise((res, rej) => {
    // function cb(pos) {
    //     // res(pos)
    //     console.log(pos)
    //     debugger
    //     // resolve({
    //     //     lat: pos.coords.latitude,
    //     //     long: pos.coords.longitude
    //     // })
    // }
    navigator.geolocation.getCurrentPosition(cb, fb)

    // })

}

export default {
    getPos
}