let address = (window.location.href).split(":");
address = `${address[0]}:${address[1]}:4020`

console.log(address)


export const socket = io(address)   




