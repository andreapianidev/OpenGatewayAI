/**
 * Security Headers Component
 * Manages Content Security Policy and other security headers
 */

import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';
import { CSP_DOMAINS } from '../../config/urls';

interface SecurityHeadersProps {
  nonce?: string;
}

const SecurityHeaders: React.FC<SecurityHeadersProps> = ({ nonce }) => {
  useEffect(() => {
    // Set Content Security Policy
    const cspDirectives = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${CSP_DOMAINS.CDN_JS} ${CSP_DOMAINS.UNPKG}`,
      `style-src 'self' 'unsafe-inline' ${CSP_DOMAINS.GOOGLE_FONTS}`,
      `font-src 'self' ${CSP_DOMAINS.GOOGLE_FONTS_STATIC}`,
      "img-src 'self' data: https: blob:",
      `connect-src 'self' ${CSP_DOMAINS.API_CONNECT} ${CSP_DOMAINS.WSS_CONNECT}`,
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests"
    ];

    if (nonce) {
      cspDirectives[1] = `script-src 'self' 'nonce-${nonce}' ${CSP_DOMAINS.CDN_JS} ${CSP_DOMAINS.UNPKG}`;
      cspDirectives[2] = `style-src 'self' 'nonce-${nonce}' ${CSP_DOMAINS.GOOGLE_FONTS}`;
    }

    const cspValue = cspDirectives.join('; ');

    // Create or update CSP meta tag
    let cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]') as HTMLMetaElement;
    if (!cspMeta) {
      cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      document.head.appendChild(cspMeta);
    }
    cspMeta.content = cspValue;

    // Set other security headers via meta tags
    const securityHeaders = [
      {
        httpEquiv: 'X-Content-Type-Options',
        content: 'nosniff'
      },
      {
        httpEquiv: 'X-Frame-Options',
        content: 'DENY'
      },
      {
        httpEquiv: 'X-XSS-Protection',
        content: '1; mode=block'
      },
      {
        httpEquiv: 'Referrer-Policy',
        content: 'strict-origin-when-cross-origin'
      },
      {
        httpEquiv: 'Permissions-Policy',
        content: 'camera=(), microphone=(), geolocation=(), payment=()'
      }
    ];

    securityHeaders.forEach(header => {
      let metaTag = document.querySelector(`meta[http-equiv="${header.httpEquiv}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.httpEquiv = header.httpEquiv;
        document.head.appendChild(metaTag);
      }
      metaTag.content = header.content;
    });

    // Set viewport meta tag for security
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, user-scalable=no';

    // Cleanup function
    return () => {
      // Remove security headers when component unmounts (optional)
      // This might not be necessary in most cases
    };
  }, [nonce]);

  return null; // This component doesn't render anything
};

export default SecurityHeaders;

/**
 * Security utilities
 */
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validate if current environment supports required security features
 */
export const checkSecuritySupport = (): {
  csp: boolean;
  crypto: boolean;
  secureContext: boolean;
} => {
  return {
    csp: 'SecurityPolicyViolationEvent' in window,
    crypto: 'crypto' in window && 'getRandomValues' in window.crypto,
    secureContext: window.isSecureContext
  };
};

/**
 * Report CSP violations (for development/monitoring)
 */
export const setupCSPReporting = (): void => {
  document.addEventListener('securitypolicyviolation', (event) => {
    console.warn('CSP Violation:', {
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
      originalPolicy: event.originalPolicy,
      sourceFile: event.sourceFile,
      lineNumber: event.lineNumber
    });

    // In production, you might want to send this to your monitoring service
    // fetch('/api/csp-violation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     blockedURI: event.blockedURI,
    //     violatedDirective: event.violatedDirective,
    //     userAgent: navigator.userAgent,
    //     timestamp: new Date().toISOString()
    //   })
    // });
  });
};