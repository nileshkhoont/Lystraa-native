import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Home Assets Icons for Bottom Bar
import HomeIcon from '../assets/home/homeicon.svg';
import SearchIcon from '../assets/home/searchh.svg';
import HeartIcon from '../assets/home/heart.svg';
import BellIcon from '../assets/home/bell-notification.svg';
import UserIcon from '../assets/home/user.svg';

export default function BottomBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomBar}>
      <View style={styles.tabs}>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("MainHome" as never)}>
          <HomeIcon width={60} height={58} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Search" as never)}>
          <SearchIcon width={60} height={60} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Like" as never)}>
          <HeartIcon width={28} height={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Notification" as never)}>
          <BellIcon width={28} height={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Home" as never)}>
          <UserIcon width={28} height={28} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  tabs: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  iconBox: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
