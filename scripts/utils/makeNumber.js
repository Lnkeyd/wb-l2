// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const makeNumber = (min = 1, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}