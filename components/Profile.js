import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Switch, ScrollView,ToastAndroid } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

    const showToast = (message) => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    };

  const toggleDarkMode = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  const navigateToChangePassword = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      navigation.navigate("changepassword", { email: userData || "shyam@gmail.com" });
    } catch (error) {
      showToast("Error fetching user data:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("login"); // Navigate to login screen after sign out
    } catch (error) {
      showToast("Error clearing AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150' }} // Placeholder avatar
            style={styles.avatar}
          />
          <Text style={styles.name}>Jonathan Patterson</Text>
          <Text style={styles.email}>hello@reallygreatsite.com</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          <View style={styles.row}>
            <Icon name="brightness-6" size={24} color="#555" />
            <Text style={styles.rowText}>Mode</Text>
            <Switch style={styles.toggle} value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>
          <TouchableOpacity style={styles.row} onPress={navigateToChangePassword}>
            <Icon name="lock-outline" size={24} color="#555" />
            <Text style={styles.rowText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={handleSignOut}>
            <Icon name="logout" size={24} color="#555" />
            <Text style={styles.rowText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <Divider style={styles.divider} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { paddingBottom: 16 },
  profileContainer: { alignItems: 'center', paddingVertical: 16, backgroundColor: '#fff' },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  email: { fontSize: 14, color: '#555' },
  divider: { marginVertical: 8, backgroundColor: '#ddd', height: 1 },
  section: { paddingHorizontal: 16, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8, elevation: 1, paddingVertical: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  rowText: { flex: 1, marginLeft: 16, fontSize: 16, color: '#333' },
  toggle: { marginLeft: 'auto' },
});

export default ProfileScreen;
