const errors = require('./errors')

module.exports = function (jokesData) {
    if(!jokesData) 
        throw "Invalid argument for jokesData"
    
    return { 
        getJokes : getJokes,
        getJoke : getJoke,
        updateJoke : updateJoke,
        createJoke : createJoke,
        deleteJoke : deleteJoke, 
        validateCredentials: validateCredentials
    }


    async function getJokes(userId, searchText, skip, limit){
        // Code commented to bypass login, just for easing development
        if(!userId || userId.constructor != String)
            return Promise.reject("Invalid user Id")
        return jokesData.getJokes(searchText,skip, limit)
                .then(jokes => jokes.filter(j => j.userId == userId))
    }
    
    async function getJoke(id){
        if(!(Number(id))) 
            return Promise.reject(errors.INVALID_ID)
        return jokesData.getJoke(id)
    }
    
    async function createJoke(userId, text){
        return jokesData.createJoke(userId, text)
    }
    
    async function updateJoke(id, text){
        console.log("updateJoke")
    }
      
    async function deleteJoke(userId, id){ 
        // TODO: Verify if the joke belongs to user with 'userId'
        return jokesData.deleteJoke(id)
    }

    async function validateCredentials(username, password){
        if(!username || !password) {
            throw errors.INVALID_CREDENTIALS
        } 

        return jokesData.getUserByUsername(username)
            .then(verifyPassword)

        function verifyPassword(user) {
            if(user.password == password)
                return user.userId
                // return {
                //     userId: user.userId,
                //     userName: user.userName
                // }
            throw  errors.INVALID_CREDENTIALS
        }
    }
    
}

