/**
 * Secure Form Hook
 * Provides secure form handling with validation and sanitization
 */

import { useState, useCallback } from 'react';
import {
  sanitizeHtml,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateMerchantName,
  validateAmount,
  validateUrl,
  sanitizeSearchQuery,
  rateLimiter
} from '../utils/inputValidation';

interface ValidationRule {
  required?: boolean;
  type?: 'email' | 'password' | 'phone' | 'merchantName' | 'amount' | 'url' | 'search';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => { isValid: boolean; error?: string };
}

interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

interface UseSecureFormProps {
  initialValues: Record<string, string>;
  validationRules: Record<string, ValidationRule>;
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
  rateLimitKey?: string;
}

export const useSecureForm = ({
  initialValues,
  validationRules,
  onSubmit,
  rateLimitKey
}: UseSecureFormProps) => {
  const [fields, setFields] = useState<Record<string, FormField>>(() => {
    const initialFields: Record<string, FormField> = {};
    Object.keys(initialValues).forEach(key => {
      initialFields[key] = {
        value: initialValues[key],
        error: '',
        touched: false
      };
    });
    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = useCallback((name: string, value: string): string => {
    const rule = validationRules[name];
    if (!rule) return '';

    // Required validation
    if (rule.required && (!value || value.trim().length === 0)) {
      return `${name} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value && !rule.required) return '';

    // Length validations
    if (rule.minLength && value.length < rule.minLength) {
      return `${name} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name} must be less than ${rule.maxLength} characters`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return `${name} format is invalid`;
    }

    // Type-specific validations
    switch (rule.type) {
      case 'email':
        if (!validateEmail(value)) {
          return 'Please enter a valid email address';
        }
        break;

      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid) {
          return passwordValidation.errors[0];
        }
        break;

      case 'phone':
        if (!validatePhoneNumber(value)) {
          return 'Please enter a valid phone number';
        }
        break;

      case 'merchantName':
        const merchantValidation = validateMerchantName(value);
        if (!merchantValidation.isValid) {
          return merchantValidation.error || 'Invalid merchant name';
        }
        break;

      case 'amount':
        const amountValidation = validateAmount(value);
        if (!amountValidation.isValid) {
          return amountValidation.error || 'Invalid amount';
        }
        break;

      case 'url':
        if (!validateUrl(value)) {
          return 'Please enter a valid URL';
        }
        break;
    }

    // Custom validation
    if (rule.custom) {
      const customValidation = rule.custom(value);
      if (!customValidation.isValid) {
        return customValidation.error || 'Invalid value';
      }
    }

    return '';
  }, [validationRules]);

  const setValue = useCallback((name: string, value: string) => {
    // Sanitize input based on type
    let sanitizedValue = value;
    const rule = validationRules[name];
    
    if (rule?.type === 'search') {
      sanitizedValue = sanitizeSearchQuery(value);
    } else {
      sanitizedValue = sanitizeHtml(value);
    }

    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: sanitizedValue,
        error: validateField(name, sanitizedValue)
      }
    }));
  }, [validateField, validationRules]);

  const setTouched = useCallback((name: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true
      }
    }));
  }, []);

  const validateAll = useCallback((): boolean => {
    let isValid = true;
    const newFields = { ...fields };

    Object.keys(fields).forEach(name => {
      const error = validateField(name, fields[name].value);
      newFields[name] = {
        ...newFields[name],
        error,
        touched: true
      };
      if (error) isValid = false;
    });

    setFields(newFields);
    return isValid;
  }, [fields, validateField]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Rate limiting check
    if (rateLimitKey && !rateLimiter.isAllowed(rateLimitKey)) {
      setSubmitError('Too many attempts. Please try again later.');
      return;
    }

    setSubmitError('');
    
    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const values: Record<string, string> = {};
      Object.keys(fields).forEach(key => {
        values[key] = fields[key].value;
      });

      await onSubmit(values);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, validateAll, onSubmit, rateLimitKey]);

  const reset = useCallback(() => {
    const resetFields: Record<string, FormField> = {};
    Object.keys(initialValues).forEach(key => {
      resetFields[key] = {
        value: initialValues[key],
        error: '',
        touched: false
      };
    });
    setFields(resetFields);
    setSubmitError('');
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback((name: string) => ({
    value: fields[name]?.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value);
    },
    onBlur: () => setTouched(name),
    error: fields[name]?.touched ? fields[name]?.error : '',
    'aria-invalid': fields[name]?.touched && !!fields[name]?.error
  }), [fields, setValue, setTouched]);

  const isValid = Object.values(fields).every(field => !field.error);
  const hasErrors = Object.values(fields).some(field => field.touched && field.error);

  return {
    fields,
    setValue,
    setTouched,
    handleSubmit,
    reset,
    getFieldProps,
    isSubmitting,
    submitError,
    isValid,
    hasErrors
  };
};