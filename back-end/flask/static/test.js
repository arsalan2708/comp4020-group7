document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById('listContainer')
        while(container.hasChildNodes()){container.removeChild(container.lastChild)}

    load(`/test`,'POST',0).then((res)=>{
       
        
        for( val of res)
            addListItem(val)
        
    });   
    const button = document.getElementById('tstBtn');
    
    button.addEventListener('click', () => {
        const inputValue = document.getElementById('itemName').value
        addListItem(inputValue)
        fetch(`/buttonPress/${inputValue}`, { method: `POST` })
    });

});

function addListItem(itemName){
    const item = document.createElement("li")
    item.innerText = itemName

    const container = document.getElementById('listContainer')
    container.appendChild(item);
}




function load(url,met,returnTyp=2) {
    return new Promise(async function (resolve, reject) {
        // do async thing
       const res = await fetch(url, { method: `${met}` })
       // resolve
       switch(returnTyp){
        case 0:
            resolve(res.json())
            break;
        case 1:
            resolve(res.text())
            break;
        default:
            resolve(res)
            break;
       }
        
       reject(new Error('Error No results found'))
   })
}






// Socket for page update:
const socket = io();

socket.on('data_added',()=>{

    load(`/test`,'POST',0).then((res)=>{
        const container = document.getElementById('listContainer')
        while(container.hasChildNodes()){container.removeChild(container.lastChild)}
        for( val of res)
            addListItem(val)
    });  

})



