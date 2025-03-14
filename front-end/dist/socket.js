const address = ((window.location.href).
                    split(":5500")[0]) + ":4020"

export const socket = io(address)   




