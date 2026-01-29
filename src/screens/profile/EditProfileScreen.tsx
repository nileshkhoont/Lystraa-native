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
import { launchImageLibrary, Asset } from "react-native-image-picker";
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Arrow from '../../assets/images/Arrow1.svg';
import { useNavigation } from "@react-navigation/native";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  localImage?: string;
}

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<Asset | null>(null);

  // 🔐 Ask permission
  const requestPermission = async (): Promise<void> => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: "Photo Library Permission",
            message: "App needs access to your photos",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    // Delay permission request to ensure Activity is ready
    const timer = setTimeout(() => {
      requestPermission();
    }, 500);

    const loadUser = async (): Promise<void> => {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const u: UserData = JSON.parse(data);
        setFirstName(u.firstName);
        setLastName(u.lastName);
        setEmail(u.email);
        if (u.profileImage) {
          setImage({
            uri: "https://cusped-magen-unforwarded.ngrok-free.dev" + u.profileImage
          } as Asset);
        }
      }
    };

    loadUser();

    return () => clearTimeout(timer);
  }, []);

  // 📷 Open Gallery
  const pickImage = (): void => {
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
  const handleUpdate = async (): Promise<void> => {
    try {
      // Save locally first for immediate display
      const updatedUser: UserData = {
        firstName,
        lastName,
        email,
        profileImage: image?.uri || undefined,
        localImage: image?.uri || undefined
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
          } as any);
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
            <ResponsiveGreenHeader height={220} />
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
    marginTop: Platform.OS === "android" ? -StatusBar.currentHeight! : 0
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight! + 60 : 90,
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

export default EditProfileScreen;
