async function getAPI(){
    try{
        const urlAPI = await fetch('https://681a35ae1ac1155635083dd2.mockapi.io/api/v1/data')
        const data = await urlAPI.json();
        console.log(data)
        return(data)
    }catch(error){
        console.log('Error', error)
    }
}

getAPI()
//TRAER INFORMACION PERSONAJES

