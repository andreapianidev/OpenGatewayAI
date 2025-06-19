/**
 * Centralized URL configuration
 * All hardcoded URLs should be moved here and referenced via environment variables
 */

// Environment variables with fallback defaults
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.opengateway.ai';
const PAYMENT_BASE_URL = import.meta.env.VITE_PAYMENT_BASE_URL || 'https://pay.opengateway.ai';
const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL || 'https://opengatewayai.andreapiani.com';
const WEBHOOK_BASE_URL = import.meta.env.VITE_WEBHOOK_BASE_URL || 'https://yourapp.com/webhook';

// API Endpoints
export const API_ENDPOINTS = {
  // AI Service Endpoints
  DEEPSEEK: import.meta.env.VITE_DEEPSEEK_ENDPOINT || 'https://api.deepseek.com/v1',
  OPENAI: import.meta.env.VITE_OPENAI_ENDPOINT || 'https://api.openai.com/v1',
  MISTRAL: import.meta.env.VITE_MISTRAL_ENDPOINT || 'https://api.mistral.ai/v1',
  ANTHROPIC: import.meta.env.VITE_ANTHROPIC_ENDPOINT || 'https://api.anthropic.com/v1',
  OLLAMA: import.meta.env.VITE_OLLAMA_ENDPOINT || 'http://localhost:11434',
  
  // Main API
  MAIN: API_BASE_URL,
  PROCESSOR: `${API_BASE_URL}/processor`,
  
  // Payment URLs
  PAYMENT_BASE: PAYMENT_BASE_URL,
} as const;

// AI service endpoints
export const AI_ENDPOINTS = {
  DEEPSEEK: import.meta.env.VITE_DEEPSEEK_ENDPOINT || 'https://api.deepseek.com/v1',
  OPENAI: import.meta.env.VITE_OPENAI_ENDPOINT || 'https://api.openai.com/v1',
  MISTRAL: import.meta.env.VITE_MISTRAL_ENDPOINT || 'https://api.mistral.ai/v1',
  ANTHROPIC: import.meta.env.VITE_ANTHROPIC_ENDPOINT || 'https://api.anthropic.com/v1',
  OLLAMA: 'http://localhost:11434',
} as const;

// External documentation links
export const EXTERNAL_DOCS = {
  OLLAMA_DOWNLOAD: 'https://ollama.ai',
  OPENAI_PLATFORM: 'https://platform.openai.com/api-keys',
  MISTRAL_CONSOLE: 'https://console.mistral.ai',
  ANTHROPIC_CONSOLE: 'https://console.anthropic.com',
  DEEPSEEK_PLATFORM: 'https://platform.deepseek.com',
} as const;

// CDN and Static Assets
export const ASSETS = {
  HOME_IMAGE: `${CDN_BASE_URL}/home1.png`,
  DEMO_SITE: CDN_BASE_URL,
} as const;

// Webhook URLs
export const WEBHOOKS = {
  SUCCESS: `${WEBHOOK_BASE_URL}/success`,
  FAILED: `${WEBHOOK_BASE_URL}/failed`,
  REFUND: `${WEBHOOK_BASE_URL}/refund`,
  BASE: WEBHOOK_BASE_URL,
} as const;

// CSP Domains
export const CSP_DOMAINS = {
  CDN_JS: import.meta.env.VITE_CSP_CDN_JS || 'https://cdn.jsdelivr.net',
  UNPKG: import.meta.env.VITE_CSP_UNPKG || 'https://unpkg.com',
  GOOGLE_FONTS: import.meta.env.VITE_CSP_GOOGLE_FONTS || 'https://fonts.googleapis.com',
  GOOGLE_FONTS_STATIC: import.meta.env.VITE_CSP_GOOGLE_FONTS_STATIC || 'https://fonts.gstatic.com',
  API_CONNECT: import.meta.env.VITE_CSP_API_CONNECT || 'https://api.opengateway.com',
  WSS_CONNECT: import.meta.env.VITE_CSP_WSS_CONNECT || 'wss://api.opengateway.com',
} as const;

// Payment Request URLs Generator
export const generatePaymentUrl = (requestId: string): string => {
  return `${API_ENDPOINTS.PAYMENT_BASE}/req/${requestId}`;
};

// Default merchant URLs (for demo/testing)
export const DEFAULT_MERCHANT_URLS = {
  WEBSITE: 'https://damascusstore.sy',
  WEBHOOK: 'https://damascusstore.sy/webhook',
  LOGO: 'https://tuosito.com/logo.png',
} as const;

// Site configuration
export const SITE_CONFIG = {
  NAME: 'OpenGateway AI',
  URL: 'https://opengatewayai.com',
  ADMIN_EMAIL: 'admin@opengatewayai.com',
  DEFAULT_URL: 'https://opengatewayai.com',
} as const;