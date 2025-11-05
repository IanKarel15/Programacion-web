const options = {
    headers: {
        'x-api-key': 'live_s8dFVWXYGNNshWQIP2oI5xtk2q4wsLsTkkXjVkuMU1UafOWcdrnw4K0LLgLVMZD9'
    }
}

function getPageCount(response) {
    const total = parseInt(response.headers.get('Pagination-Count'));
    const limit = parseInt(response.headers.get('Pagination-Limit'));
    return Math.ceil(total / limit);
}

export async function getBreeds(page, limit){
    const apiUrl = "https://api.thecatapi.com/v1/breeds";
    const apiImageUrl = "https://api.thecatapi.com/v1/images/";
    try {
        const response = await fetch(`${apiUrl}?limit=${limit}&page=${page - 1}`, options); 
        if(!response.ok){
            throw new Error("Error " + response.status)
        }
        
        let pageCount = getPageCount(response);
        return {
            breeds: await response.json(),
            pageCount
        };
    }catch (error) {
        console.error(error);
    }


}

export async function getBreed (id){
    const apiImageUrl = "https://api.thecatapi.com/v1/images/";
    try {
        const response = await fetch(`${apiImageUrl}${id}`, options);

        if(!response.ok){
            throw new Error("Error " + response.status)
        }
        return {
            breed: await response.json(),
        };
    } catch (error) {
        console.error(error);
    }
}