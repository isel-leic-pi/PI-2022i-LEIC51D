{
    document.querySelectorAll('span.delete')
        .forEach(btn => btn.addEventListener('click', processDelete))

    const token = document.querySelector('#jokes').dataset.token
        
    async function processDelete(e) {

        const jokeId = this.id.replace('delete-', '')
        const uri = `/api/jokes/${jokeId}`
        console.log(uri)

        const options = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'

        }
        const rsp = await fetch(uri, options)
        if(rsp.status == 200) {
            //location.reload()
            const divJoke = document.querySelector(`#joke-${jokeId}`)
            divJoke.parentElement.removeChild(divJoke)
            rearrangeJokes()
        }
    }

    function rearrangeJokes() {
        const jokesElem = document.querySelectorAll('div.joke')
        jokesElem.forEach(je => je.parentElement.removeChild(je))
        const jokesRows = document.querySelectorAll('div.joke-row')
        const numJokes = jokesElem.length
        jokesRows.forEach((jr, idx) => { 
            if(idx*2 < numJokes) { 
                jr.appendChild(jokesElem[idx*2])
                if(idx*2+1 < numJokes)
                    jr.appendChild(jokesElem[idx*2+1])
            } else {
                jr.parentElement.removeChild(jr)
            }
        })
    }
}