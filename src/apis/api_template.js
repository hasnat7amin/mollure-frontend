import axios from "axios";
import { baseUrl } from "./base_url";

async function ApiTemplate(method,url,data,headers) {
  const config = {
    method: method,
    url: baseUrl + url,
    headers: headers,
    data: data,
  };

  console.log(config)

  const response = await axios(config)
    .then(function (response) {
      const data = response.data;
      console.log(data);
      return data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

    return response;
}

export default ApiTemplate;
 