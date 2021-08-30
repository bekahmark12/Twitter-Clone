import axios from "axios";

class UserClient {
    static async getBearerToken(credentials) {
        console.log(credentials)
        try {
            const token = await axios.post(
                "http://localhost:8080/api/users/",
                JSON.stringify(credentials),
                { headers: { "Content-Type": "application/json"}});
                console.log(credentials)
            return token;
        } catch (err) {
            if (err.response) {
                console.log(err.response)
                return {error: err.response.data.error, status: err.response.status};
            }
            console.log(err.response)
            return { error: "Unexpected Error", status: 500 };
        }
    }

 
    static async getUser(cb) {
        var token = localStorage.getItem('token')
        try {
            const user = await axios.get(
                "http://localhost:8080/api/users/",
                { headers: { "Content-Type": "application/json", "Authorization": token }});
                if (user.data.hasOwnProperty('user_type')) {
                    localStorage.setItem('userType', user.user_type);
                  } else {
                    console.log("Didn't receive a user type on authentication");
                  }
                return cb(user.data, null);
        } catch (err) {
            return cb(null, err.response ? err.response.data : {error: "Unexpected error getting user"} );
        }
    }

    static async getFollowers() {
        var token = localStorage.getItem('token')
        try {
            const followers = await axios.get(
                "http://localhost:8080/api/users/bekah/followers",
                { headers: { "Content-Type": "application/json", "Authorization": token }});
                return followers.data;
        } catch (err) {
            if (err.response) {
                console.log(err.response)
                return err.response.data;
            }
            console.log(err.response)
            return { error: "Unexpected Error getting followers"};
        }
    }

    static async getFollowing(cb) {
        var token = localStorage.getItem('token')
        try {
            const following = await axios.get(
                "http://localhost:8080/api/users/bekah",
                { headers: { "Content-Type": "application/json", "Authorization": token }});
                return cb(following.data);
        } catch (err) {
            if (err.response) {
                console.log(err.response)
                return cb(err.response.data);
            }
            console.log(err.response)
            return cb({ error: "Unexpected Error getting following"});
        }
    }
}
export default UserClient