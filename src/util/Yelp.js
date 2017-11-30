const clientId = "7w7uVI0EASxE7LJodrp_pg"
const secret = "sJFPLyAHNtkW7CWo40P2tLpPAZDx99zcWd7zJAxZ4qVPpXKOex8LWfg2MejKN4Zw"
let accessToken;

const Yelp = {
    getAccessToken(){
        if(accessToken){
            return new Promise(resolve => resolve(accessToken));
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, 
        {method: "POST"
        }).then(response =>{ return response.json()
        }).then(jsonResponse => accessToken = jsonResponse.access_token)
    },

    search(term, location, sortBy){
        return Yelp.getAccessToken().then(() => {return fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
        {headers:{Authorization:`Bearer ${accessToken}`}})}).then(response => {
            return response.json();
          }).then(jsonResponse => {if(jsonResponse.businesses){
            return jsonResponse.businesses.map(business => ({
                id: business.id,
                imageSrc: business.imageSrc,
                name: business.name,
                address: business.address,
                city: business.city,
                state: business.state,
                zipCode: business.zipCode,
                category: business.category,
                rating: business.rating,
                reviewCount: business.reviewCount
            }))
          }
        })
    }
};

export default Yelp;