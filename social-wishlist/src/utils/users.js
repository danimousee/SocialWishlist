import { fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from "../actions/users";
import { getAllUsers } from "../firebase/queries/users";
import { search } from "./global";

export const getUsers = async (input, dispatch) => {
    console.log("getUsers input", input);
    dispatch(fetchUsersStart())
        try {
           const data = await getAllUsers(input);
            dispatch(fetchUsersSuccess(data))
        } catch(e) {
            dispatch(fetchUsersFailure(e.message))
            console.log(e);
        }
}

export const searchUsers = (input, response) => {
    let data;
    if(input !== null) {
        data = search(response, input);
      } else {
        data = response;
      }
      return data;
}