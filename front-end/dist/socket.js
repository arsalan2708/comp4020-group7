const address = ((window.location.href).
                    split(":5500")[0]) + ":4020"

const socket = io(address)     


socket.emit("openList", 'testData');

socket.on("server_response", (response)=>{
    console.log(response);
})          

