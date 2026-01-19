import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import CardHeader from "../../assets/images/cardheader.svg";
import Arrow from "../../assets/images/Arrow 1.svg";

export default function EditProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  // 🔐 Ask permission
  const requestPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
    }
  };

  useEffect(() => {
    requestPermission();

    const loadUser = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const u = JSON.parse(data);
        setFirstName(u.firstName);
        setLastName(u.lastName);
        setEmail(u.email);
        if (u.profileImage) {
          setImage({
            uri: "https://cusped-magen-unforwarded.ngrok-free.dev" + u.profileImage
          });
        }
      }
    };

    loadUser();
  }, []);

  // 📷 Open Gallery
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1
      },
      res => {
        if (res.didCancel) return;
        if (res.assets && res.assets.length > 0) {
          setImage(res.assets[0]);
        }
      }
    );
  };

  // ⬆ Upload Profile
  const handleUpdate = async () => {
    try {
      // Save locally first for immediate display
      const updatedUser = {
        firstName,
        lastName,
        email,
        profileImage: image?.uri || null,
        localImage: image?.uri || null // Store local image URI
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

      // Try to upload to server
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);

        if (image?.uri) {
          formData.append("profileImage", {
            uri: image.uri,
            type: image.type || "image/jpeg",
            name: image.fileName || "profile.jpg"
          });
        }

        const res = await fetch(
          "https://cusped-magen-unforwarded.ngrok-free.dev/api/auth/update",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: formData
          }
        );

        const data = await res.json();

        if (data.success) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }
      }

      // Navigate back regardless of server response
      navigation.goBack();
    } catch (error) {
      console.log("Update error:", error);
      // Still navigate back even if upload fails
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* GREEN HEADER */}
          <View style={styles.headerOuter}>
            <CardHeader width={420} height={220} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <View style={styles.backRow}>
                <Arrow width={22} height={22} />
                <Text style={styles.title}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* WHITE CARD */}
          <View style={styles.content}>
            {/* Avatar */}
            <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={
                    image?.uri
                      ? { uri: image.uri }
                      : { uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                  }
                  style={styles.avatar}
                />
                <View style={styles.editBadge}>
                  <Text style={{ color: "#fff", fontSize: 12 }}>✎</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* First Name */}
            <Text style={styles.label}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholder="First Name"
            />

            {/* Last Name */}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholder="Last Name"
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
              <Text style={styles.saveText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  /* HEADER */
  headerOuter: {
    height: 180,
    overflow: "hidden",
    marginTop: Platform.OS === "android" ? -StatusBar.currentHeight : 0
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 60 : 90,
    left: 20
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  title: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "700",
    color: "#fff"
  },

  /* WHITE CARD */
  content: {
    backgroundColor: "#FFFFFF",
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    flex: 1
  },

  avatarContainer: {
    alignSelf: "center",
    marginVertical: 20
  },

  avatarWrapper: {
    position: "relative",
    width: 120,
    height: 120
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e5e7eb"
  },

  editBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff"
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB",
    color: "#111827",
    marginTop: 8
  },

  saveButton: {
    backgroundColor: "#1E4D3A",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
