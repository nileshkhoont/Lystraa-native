import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export const HomeSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 350],
  });

  const SkeletonBox = ({ width, height, style }: any) => (
    <View style={[styles.skeletonBox, { width, height }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );

  return (
    <View style={styles.content}>
      {/* Hero Image Skeleton */}
      <SkeletonBox width="100%" height={180} style={{ marginBottom: 24 }} />

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <SkeletonBox width={150} height={20} />
        <SkeletonBox width={60} height={20} />
      </View>

      {/* Product Cards Skeleton */}
      <View style={styles.cardsContainer}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.card}>
            <SkeletonBox width="100%" height={180} />
            <SkeletonBox width={80} height={16} style={{ marginTop: 12 }} />
            <SkeletonBox width="100%" height={14} style={{ marginTop: 8 }} />
            <SkeletonBox width={120} height={14} style={{ marginTop: 8 }} />
            <SkeletonBox width="100%" height={14} style={{ marginTop: 8 }} />
            <View style={styles.cardFooter}>
              <SkeletonBox width={40} height={40} style={{ borderRadius: 20 }} />
              <SkeletonBox width={80} height={16} />
            </View>
          </View>
        ))}
      </View>

      {/* Second Section Header */}
      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <SkeletonBox width={180} height={20} />
        <SkeletonBox width={60} height={20} />
      </View>

      {/* More Product Cards */}
      <View style={styles.cardsContainer}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.card}>
            <SkeletonBox width="100%" height={180} />
            <SkeletonBox width={100} height={16} style={{ marginTop: 12 }} />
            <SkeletonBox width="100%" height={14} style={{ marginTop: 8 }} />
            <SkeletonBox width={140} height={14} style={{ marginTop: 8 }} />
            <SkeletonBox width="100%" height={14} style={{ marginTop: 8 }} />
            <View style={styles.cardFooter}>
              <SkeletonBox width={40} height={40} style={{ borderRadius: 20 }} />
              <SkeletonBox width={80} height={16} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  card: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  skeletonBox: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
