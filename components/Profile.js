import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
        
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://i.pravatar.cc/150', // Placeholder avatar
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Jonathan Patterson</Text>
          <Text style={styles.email}>hello@reallygreatsite.com</Text>
        </View>

        <Divider style={styles.divider} />

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          <View style={styles.row}>
            <Icon name="brightness-6" size={24} color="#555" />
            <Text style={styles.rowText}>Mode</Text>
            <Switch
              style={styles.toggle}
              value={isDarkMode}
              onValueChange={toggleDarkMode}
            />
          </View>
          <TouchableOpacity style={styles.row}>
            <Icon name="lock-outline" size={24} color="#555" />
            <Text style={styles.rowText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Icon name="language" size={24} color="#555" />
            <Text style={styles.rowText}>Language</Text>
          </TouchableOpacity>
        </View>

        <Divider style={styles.divider} />

        {/* Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>
          <TouchableOpacity style={styles.row}>
            <Icon name="info-outline" size={24} color="#555" />
            <Text style={styles.rowText}>About App</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Icon name="gavel" size={24} color="#555" />
            <Text style={styles.rowText}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Icon name="privacy-tip" size={24} color="#555" />
            <Text style={styles.rowText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Icon name="share" size={24} color="#555" />
            <Text style={styles.rowText}>Share This App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  divider: {
    marginVertical: 8,
    backgroundColor: '#ddd',
    height: 1,
  },
  section: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1, // For shadow effect
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  toggle: {
    marginLeft: 'auto',
  },
});

export default ProfileScreen;
