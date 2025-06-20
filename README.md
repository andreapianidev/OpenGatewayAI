# 🚀 OpenGatewayAI - Open Source Payment Gateway Frontend

![OpenGatewayAI](./assets/opengateway-ai-banner.svg)

## 📊 Admin Dashboard Preview

![Admin Dashboard](https://opengatewayai.andreapiani.com/home1.png)

*Dashboard amministrativa completa con AI integrata, metriche in tempo reale e gestione POS*

## 🌟 Overview

OpenGatewayAI is the world's first open-source payment gateway frontend with integrated artificial intelligence. Built with modern technologies and designed for scalability, it provides a comprehensive solution for payment processing with **OpenPay AI** - an intelligent consultant that provides contextual advice for both merchants and administrators.

**Created by Andrea Piani** - A revolutionary approach to payment gateway management.

🌐 **Live Demo**: [opengatewayai.andreapiani.com](https://opengatewayai.andreapiani.com)

## 🤖 OpenPay AI Features

**OpenPay AI** is your intelligent payment consultant that provides:

- **🧠 Smart Analytics**: AI-powered insights and predictive analytics
- **🛡️ Advanced Fraud Detection**: Real-time transaction monitoring and risk assessment
- **📊 Intelligent Reporting**: Automated report generation with actionable insights
- **🎯 Personalized Recommendations**: Contextual advice for merchants and administrators
- **⚡ Real-time Monitoring**: Live transaction analysis and anomaly detection
- **🗺️ Geographic Intelligence**: POI mapping with merchant location analytics

## 🌟 Why Choose OpenGatewayAI?

- **Proven Technology**: Built with industry-standard tools and practices
- **AI-First Approach**: Leverage OpenPay AI for better business decisions
- **Advanced Security**: Multi-layer fraud detection and prevention
- **Scalable Architecture**: Grows with your business needs
- **Expert Support**: Professional development team available
- **Cost-Effective**: Open source frontend reduces development costs
- **Rapid Deployment**: Get started quickly with our pre-built components

---

⭐ **Star this repository** if you find it useful!

🚀 **Ready to revolutionize your payment processing?** Contact us today!

An open-source payment gateway frontend with integrated OpenPay AI, built with React, TypeScript and Tailwind CSS.

## 📋 Overview

This application is an open-source frontend for a payment gateway with integrated AI capabilities. It includes separate dashboards for administrators and merchants, with complete transaction management, analytics and configuration features.

## 🚀 Technologies Used

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Desktop Framework**: Electron (Native Apps)
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 6.20.1
- **Charts**: Chart.js 4.4.0 + React-ChartJS-2 5.2.0
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1

## 🖥️ Multi-Platform Support

### 📱 Available Platforms
- **🌐 Web Application**: Progressive Web App with offline support
- **🍎 macOS Native**: Universal binary (Intel x64 + Apple Silicon ARM64)
- **🪟 Windows Native**: x64 and x86 (32-bit) support with NSIS installer
- **🐧 Linux**: AppImage and Debian packages (coming soon)

### 🏗️ Build Optimization
- **Apple Silicon**: Native ARM64 builds for M1/M2/M3 Macs
- **Intel Macs**: Optimized x64 builds for Intel processors
- **Windows**: Universal installer supporting both x64 and x86 architectures
- **Cross-Platform**: Single codebase for all platforms

### 🚀 Quick Build Script
Use the included `build.sh` script to build for all platforms:
```bash
# Build all platforms at once
./build.sh

# Or build specific platforms
npm run build:mac-intel     # macOS Intel
npm run build:mac-silicon    # macOS Apple Silicon
npm run build:windows       # Windows (x64 + x86)
npm run build:web           # Web version
npm run build:all           # All platforms
```

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/                 # 👨‍💼 Admin dashboard components
│   │   ├── AdminHeader.tsx
│   │   ├── AdminOverview.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── CommissionSettings.tsx
│   │   ├── MerchantManagement.tsx
│   │   ├── ReportsAnalytics.tsx
│   │   ├── SystemSettings.tsx
│   │   └── TransactionManagement.tsx
│   ├── charts/                # 📊 Chart and analytics components
│   │   ├── FraudDetectionChart.tsx
│   │   ├── GeographicChart.tsx
│   │   ├── MerchantPerformanceChart.tsx
│   │   ├── PaymentMethodsChart.tsx
│   │   ├── RevenueChart.tsx
│   │   └── TransactionChart.tsx
│   ├── merchant/              # 🏪 Merchant dashboard components
│   │   ├── AccountSettings.tsx
│   │   ├── MerchantHeader.tsx
│   │   ├── MerchantOverview.tsx
│   │   ├── MerchantSidebar.tsx
│   │   ├── PaymentRequests.tsx
│   │   ├── SupportTickets.tsx
│   │   └── TransactionHistory.tsx
│   ├── shared/                # 🔄 Shared components
│   │   └── StatsCard.tsx
│   └── ProtectedRoute.tsx     # 🔒 Role-based route protection
├── contexts/
│   └── AuthContext.tsx        # 🔐 Authentication context
├── pages/
│   ├── AdminDashboard.tsx     # 👨‍💼 Admin dashboard
│   ├── LandingPage.tsx        # 🏠 Landing page
│   ├── LoginPage.tsx          # 🔑 Login page
│   └── MerchantDashboard.tsx  # 🏪 Merchant dashboard
├── App.tsx                    # ⚛️ Main component
├── main.tsx                   # 🚀 Entry point
├── index.css                  # 🎨 Global styles
└── vite-env.d.ts             # 📝 TypeScript definitions for Vite
```

## 🔐 Authentication System

The application uses a mock authentication system with two roles:

### 🎭 Demo Credentials:

**👨‍💼 Administrator:**
- Email: `admin@opengateway.ai`
- Password: `admin123`
- Access: Complete admin dashboard

**🏪 Merchant:**
- Email: `merchant@example.com`
- Password: `merchant123`
- Access: Merchant dashboard

## 🎯 Key Features

### 🤖 OpenPay AI Intelligence
- 🧠 **AI Analytics**: Advanced machine learning insights and predictions
- 🛡️ **Fraud Detection**: Real-time AI-powered fraud prevention system
- 📊 **Predictive Analytics**: Future trend analysis and forecasting
- ⚡ **Real-time Monitoring**: Live transaction analysis with anomaly detection
- 🎯 **Smart Recommendations**: Contextual advice for merchants and admins
- 🗺️ **POI Mapping**: Geographic merchant location intelligence

### 👨‍💼 Admin Dashboard
- 📊 **AI-Enhanced Overview**: System-wide statistics with OpenPay AI insights
- 🏪 **Merchant Management**: CRUD operations with AI risk scoring
- 💳 **Transaction Management**: Monitor transactions with AI fraud detection
- 💰 **Commission Settings**: AI-optimized fee structures
- 📈 **Advanced Analytics**: AI-powered reports and business intelligence
- 🛡️ **Security Center**: Multi-layer fraud prevention dashboard
- 🗺️ **Merchant Network Map**: Interactive POI mapping with analytics
- ⚙️ **System Settings**: Global configurations with AI recommendations

### 🏪 Merchant Dashboard
- 📊 **Smart Overview**: Personal KPIs enhanced with OpenPay AI insights
- 📋 **Transaction History**: AI-categorized transaction records
- 💸 **Payment Requests**: Smart payment request creation
- 🛡️ **Fraud Alerts**: Real-time security notifications
- 📈 **Performance Insights**: AI-driven business recommendations
- ⚙️ **Account Settings**: Personalized configurations
- 🎫 **AI Support**: Intelligent support system

### 📊 Advanced Chart Components
- 📈 **Revenue Chart**: AI-enhanced revenue trends and forecasting
- 🔍 **Fraud Detection Dashboard**: Real-time fraud analysis with risk scoring
- 🧠 **Predictive Analytics**: Machine learning predictions and insights
- 🌍 **Geographic Intelligence**: AI-powered location analytics
- 📊 **Merchant Performance**: AI-scored performance metrics
- 💳 **Payment Methods**: Smart payment optimization insights
- 📉 **Transaction Analysis**: AI-enhanced transaction monitoring
- 🗺️ **POI Network Map**: Interactive merchant location mapping

## 🛠️ Setup & Installation

### 📋 Prerequisites
- Node.js (version 16 or higher) 🟢
- npm or yarn 📦

### 🚀 Getting Started

### 📥 Installation Options

#### 🌐 Web Version (Recommended for Development)
```bash
# Clone the repository
git clone https://github.com/andreapianidev/OpenGatewayAI.git
cd OpenGatewayAI

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

#### 🖥️ Native Desktop Applications

**🍎 macOS Users**: See [README-MACOS.md](./README-MACOS.md) for detailed macOS installation and features

**🪟 Windows Users**: See [README-WINDOWS.md](./README-WINDOWS.md) for detailed Windows installation and features

#### 🏗️ Build All Platforms
```bash
# Use the universal build script
./build.sh

# Or build specific platforms
npm run build:mac-intel     # macOS Intel x64
npm run build:mac-silicon    # macOS Apple Silicon ARM64
npm run build:windows       # Windows x64 + x86
npm run build:web           # Web application
npm run build:all           # All platforms
```

### 🔧 Development Commands
```bash
npm run dev          # 🔥 Development server
npm run electron:dev # 🖥️ Electron development mode
npm run build        # 🏗️ Production build
npm run preview      # 👀 Preview build
npm run lint         # 🔍 Code linting
```

## 🌐 Routing

The application uses React Router with the following routes:

- 🏠 `/` - Landing page
- 🔑 `/login` - Login page
- 👨‍💼 `/admin/*` - Admin dashboard (protected)
- 🏪 `/merchant/*` - Merchant dashboard (protected)

### 👨‍💼 Admin Routes (`/admin/*`)
- 📊 `/admin/` - Overview dashboard
- 🏪 `/admin/merchants` - Merchant management
- 💳 `/admin/transactions` - Transaction management
- 💰 `/admin/commissions` - Commission settings
- 📈 `/admin/reports` - Reports & analytics
- ⚙️ `/admin/settings` - System settings

### 🏪 Merchant Routes (`/merchant/*`)
- 📊 `/merchant/` - Overview dashboard
- 📋 `/merchant/transactions` - Transaction history
- 💸 `/merchant/payments` - Payment requests
- ⚙️ `/merchant/settings` - Account settings
- 🎫 `/merchant/support` - Support tickets

## 🎨 Design System

- **CSS Framework**: Tailwind CSS 🎨
- **Color Palette**: Blue/indigo gradient for primary theme 🔵
- **Icons**: Lucide React for consistent iconography ✨
- **Layout**: Responsive design with collapsible sidebar 📱
- **Typography**: Optimized system font stack 📝

## 🔒 Security

- **Route Protection**: `ProtectedRoute` component for access control 🛡️
- **Role-based Access**: User role-based access control 👥
- **Context Security**: Secure authentication state management 🔐

## 📱 Responsive Design

- Mobile-first design approach 📱
- Collapsible sidebar for mobile devices 📲
- Adaptive layout for tablet and desktop 💻
- Touch optimization for mobile devices ✋

## 🚀 Performance

- **Vite**: Fast build tool with HMR ⚡
- **Code Splitting**: Automatic route lazy loading 📦
- **Optimizations**: Optimized Vite configuration 🔧
- **Bundle Size**: Optimized dependencies 📊

## 🧪 Development

### 📜 Available Scripts

```bash
npm run dev      # 🔥 Development server
npm run build    # 🏗️ Production build
npm run preview  # 👀 Preview build
npm run lint     # 🔍 Code linting
```

### ⚙️ Configurations

- **TypeScript**: Strict mode configuration 📝
- **ESLint**: React and TypeScript rules 🔍
- **Tailwind**: Custom configuration 🎨
- **Vite**: React optimizations ⚡

## 📄 License

Demo project for Immaginet Srl - All rights reserved. 📋

## 👥 Contributing

To contribute to the project:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

## 📞 Support

For technical support or project questions, contact the development team. 💬 Andrea Piani - andreapiani.dev@gmail.com

---

**⚠️ Note**: This is a frontend demo. For a complete implementation, you would need:
- 🔧 Backend API for data management
- 🗄️ Database for persistence
- 💳 Integration with real payment processors
- 🔐 Robust authentication system
- 🛡️ Advanced security measures