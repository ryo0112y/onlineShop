import axios from 'axios';

function axiosService(requestUrl, jwt, requestBody) {

    const fetchData = {
        headers:{
            "Content-Type": "application/json",
        },
    }

    if(jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;
    }

    if(requestBody) {
        fetchData.data = requestBody
    }


    
  return (
      axios(requestUrl, fetchData)
  )
}

export default axiosService;