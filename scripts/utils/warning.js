export const warning = (guessed, actual) => {
    const info = actual > guessed ? 'Загаданное число больше предложенного' : 'Загаданное число меньше предложенного'
    document.querySelector('#warning').textContent = info
}