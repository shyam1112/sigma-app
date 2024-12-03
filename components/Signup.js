import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import config from '../config.json';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

export default function Signup() {
    const navigation = useNavigation();

    // Corrected function name
    const navigateToLogin = () => {
        navigation.navigate("login");
    }

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [conPassword,setConPassword] = useState("");


    // Example: Replace with your actual registration endpoint
    const REGISTER_URL = `${config.HOST}/api/auth/register`;
    console.log(REGISTER_URL);
    const handleRegister = async () => {
      try {
        // Construct the user object
        console.log(name,email,password)
        const user = {
          name: name.trim(),
          email: email.trim(),
          password: password, // Consider hashing the password on the server side
        };
    
        // Optional: Validate input fields before sending the request
        if (!user.name || !user.email || !user.password) {
          console.error("All fields are required.");
          Alert.alert(
            "All fields are required."
          )
          return;
        }
    
        // Send POST request to the registration endpoint
        const response = await axios.post(REGISTER_URL, user);
    
        // Assuming the API returns a structure like { success: true, data: {...} }
        if (response.data.success) {
          console.log("Registration successful:", response.data.data);
          Alert.alert("Registration successful","You have been registered Successfully");
          // Optionally, redirect the user or update the UI
        } else if (response.data.errors) {
          // Handle specific errors returned by the API
          console.error("Registration errors:", response.data.errors);
          Alert.alert("Registration Error","An error occurred while registering")
          // Optionally, display errors to the user
        } else {
          console.error("Unexpected response format:", response.data);
          Alert.alert("Registration Error","An error occurred while registering")
        }
      } catch (error) {
        // Handle different types of errors
    
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Server error:", error.response.data);
          // Optionally, display server error messages to the user
        } else if (error.request) {
          // Request was made but no response received
          console.error("Network error: No response received.", error.request);
          // Optionally, inform the user about network issues
        } else {
          // Something else happened while setting up the request
          console.error("Error in registration process:", error.message);
        }
      }
      setName("");
      setEmail("");
      setPassword("");
      setConPassword("");
    };
    

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subText}>Sign up to get started!</Text>
      </View>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Full Name"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email Address"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput 
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true}
        />
        <TextInput 
          style={styles.input}
          value={conPassword}
          onChangeText={(text)=> setConPassword(text)}
          placeholder="Confirm Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account? 
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    color: '#333',
  },
  signupButton: {
    backgroundColor: '#1974dd',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loginText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});
