import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator,ToastAndroid } from 'react-native';
import { UserType } from './UserContext';
import config from '../config.json';
import axios from 'axios';

export default function User({ item }) {
    // console.log("Item in users : ", item);
    const { userId } = useContext(UserType);
    const [isLoading, setIsLoading] = useState(false); // State to track loading status

    const handleSendRequest = async (currentUserId, selectedUserId) => {
      console.log("Current User ID: ", currentUserId);
      console.log("Selected User ID: ", selectedUserId);
  
      setIsLoading(true); // Start the loader
      try {
          const ids = { currentUserId, selectedUserId };
          const response = await axios.post(`${config.HOST}/api/auth/friend-request`, ids);
  
          console.log("Response Data: ", response?.data);
  
          if (response?.data?.message) {
              ToastAndroid.show(response.data.message, ToastAndroid.LONG);
          } else {
              ToastAndroid.show("Unexpected error occurred.", ToastAndroid.LONG);
          }
      } catch (error) {
          if (error.response) {
              // Backend error
              console.error("Error Response: ", error.response);
              ToastAndroid.show(error.response.data?.error || "Server error occurred.", ToastAndroid.LONG);
          } else if (error.request) {
              // Request error
              console.error("Error Request: ", error.request);
              ToastAndroid.show("Network error. Please check your connection.", ToastAndroid.LONG);
          } else {
              // Other errors
              console.error("Error Message: ", error.message);
              ToastAndroid.show("An unexpected error occurred. Please try again.", ToastAndroid.LONG);
          }
      } finally {
          setIsLoading(false); // Stop the loader
      }
  };
  

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.chatItem]}>
                <View style={styles.chatInfo}>
                    <Text style={styles.userName}>{item._id}</Text>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.chatMessage}>{item.email}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleSendRequest(userId, item._id)} 
                    disabled={isLoading} // Disable button while loading
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFF" /> // Show loader inside the button
                    ) : (
                        <Text style={styles.buttonText}>Add Friend</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 5,
    },
    chatItem: {
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    chatMessage: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
