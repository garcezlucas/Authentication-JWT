export interface EmailValidationResult {
  status: boolean;
  message: string[];
}

export function validateEmail(email: string): EmailValidationResult {
  const errors: string[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Invalid email format. Please enter a valid email address.");
  }

  if (errors.length > 0) {
    return {
      status: false,
      message: errors,
    };
  }

  return {
    status: true,
    message: ["Email is valid. You can use it."],
  };
}
