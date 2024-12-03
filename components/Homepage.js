import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from './Chat';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

export default function Homepage(){
  return (
    <Tab.Navigator
      initialRouteName="chat"
      activeColor="#1e76e9"
      style={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}