/**
 * API Security Utilities
 * Provides secure API request handling with authentication, rate limiting, and validation
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { rateLimiter } from './inputValidation';
import SecureStorage from './secureStorage';

/**
 * Security configuration for API requests
 */
interface SecurityConfig {
  enableRateLimiting: boolean;
  enableRequestSigning: boolean;
  enableResponseValidation: boolean;
  maxRetries: number;
  timeout: number;
}

const defaultSecurityConfig: SecurityConfig = {
  enableRateLimiting: true,
  enableRequestSigning: true,
  enableResponseValidation: true,
  maxRetries: 3,
  timeout: 30000
};

/**
 * Create a secure Axios instance with security interceptors
 */
export const createSecureApiClient = (config: Partial<SecurityConfig> = {}): AxiosInstance => {
  const securityConfig = { ...defaultSecurityConfig, ...config };
  
  const apiClient = axios.create({
    timeout: securityConfig.timeout,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  // Request interceptor for security
  apiClient.interceptors.request.use(
    (config) => {
      // Rate limiting check
      if (securityConfig.enableRateLimiting) {
        const endpoint = `${config.method}:${config.url}`;
        if (!rateLimiter.isAllowed(endpoint, 10, 60000)) { // 10 requests per minute
          return Promise.reject(new Error('Rate limit exceeded. Please try again later.'));
        }
      }

      // Add authentication token
      const token = SecureStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Add CSRF token if available
      const csrfToken = SecureStorage.getItem('csrf_token');
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }

      // Add request timestamp for replay attack prevention
      config.headers['X-Timestamp'] = Date.now().toString();

      // Add request ID for tracking
      config.headers['X-Request-ID'] = generateRequestId();

      // Request signing (simplified version)
      if (securityConfig.enableRequestSigning && config.data) {
        const signature = generateRequestSignature(config.data, config.headers['X-Timestamp']);
        config.headers['X-Signature'] = signature;
      }

      // Sanitize request data
      if (config.data) {
        config.data = sanitizeRequestData(config.data);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for security
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      // Validate response structure
      if (securityConfig.enableResponseValidation) {
        if (!validateResponseStructure(response)) {
          console.warn('Invalid response structure detected');
        }
      }

      // Check for security headers
      validateSecurityHeaders(response.headers);

      return response;
    },
    (error) => {
      // Handle security-related errors
      if (error.response?.status === 401) {
        // Clear stored tokens on authentication failure
        SecureStorage.removeItem('auth_token');
        SecureStorage.removeItem('csrf_token');
        
        // Redirect to login (you might want to use a callback instead)
        window.location.href = '/login';
      }

      // Log security incidents
      if (error.response?.status === 403 || error.response?.status === 429) {
        logSecurityIncident({
          type: error.response.status === 403 ? 'FORBIDDEN_ACCESS' : 'RATE_LIMIT_EXCEEDED',
          url: error.config?.url,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        });
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

/**
 * Generate a unique request ID
 */
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate request signature for integrity verification
 */
const generateRequestSignature = (data: any, timestamp: string): string => {
  const payload = JSON.stringify(data) + timestamp;
  // Simple hash function (in production, use a proper HMAC)
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
};

/**
 * Sanitize request data to prevent injection attacks
 */
const sanitizeRequestData = (data: any): any => {
  if (typeof data === 'string') {
    return data.replace(/<script[^>]*>.*?<\/script>/gi, '')
               .replace(/<[^>]*>/g, '')
               .trim();
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitizeRequestData);
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        sanitized[key] = sanitizeRequestData(data[key]);
      }
    }
    return sanitized;
  }
  
  return data;
};

/**
 * Validate response structure for security
 */
const validateResponseStructure = (response: AxiosResponse): boolean => {
  // Check if response has expected structure
  if (!response.data) {
    return false;
  }

  // Check for suspicious patterns in response
  const responseStr = JSON.stringify(response.data);
  const suspiciousPatterns = [
    /<script[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i
  ];

  return !suspiciousPatterns.some(pattern => pattern.test(responseStr));
};

/**
 * Validate security headers in response
 */
const validateSecurityHeaders = (headers: any): void => {
  const requiredHeaders = [
    'x-content-type-options',
    'x-frame-options',
    'x-xss-protection'
  ];

  const missingHeaders = requiredHeaders.filter(header => !headers[header]);
  
  if (missingHeaders.length > 0) {
    console.warn('Missing security headers:', missingHeaders);
  }
};

/**
 * Log security incidents for monitoring
 */
const logSecurityIncident = (incident: {
  type: string;
  url?: string;
  timestamp: string;
  userAgent: string;
}): void => {
  console.warn('Security incident:', incident);
  
  // In production, send to monitoring service
  // fetch('/api/security/incidents', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(incident)
  // }).catch(console.error);
};

/**
 * Secure API request wrapper with additional validation
 */
export const secureApiRequest = async <T = any>(
  apiClient: AxiosInstance,
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    // Validate request configuration
    if (!config.url) {
      throw new Error('Request URL is required');
    }

    // Ensure HTTPS in production
    if (process.env.NODE_ENV === 'production' && config.url.startsWith('http://')) {
      throw new Error('HTTPS is required in production');
    }

    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error) {
    // Enhanced error handling
    if (axios.isAxiosError(error)) {
      const secureError = {
        message: error.message,
        status: error.response?.status,
        code: error.code
      };
      throw new Error(`API request failed: ${JSON.stringify(secureError)}`);
    }
    throw error;
  }
};

/**
 * Default secure API client instance
 */
export const secureApi = createSecureApiClient();