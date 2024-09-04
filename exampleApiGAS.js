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

// let url2 = 'https://script.google.com/macros/s/AKfycbxa0v7KznY-9SFl8lP7tPwX1WYNQQUw1Unv8QaCfbPrZbK5jPnayJQjwyBZo9bd28Qp/exec'
// let url2 = 'https://script.google.com/macros/s/AKfycbwz2HIdp5aaFngEoeQgB9uRS0CZFlkWkoVYg85ujXMohlYmOBgI2NYupOiyllus7GUoqg/exec'
// let url2 = 'https://script.google.com/macros/s/AKfycbyEDHKpKOcWGkcleQaWe2oUglLN1sbYFPpr0o_U-wZ9YgVZzCH-N3JDYQuLNOL5vXAW6Q/exec'
let url2 = 'https://script.google.com/macros/s/AKfycbzgl9vmX89mpKcjsCv294JfWOLX9a8DUxtrIeHsfasF4QQkj0gD8EgO1HUfz4HWYrg/exec'
fetch(`${url2}?type=cot`,{
    method : 'POST' ,
    mode : 'no-cors' ,
    headers : {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify({"nombre" : 'Boren' , "contrasena" : "BorenElRoscon28"})
})
    .then(response => response.json())
    .then(data => console.log('Respuesta : ' , data))
    .catch(error => console.error('Ocurrió un error: ' , error))