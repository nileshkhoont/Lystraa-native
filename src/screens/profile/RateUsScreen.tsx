import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  GradientButton,
  StarRating,
  InputField,
} from '../../components/CommonComponents';
import CardHeader from '../../assets/images/cardheader.svg';
import Arrow from '../../assets/images/Arrow 1.svg';
import { useSubmitRatingMutation, useGetMyRatingQuery } from '../../api/rating/ratingApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RateUsScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [errors, setErrors] = useState<{
    rating?: string;
    feedback?: string;
  }>({});

  const [submitRating, { isLoading: isSubmitting }] = useSubmitRatingMutation();
  // Skip initial query - only fetch when needed
  const { data: existingRating, refetch } = useGetMyRatingQuery(undefined, { 
    skip: true  // Don't auto-fetch on mount to avoid 404 errors
  });

  // Check token on mount
  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      console.log('🔑 Token exists:', !!token);
      if (token) {
        console.log('🔑 Token preview:', token.substring(0, 30) + '...');
      } else {
        console.error('❌ No token found in AsyncStorage');
      }
    });
  }, []);

  // Load existing rating if available
  useEffect(() => {
    if (existingRating?.data) {
      console.log('Existing rating loaded:', existingRating.data);
      setRating(existingRating.data.rating);
      setFeedback(existingRating.data.feedback || '');
    }
  }, [existingRating]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setScrollEnabled(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setScrollEnabled(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!feedback.trim()) {
      newErrors.feedback = 'Feedback is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      console.log('Submitting rating:', { rating, feedback: feedback.trim() });
      
      const result = await submitRating({
        rating,
        feedback: feedback.trim(),
      }).unwrap();

      console.log('Rating submitted successfully:', result);

      Alert.alert(
        'Thank You!',
        result.message || 'Your feedback has been submitted successfully. We appreciate your input!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('Rating submission error:', error);
      console.error('Error data:', error?.data);
      console.error('Error status:', error?.status);
      
      const errorMessage = error?.data?.message || error?.message || 'Failed to submit feedback. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        {/* ================= GREEN HEADER ================= */}
        <View style={[styles.headerOuter, { width }]}>
        <CardHeader width={width} height={220} />

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.backRow}>
            <Arrow width={22} height={22} />
            <Text style={styles.title}>Rate Us</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ================= WHITE CARD ================= */}
      <View style={[styles.content, { width }]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
            contentContainerStyle={{ padding: 20, paddingBottom: 160 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Rating Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How would you rate our app?</Text>
              <Text style={styles.sectionSubtitle}>
                Your feedback helps us improve
              </Text>

              <View style={styles.ratingContainer}>
                <StarRating
                  rating={rating}
                  onRatingChange={setRating}
                  size={50}
                />
              </View>

              {errors.rating && (
                <Text style={styles.errorText}>{errors.rating}</Text>
              )}

              {rating > 0 && (
                <Text style={styles.ratingLabel}>
                  {rating === 1 && '😞 Poor'}
                  {rating === 2 && '😐 Fair'}
                  {rating === 3 && '😊 Good'}
                  {rating === 4 && '😄 Very Good'}
                  {rating === 5 && '🤩 Excellent'}
                </Text>
              )}
            </View>

            {/* Feedback Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tell us more</Text>

              <InputField
                label="Your Feedback"
                placeholder="Share your experience with us..."
                value={feedback}
                onChangeText={(text) => {
                  setFeedback(text);
                  if (errors.feedback)
                    setErrors({ ...errors, feedback: undefined });
                }}
                multiline
                numberOfLines={6}
                style={styles.textArea}
                error={errors.feedback}
              />
            </View>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
              <GradientButton
                title="Submit Feedback"
                onPress={handleSubmit}
                loading={isSubmitting}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F8F7',
    width: '100%',
  },

  /* HEADER */
  headerOuter: {
    height: 180,
    overflow: 'hidden',
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 60 : 90,
    left: 20,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    overflow: 'hidden',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  ratingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 12,
  },
  ratingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#004225',
    textAlign: 'center',
    marginTop: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    textAlign: 'center',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  buttonContainer: {
    marginTop: 12,
  },
});
