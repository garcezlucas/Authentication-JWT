export interface PasswordValidationResult {
  status: boolean;
  message: string[];
}

export function validatePassword(password: string, username: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password should be at least 8 characters long.");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password should contain at least one uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password should contain at least one lowercase letter.");
  }

  if (!/\d/.test(password)) {
    errors.push("Password should contain at least one digit.");
  }

  if (!/[$@!%*?&#]/.test(password)) {
    errors.push(
      "Password should contain at least one special character ($@!%*?&#)."
    );
  }

  if (password.toLowerCase().includes(username.toLowerCase())) {
    errors.push("Password should not contain your username.");
  }

  if (errors.length > 0) {
    return {
      status: false,
      message: errors,
    };
  }

  return {
    status: true,
    message: ["Password is secure. You can use it."],
  };
}
