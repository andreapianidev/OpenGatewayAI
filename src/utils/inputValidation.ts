/**
 * Input Validation and Sanitization Utilities
 * Provides functions to validate and sanitize user inputs to prevent XSS and injection attacks
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate phone number format
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s()-]/g, ''));
};

/**
 * Sanitize and validate merchant name
 */
export const validateMerchantName = (name: string): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} => {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Merchant name is required'
    };
  }
  
  const sanitized = sanitizeHtml(name.trim());
  
  if (sanitized.length < 2) {
    return {
      isValid: false,
      sanitized,
      error: 'Merchant name must be at least 2 characters long'
    };
  }
  
  if (sanitized.length > 100) {
    return {
      isValid: false,
      sanitized,
      error: 'Merchant name must be less than 100 characters'
    };
  }
  
  return {
    isValid: true,
    sanitized
  };
};

/**
 * Validate amount for payments
 */
export const validateAmount = (amount: string | number): {
  isValid: boolean;
  value: number;
  error?: string;
} => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return {
      isValid: false,
      value: 0,
      error: 'Amount must be a valid number'
    };
  }
  
  if (numAmount <= 0) {
    return {
      isValid: false,
      value: numAmount,
      error: 'Amount must be greater than 0'
    };
  }
  
  if (numAmount > 999999.99) {
    return {
      isValid: false,
      value: numAmount,
      error: 'Amount cannot exceed 999,999.99'
    };
  }
  
  // Round to 2 decimal places
  const roundedAmount = Math.round(numAmount * 100) / 100;
  
  return {
    isValid: true,
    value: roundedAmount
  };
};

/**
 * Validate URL format
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize search query to prevent injection attacks
 */
export const sanitizeSearchQuery = (query: string): string => {
  if (!query) return '';
  
  return query
    .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .substring(0, 100); // Limit length
};

/**
 * Validate API key format
 */
export const validateApiKey = (apiKey: string): boolean => {
  // API keys should be alphanumeric with specific length
  const apiKeyRegex = /^[a-zA-Z0-9]{32,64}$/;
  return apiKeyRegex.test(apiKey);
};

/**
 * Rate limiting helper
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(identifier: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    
    return true;
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const rateLimiter = new RateLimiter();