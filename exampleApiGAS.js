const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=2UBkBwHcVUN_grW9DxuR0EpH3b1yhpP1uUxI9yOvSRK1lM4P0yNfpCqxZffqjN6Cn_y77y7jbmjMNmv6Q0hZO3KKN0HWT6UCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHgnESSZBCazMkIvcr73wjkJd6xIRZmAG0wTSFBye71slEhUC374m4KqhRlimzZh8kwRPVxkTg6IS2p9GZMaajcYgZBvSPGN59z9Jw9Md8uu&lib=M1_qYwtQ_7_jacpcpkhFADTZ1D43tM-ww'

async function conectar () {
    const response = await fetch(url);
    const data = await response.json()
    return data
}

(
    async () => {
        console.log( await conectar())
    }
)()

// let url2 = 'https://script.google.com/macros/s/AKfycbwbX9K2gfWQkcxSkcZQavjJpoIATCpB1ztaDNldcQruShV0SQqINUtR75eqGP3taGr-Qg/exec'
let url2 = 'https://script.google.com/macros/s/AKfycbz9zPUbK51kusXd3NirymwtTATmyKXiLSu6eaa24eEQh8F7MyFsOS7cTKb8QZLtGMvsMQ/exec'

fetch(`${url2}?type=cot`,{
    method : 'POST' ,
    // mode : 'no-cors' ,
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify([{ "" : "" ,"nombre" : 'nadie' , "contrasena" : "nadie28"}])
})
    // .then(response => console.log(response))
    .then(response => response.json())
    .then(data => console.log('Respuesta : ' , data))
    .catch(error => console.error('Ocurrió un error: ' , error))