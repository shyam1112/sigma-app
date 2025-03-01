import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text , View} from "react-native"
import config from '../config.json';

const Friends = () =>{
    const { userId, setUserId } = useContext(UserType);
    const [friendRequests,setFriendRequests] = useState([]);

    useEffect(()=>{
        fetchFriendRequest();
    })

    const fetchFriendRequest = async () => {
        try{
            const response = await axios.get(`${config.HOST}/api/auth/friend-request/${userId}`);
            if(response.status == 200){
                const friendRequestsData = response.data.map((friendRequest) => ({
                    _id: friendRequest._id,
                    name:friendRequest.name,
                    email:friendRequest.email
                }))
                setFriendRequests(friendRequestsData);
            }
        }catch(error){
            console.log("fetchFriendRequest - Error message : ",error);
        }
    }

    return(
        <View>
            <Text>Friends</Text>
        </View>
    )
}

export default Friends;

const style = StyleSheet.create({

})