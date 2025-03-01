import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import Forgotpass from './components/ForgotPass';
import Friends from './components/Friends';
import { UserContext } from './components/UserContext';
import ChangePassword from './components/ChangePassword';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserContext>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="homepage"
            component={HomepageWithHeader}
            options={{ headerShown: false }} // Header included inside component
          />
          <Stack.Screen
            name="forgotpassword"
            component={Forgotpass}
            options={{ headerShown: true, title: "Sigma" }}
          />
          <Stack.Screen
            name="friends"
            component={Friends}
            options={{ headerShown: true, title: "Sigma" }}
          />
          <Stack.Screen
            name="changepassword"
            component={ChangePassword}
            options={{ headerShown: true, title: "Sigma" }}
          />
        </Stack.Navigator>
      </UserContext>
    </NavigationContainer>
  );
}

// Separate Homepage wrapper to handle header navigation
function HomepageWithHeader({ navigation }) {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.apptitle}>Sigma</Text>
        <TouchableOpacity onPress={() => navigation.navigate('friends')}>
          <Ionicons name="people" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Homepage />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
  apptitle: {
    fontSize: 23,
    fontWeight: '600',
  },
});
