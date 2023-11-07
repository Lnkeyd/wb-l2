export const uniqueId = () => {
  let id = ''
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
      id += alphabet.charAt(Math.floor(Math.random() * alphabet.length)) 
    }
    id = i < 3 ? id + '-' : id
  }
  return id
}