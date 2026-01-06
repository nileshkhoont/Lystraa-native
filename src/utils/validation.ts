export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateFirstName = (firstName: string): string | null => {
  if (!firstName.trim()) {
    return 'First name is required';
  }
  if (firstName.trim().length < 2) {
    return 'First name must be at least 2 characters';
  }
  return null;
};

export const validateLastName = (lastName: string): string | null => {
  // Last name is optional, but if provided, should be valid
  if (lastName.trim() && lastName.trim().length < 2) {
    return 'Last name must be at least 2 characters';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one symbol';
  }
  return null;
};
