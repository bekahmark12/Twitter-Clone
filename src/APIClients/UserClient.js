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
            return token.data;
        } catch (err) {
            if (err.response) {
                console.log(err.response)
                return err.response.data;
            }
            console.log(err.response)
            return { error: "Unexpected Error" };
        }
    }

 
    static async getUser() {
        var token = localStorage.getItem('token')
        try {
            const user = await axios.get(
                "http://localhost:8080/api/users/",
                { headers: { "Content-Type": "application/json", "Authorization": token }});
                return user.data;
        } catch (err) {
            if (err.response) {
                console.log(err.response)
                return err.response.data;
            }
            console.log(err.response)
            return { error: "Unexpected Error getting user"};
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