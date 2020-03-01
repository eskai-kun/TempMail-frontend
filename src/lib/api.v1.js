
export default class API{
     info = {
         url: process.env.API_URL
    }
    constructor(){
    }

    createEmail(query){
        return fetch(this.info.url, {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                   },
                   body: JSON.stringify({query: query})
                })
                .then(r => r.json())
         }

}