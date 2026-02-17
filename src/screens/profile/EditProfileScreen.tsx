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
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary, Asset } from "react-native-image-picker";
import { ResponsiveGreenHeader } from '../../components/CommonComponents';
import Arrow from '../../assets/images/Arrow1.svg';
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { 
  useGetUserProfileQuery, 
  useUpdateProfileWithImageMutation 
} from '../../api/user/userApi';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  profileImageUrl?: string;
}

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<Asset | null>(null);
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  // Fetch user profile
  const { data: profileData, isLoading: profileLoading, refetch } = useGetUserProfileQuery();
  
  // Update profile mutation
  const [updateProfile, { isLoading: updateLoading }] = useUpdateProfileWithImageMutation();

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

    // Load user data from API
    if (profileData?.success && profileData.user) {
      const u = profileData.user;
      console.log('📥 Edit Profile - Loaded user data:', {
        firstName: u.firstName,
        profileImage: u.profileImage,
        profileImageUrl: u.profileImageUrl
      });
      setFirstName(u.firstName);
      setLastName(u.lastName);
      setEmail(u.email);
      if (u.profileImageUrl) {
        console.log('🖼️ Setting image URI:', u.profileImageUrl);
        setImage({
          uri: u.profileImageUrl
        } as Asset);
      }
    }

    return () => clearTimeout(timer);
  }, [profileData]);

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
          setImageChanged(true);
        }
      }
    );
  };

  // ⬆ Upload Profile
  const handleUpdate = async (): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);

      // Only append image if it was changed and is a local file
      if (imageChanged && image?.uri && !image.uri.startsWith('http')) {
        formData.append("profileImage", {
          uri: image.uri,
          type: image.type || "image/jpeg",
          name: image.fileName || "profile.jpg"
        } as any);
      }

      const result = await updateProfile(formData).unwrap();

      console.log('✅ Update Result:', JSON.stringify(result, null, 2));
      console.log('📸 Updated Image URL:', result.user?.profileImageUrl);
      console.log('🖼️ Updated Image Path:', result.user?.profileImage);

      if (result.success) {
        // Force update local image state with cache-busting timestamp
        if (result.user.profileImageUrl) {
          setImage({
            uri: result.user.profileImageUrl + `?t=${Date.now()}`
          } as Asset);
        }
        
        // Update AsyncStorage with the transformed user data
        await AsyncStorage.setItem("user", JSON.stringify(result.user));
        
        Toast.show({
          type: 'success',
          text1: 'Profile Updated Successfully',
          text2: 'Your profile has been updated',
          position: 'top',
          visibilityTime: 2000,
        });

        // Navigate back after 1.5 seconds
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
    } catch (error: any) {
      console.error("Update error:", error);
      
      Alert.alert(
        'Update Failed',
        error?.data?.message || 'Failed to update profile. Please try again.',
        [{ text: 'OK' }]
      );
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
            {profileLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1E4D3A" />
                <Text style={styles.loadingText}>Loading profile...</Text>
              </View>
            ) : (
              <>
                {/* Avatar */}
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      key={image?.uri || 'default'}
                      source={
                        image?.uri
                          ? { uri: image.uri }
                          : { uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
                      }
                      style={styles.avatar}
                      onLoad={() => console.log('✅ Edit: Image loaded successfully', image?.uri)}
                      onError={(error) => console.log('❌ Edit: Image load error:', error.nativeEvent.error)}
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
                  placeholderTextColor="#9CA3AF"
                  editable={!updateLoading}
                />

                {/* Last Name */}
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#9CA3AF"
                  editable={!updateLoading}
                />

                {/* Email */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={[styles.input, styles.disabledInput]}
                  placeholder="Email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={false}
                />

                <TouchableOpacity 
                  style={[styles.saveButton, updateLoading && styles.saveButtonDisabled]} 
                  onPress={handleUpdate}
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.saveText}>Update</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
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

  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
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

  disabledInput: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },

  saveButton: {
    backgroundColor: "#1E4D3A",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default EditProfileScreen;
