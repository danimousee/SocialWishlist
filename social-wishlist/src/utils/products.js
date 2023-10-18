import { search } from "./global";

export const searchProducts = (input, response) => {
    let data;
    if(input !== null) {
        data = search(response, input);
        console.log("data", data);
      } else {
        data = response;
      }
      return data;
}