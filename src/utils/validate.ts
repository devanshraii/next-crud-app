// Validate email format
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Validate password strength
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6; // Minimum length requirement
  };
  