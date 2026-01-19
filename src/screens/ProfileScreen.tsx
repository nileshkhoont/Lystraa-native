import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, CommonActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

import CardHeader from "../assets/images/cardheader.svg";
import Arrow from "../assets/images/Arrow 1.svg";
import EditIcon from "../assets/images/editicon.svg";
import Frame from "../assets/images/Frame.svg";
import Frame123 from "../assets/images/Frame123.svg";

// Home Assets Icons for Bottom Bar
import HomeIcon from "../assets/home/homeicon.svg";
import SearchIcon from "../assets/home/searchicon.svg";
import HeartIcon from "../assets/home/heart.svg";
import BellIcon from "../assets/home/bell-notification.svg";
import UserIcon from "../assets/home/user.svg";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadUser = async () => {
        const data = await AsyncStorage.getItem("user");
        if (data) setUser(JSON.parse(data));
      };
      loadUser();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              if (token) {
                const response = await fetch(
                  "https://cusped-magen-unforwarded.ngrok-free.dev/api/auth/delete-account",
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                const data = await response.json();

                if (data.success || response.ok) {
                  Alert.alert("Success", "Account deleted.");
                  await AsyncStorage.removeItem("token");
                  await AsyncStorage.removeItem("user");
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "Login" }],
                    })
                  );
                } else {
                  Alert.alert("Error", data.message || "Failed to delete account");
                }
              }
            } catch (error) {
              Alert.alert("Error", "Network error. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        {/* HEADER */}
        <View style={styles.headerOuter}>
          <CardHeader width={420} height={220} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <View style={styles.backRow}>
              <Arrow width={22} height={22} />
              <Text style={styles.title}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
          >
            <View style={styles.profileContent}>
              <TouchableOpacity
                style={styles.avatarWrapper}
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Image
                  source={
                    user?.localImage
                      ? { uri: user.localImage }
                      : user?.profileImage
                      ? { uri: "https://cusped-magen-unforwarded.ngrok-free.dev" + user.profileImage }
                      : { uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                  }
                  style={styles.avatar}
                />
                <View style={styles.editBadge}>
                  <Text style={{ color: "#fff", fontSize: 10 }}>✎</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.profileRow}>
                <View style={styles.profileInfo}>
                  <Text style={styles.userName}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                  style={styles.rightEditIcon}
                >
                  <EditIcon width={20} height={20} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingsContainer}>
              <Text style={styles.sectionTitle}>General</Text>

              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Notification")}>
                <Text style={styles.rowText}>Notification</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("ChangePassword")}>
                <Text style={styles.rowText}>Change Password</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("TermsCondition")}>
                <Text style={styles.rowText}>Terms & Condition</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Help & Feedback</Text>

              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("NeedHelp")}>
                <Text style={styles.rowText}>Need Help?</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("PrivacyPolicy")}>
                <Text style={styles.rowText}>Privacy Policy</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("RateUs")}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.rowText}>Rate Us</Text>
                  <Frame123 width={80} height={16} />
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row} onPress={handleLogout}>
                <Text style={styles.rowText}>Log Out</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteRow} onPress={handleDeleteAccount}>
                <Frame width={16} height={16} />
                <Text style={styles.deleteText}>Delete Account</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* ===== FIXED & CENTERED BOTTOM BAR ===== */}
        <View style={styles.bottomBar}>
          <View style={styles.tabs}>

            <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Home")}>
              <HomeIcon width={60} height={58} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Search")}>
              <SearchIcon width={60} height={58} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Favorites")}>
              <HeartIcon width={28} height={28} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("Notification")}>
              <BellIcon width={28} height={28} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("HomeScreen")}>
              <UserIcon width={28} height={28} />
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerOuter: {
    height: 180,
    overflow: "hidden",
    marginTop: Platform.OS === "android" ? -StatusBar.currentHeight : 0,
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 60 : 90,
    left: 20,
  },

  backRow: { flexDirection: "row", alignItems: "center" },

  title: { marginLeft: 12, fontSize: 20, fontWeight: "700", color: "#fff" },

  content: {
    backgroundColor: "#fff",
    marginTop: -25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    overflow: "hidden",
    elevation: 10,
  },

  profileContent: { padding: 20, position: "relative" },

  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: "absolute",
    top: 18,
    left: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  avatar: { width: 48, height: 48, borderRadius: 24 },

  editBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  profileRow: { flexDirection: "row", marginLeft: 64, alignItems: "center" },

  rightEditIcon: { marginTop: -10 },

  profileInfo: { flex: 1 },

  userName: { fontSize: 18, fontWeight: "700" },

  userEmail: { color: "#6B7280" },

  settingsContainer: { paddingHorizontal: 20 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6EAEA",
  },

  rowText: { color: "#4B5563" },

  arrow: { fontSize: 22, color: "#9CA3AF" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00140B",
    marginTop: 10,
    marginBottom: 6,
  },

  deleteRow: { flexDirection: "row", marginTop: 20 },

  deleteText: { marginLeft: 8, color: "#EF4444" },

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
    justifyContent: "space-evenly", // 👈 PERFECT CENTER FIX
    alignItems: "center",
  },

  iconBox: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
