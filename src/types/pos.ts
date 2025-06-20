// Types and interfaces for POS Management system

export interface POSDevice {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  status: 'online' | 'offline' | 'maintenance';
  location: string;
  batteryLevel?: number;
  lastTransaction: string;
  todayTransactions: number;
  todayRevenue: number;
  version: string;
  ipAddress: string;
}

export interface POSTransaction {
  id: string;
  posId: string;
  amount: number;
  type: 'sale' | 'refund' | 'void';
  paymentMethod: 'card' | 'cash' | 'contactless' | 'mobile';
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  customerRef?: string;
  riskScore?: number;
  aiAnalysis?: {
    fraudProbability: number;
    customerBehavior: 'normal' | 'suspicious' | 'high-value';
    recommendations: string[];
  };
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'anomaly' | 'optimization' | 'alert';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  timestamp: string;
  actionable: boolean;
}

export interface PerformanceMetric {
  timestamp: string;
  transactionVolume: number;
  revenue: number;
  averageTransactionTime: number;
  errorRate: number;
  customerSatisfaction: number;
}

export interface DebitCard {
  id: string;
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  status: 'active' | 'blocked' | 'expired' | 'pending';
  cardType: 'virtual' | 'physical';
  balance: number;
  dailyLimit: number;
  monthlySpent: number;
  issueDate: string;
  lastUsed?: string;
  pin: string;
  cvv: string;
  customerId: string;
  tier: 'standard' | 'premium' | 'business';
  features: {
    contactless: boolean;
    onlinePayments: boolean;
    internationalTransactions: boolean;
    atmWithdrawals: boolean;
  };
  spending: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  location?: {
    country: string;
    city: string;
    lastTransaction: string;
  };
}

export interface CardTransaction {
  id: string;
  cardId: string;
  amount: number;
  currency: string;
  merchant: string;
  category: 'shopping' | 'food' | 'transport' | 'entertainment' | 'bills' | 'other';
  timestamp: string;
  status: 'completed' | 'pending' | 'declined';
  location: string;
  type: 'purchase' | 'withdrawal' | 'refund' | 'fee';
  description: string;
  mcc: string; // Merchant Category Code
  authCode?: string;
}

export interface CardApplication {
  id: string;
  applicantName: string;
  email: string;
  cardType: 'physical' | 'virtual';
  tier: 'standard' | 'premium' | 'business';
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: string;
  riskScore: number;
  aiDecision?: {
    recommendation: 'approve' | 'reject' | 'review';
    confidence: number;
    reasons: string[];
  };
}

export type CardManagementView = 'overview' | 'transactions' | 'applications' | 'analytics';