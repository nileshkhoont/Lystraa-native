import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacityProps,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardHeader from '../assets/images/cardheader.svg';

// ============================================
// TYPES & INTERFACES
// ============================================

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  colors?: string[];
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  Icon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  BackIcon?: React.ComponentType<any>;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface ErrorTextProps {
  error?: string;
  style?: TextStyle;
}

interface ResponsiveHeaderProps {
  height?: number;
}

// ============================================
// RESPONSIVE GREEN HEADER COMPONENT
// ============================================

export const ResponsiveGreenHeader: React.FC<ResponsiveHeaderProps> = ({ height = 220 }) => {
  const { width } = useWindowDimensions();
  
  return <CardHeader width={width} height={height} preserveAspectRatio="none" />;
};

// ============================================
// GRADIENT BUTTON COMPONENT
// ============================================

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  colors = ['#004225', '#4C7A66'],
  loading = false,
  style,
  textStyle,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[styles.buttonContainer, style]}
      {...props}
    >
      <LinearGradient
        colors={colors}
        style={styles.gradientButton}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

// ============================================
// INPUT FIELD COMPONENT
// ============================================

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  Icon,
  rightIcon: RightIcon,
  onRightIconPress,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        {Icon && (
          <View style={styles.inputIcon}>
            <Icon width={20} height={20} />
          </View>
        )}
        <TextInput
          style={[styles.input, Icon && styles.inputWithIcon, style]}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
        {RightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            <RightIcon width={20} height={20} />
          </TouchableOpacity>
        )}
      </View>
      {error && <ErrorText error={error} />}
    </View>
  );
};

// ============================================
// ERROR TEXT COMPONENT
// ============================================

export const ErrorText: React.FC<ErrorTextProps> = ({ error, style }) => {
  if (!error) return null;
  return <Text style={[styles.errorText, style]}>{error}</Text>;
};

// ============================================
// HEADER COMPONENT
// ============================================

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  BackIcon,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.header, style]}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          {BackIcon ? (
            <BackIcon width={24} height={24} />
          ) : (
            <Text style={styles.backText}>←</Text>
          )}
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
    </View>
  );
};

// ============================================
// CARD COMPONENT
// ============================================

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

// ============================================
// DOT INDICATOR COMPONENT
// ============================================

interface DotIndicatorProps {
  count: number;
  activeIndex: number;
  style?: ViewStyle;
  dotStyle?: ViewStyle;
  activeDotStyle?: ViewStyle;
}

export const DotIndicator: React.FC<DotIndicatorProps> = ({
  count,
  activeIndex,
  style,
  dotStyle,
  activeDotStyle,
}) => {
  return (
    <View style={[styles.dotsContainer, style]}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            dotStyle,
            index === activeIndex && styles.activeDot,
            index === activeIndex && activeDotStyle,
          ]}
        />
      ))}
    </View>
  );
};

// ============================================
// LOADING COMPONENT
// ============================================

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = '#004225',
  style,
}) => {
  return (
    <View style={[styles.loadingContainer, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

// ============================================
// EMPTY STATE COMPONENT
// ============================================

interface EmptyStateProps {
  message: string;
  Icon?: React.ComponentType<any>;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  Icon,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.emptyState, style]}>
      {Icon && <Icon width={64} height={64} />}
      <Text style={[styles.emptyStateText, textStyle]}>{message}</Text>
    </View>
  );
};

// ============================================
// STAR RATING COMPONENT
// ============================================

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
  style?: ViewStyle;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  size = 40,
  readonly = false,
  style,
}) => {
  return (
    <View style={[styles.starContainer, style]}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => !readonly && onRatingChange?.(star)}
          disabled={readonly}
          style={styles.starButton}
        >
          <Text style={[styles.starText, { fontSize: size }]}>
            {star <= rating ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  // Button Styles
  buttonContainer: {
    width: '100%',
  },
  gradientButton: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Input Styles
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#111827',
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  rightIcon: {
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 12,
  },
  backText: {
    fontSize: 24,
    color: '#111827',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Dot Indicator Styles
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#004225',
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Empty State Styles
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
  },

  // Star Rating Styles
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButton: {
    marginHorizontal: 4,
  },
  starText: {
    color: '#FFD700',
  },
});

// Export all components
export default {
  GradientButton,
  InputField,
  ErrorText,
  Header,
  Card,
  DotIndicator,
  Loading,
  EmptyState,
};
