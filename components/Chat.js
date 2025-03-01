import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserType } from './UserContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from 'jwt-decode'; // Corrected import
import axios from 'axios';
import config from '../config.json';
import User from './User';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("Auth token not found");
        const decodedToken = jwtDecode(token);
        console.log("Decoded token: ", decodedToken);

        const userId = decodedToken.id;
        setUserId(userId);

        const response = await axios.get(`${config.HOST}/api/auth/users/${userId}`);
        console.log("Fetched users: ", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error while fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  console.log("Users: ", users);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages & Chat</Text>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.markAllRead}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by time</Text>
          <Icon name="arrow-drop-down" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <FlatList
          data={users}
          keyExtractor={(item) => item.id} // Ensure unique key for each user
          renderItem={({ item }) => <User item={item} />} // Pass the item prop to User
          ListEmptyComponent={
              <Text style={styles.noUsersText}>No users found. Please try again later.</Text>
          }
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 5,
  },
  header: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  markAllRead: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  markAllText: {
    fontSize: 14,
    color: '#333',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#4A90E2',
    marginRight: 8,
  },
  noUsersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default Chat;
