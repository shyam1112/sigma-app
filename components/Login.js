import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Login() {
  const navigation = useNavigation();

  const NavigateToSignup = () => {
    navigation.navigate('signup'); // Ensure "signup" is registered in the navigator
  };

  const navigateToHomePage = () => {
    navigation.navigate('homepage');
  }

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
          style={styles.input}
          placeholder="Email or Username"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput 
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot your Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={navigateToHomePage}>
          <Text style={styles.signInText}>Sign In</Text>
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
    justifyContent: 'center', // Centers all content vertically
    paddingHorizontal: 25,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center', // Aligns header content horizontally
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
    width: '100%', // Makes form take full width
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
    alignItems: 'center', // Aligns footer content to the center
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
