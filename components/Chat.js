import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chat = () => {
  const messages = [
    { id: '1', name: 'Claudia Alves', message: 'Do more of what you love.', time: '3m ago', unread: true },
    { id: '2', name: 'Dani Martinez', message: 'Do your own thing.', time: '5m ago', unread: false },
    { id: '3', name: 'Kimberly Nguyen', message: 'Kindness is beautiful.', time: '1h ago', unread: false },
    { id: '4', name: 'Mariana Napolitani', message: 'Live your purpose.', time: '2h ago', unread: true },
    { id: '5', name: 'Olivia Wilson', message: 'You got this.', time: '5h ago', unread: false },
    { id: '6', name: 'Rachelle Beaudry', message: 'You’re wonderful.', time: 'Yesterday', unread: false },
    { id: '7', name: 'Soo Jin Ae', message: 'Keep it simple.', time: 'Yesterday', unread: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Messages & Chat</Text>
      </View> */}
      
      {/* <View style={styles.filters}>
        <TouchableOpacity style={styles.markAllRead}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by time</Text>
          <Icon name="arrow-drop-down" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View> */}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.chatItem, item.unread && styles.unread]}>
            <View style={styles.chatInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
            {item.unread && <View style={styles.unreadIndicator} />}
          </View>
        )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 5
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
  chatItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 10,
    marginHorizontal:10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unread: {
    backgroundColor: '#E8F4FF',
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
  time: {
    fontSize: 12,
    color: '#999',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF4D4D',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerButton: {
    alignItems: 'center',
  },
});

export default Chat;
