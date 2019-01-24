
const ONEMINUTE = 60
const ONEHOUR = ONEMINUTE * 60
const ONEDAY = ONEHOUR * 24

export default (second: number) => {
    let day = Math.floor(second / ONEDAY)
    second -= day * ONEDAY
    let hour = Math.floor(second / ONEHOUR)
    second -= hour * ONEHOUR
    let minute = Math.floor(second / ONEMINUTE)
    second -= minute * ONEMINUTE
    return { day, hour, minute, second }
}
