import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from '../config.json';
import { useEffect } from 'react';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for managing loading indicator

  useEffect(()=>{
    const checkLoginStatus =  async ()=>{
      try{
        const token = await AsyncStorage.getItem("authToken");

        if(token){
          console.log("Token : ",token);
          navigation.navigate("homepage");
        }else{
          console.log("User token not available");
          navigation.navigate("login");
        }
      }catch(error){
        console.error("Error while check login status : ",error);
      }
    }

    checkLoginStatus();
  },[]);

  const LOGIN_URL = `${config.HOST}/api/auth/login`;

  const navigateToHomePage = async () => {
    console.log("Login credentials:", email, password);

    // Validate email format
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Input validation
    if (!email || !password) {
      ToastAndroid.show("Both email and password are required!", ToastAndroid.LONG);
      return;
    }

    if (!validateEmail(email)) {
      ToastAndroid.show("Validation Error! Please enter a valid email address.", ToastAndroid.LONG);
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const user = { email: email.trim(), password };
      const response = await axios.post(LOGIN_URL, user);

      // Handle server responses
      if (response?.data?.token) {
        console.log("Login successful:", response.data);
        ToastAndroid.show("Login Successful! Welcome to the homepage!", ToastAndroid.LONG);

        // Store the token for future API requests
        await AsyncStorage.setItem("authToken", response.data.token);

        await AsyncStorage.setItem("user", response.data.user.email);

        // Navigate to homepage
        navigation.navigate("homepage");
      } else {
        console.error("Unexpected response format:", response.data);
        ToastAndroid.show("Login Error! An unexpected error occurred.", ToastAndroid.LONG);
      }
    } catch (error) {
      // Handle errors based on the backend responses
      if (error.response) {
        if (error.response.status === 404) {
          ToastAndroid.show("Login Error! User not found. Please register first.", ToastAndroid.LONG);
        } else if (error.response.status === 400) {
          ToastAndroid.show("Login Error! Invalid email or password.", ToastAndroid.LONG);
        } else if (error.response.status === 500) {
          ToastAndroid.show("Server Error! Please try again later.", ToastAndroid.LONG);
        } else {
          ToastAndroid.show(
            error.response.data?.message || "An unknown error occurred.",
            ToastAndroid.LONG
          );
        }
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Network error: No response received.", error.request);
        ToastAndroid.show(
          "Network Error! Please check your internet connection.",
          ToastAndroid.LONG
        );
      } else {
        console.error("Login error:", error.message);
        ToastAndroid.show("An error occurred during the login process.", ToastAndroid.LONG);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const NavigateToSignup = async () => {
    navigation.navigate('signup'); // Ensure "signup" is registered in the navigator
  };

  const NavigateToForgotPassword = async () => {
    navigation.navigate('forgotpassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subText}>
          To continue using this app, please sign in first.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.forgotPassword} onPress={NavigateToForgotPassword}>
          <Text style={styles.forgotText}>Forgot your Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={navigateToHomePage} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.signInText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={NavigateToSignup}>
            <Text style={styles.signUpText}>Sign Up now</Text>
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
    paddingHorizontal: 25,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#1974dd',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  signUpText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});
