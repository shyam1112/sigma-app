import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ActivityIndicator, 
  ToastAndroid 
} from 'react-native';
import config from '../config.json';

export default function Signup() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const REGISTER_URL = `${config.HOST}/api/auth/register`;

  const navigateToLogin = () => {
    navigation.navigate("login");
  };

  const handleRegister = async () => {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      // return passwordRegex.test(password);
      return password;
    };

    if (!name.trim() || !email.trim() || !password.trim() || !conPassword.trim()) {
      ToastAndroid.show("All fields are required!", ToastAndroid.LONG);
      return;
    }

    if (!validateEmail(email)) {
      ToastAndroid.show("Invalid email address!", ToastAndroid.LONG);
      return;
    }

    if (!validatePassword(password)) {
      ToastAndroid.show(
        "Password must include 8+ characters, uppercase, lowercase, number, and a special character.",
        ToastAndroid.LONG
      );
      return;
    }

    if (password !== conPassword) {
      ToastAndroid.show("Passwords do not match!", ToastAndroid.LONG);
      return;
    }

    setIsLoading(true);

    try {
      const user = { name: name.trim(), email: email.trim().toLowerCase(), password };
      const response = await axios.post(REGISTER_URL, user);

      if (response?.data) {
        ToastAndroid.show("Registration successful!", ToastAndroid.LONG);
        navigation.navigate("login");
      } else {
        ToastAndroid.show("Unexpected error occurred.", ToastAndroid.LONG);
      }
    } catch (error) {
      if (error.response) {
        ToastAndroid.show(error.response.data?.message || "Server error occurred.", ToastAndroid.LONG);
      } else if (error.request) {
        ToastAndroid.show("Network error. Please check your connection.", ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Registration failed. Try again later.", ToastAndroid.LONG);
      }
    } finally {
      setIsLoading(false);
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
          onChangeText={(text) => setEmail(text.toLowerCase())}
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
          onChangeText={(text) => setConPassword(text)}
          placeholder="Confirm Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true}
        />

        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={handleRegister} 
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.signupText}>Sign Up</Text>
          )}
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
