# OpenGateway AI - Windows Native Application

## Overview

OpenGateway AI is now available as a native Windows application, providing a seamless desktop experience for payment gateway management with integrated AI analytics.

## Features

### Native Windows Integration
- **Native Windows UI**: Follows Windows design guidelines and integrates seamlessly with the Windows desktop environment
- **System Tray Support**: Minimize to system tray for background operation
- **Windows Notifications**: Native Windows toast notifications for important events
- **File Association**: Associate specific file types with the application
- **Auto-updater**: Built-in update mechanism for seamless application updates

### Desktop Functionalities
- **Offline Capability**: Core functionalities available without internet connection
- **Local Data Storage**: Secure local storage with Windows Credential Manager integration
- **Multi-window Support**: Open multiple dashboard windows simultaneously
- **Keyboard Shortcuts**: Windows-standard keyboard shortcuts for improved productivity
- **High DPI Support**: Crisp display on high-resolution monitors

### Security Features
- **Windows Security Integration**: Leverages Windows security features and APIs
- **Code Signing**: Application is digitally signed for security verification
- **Sandboxed Environment**: Runs in a secure, isolated environment
- **Windows Defender Integration**: Compatible with Windows Defender and other security software

## Installation

### System Requirements
- **Operating System**: Windows 10 (version 1903 or later) or Windows 11
- **Architecture**: x64 (64-bit) or x86 (32-bit)
- **RAM**: Minimum 4GB, recommended 8GB
- **Storage**: 500MB free disk space
- **Network**: Internet connection required for initial setup and updates

### Download and Install

1. **Download the Installer**:
   ```
   # Download from GitHub Releases
   https://github.com/andreapianidev/OpenGatewayAI/releases/latest
   ```

2. **Run the Installer**:
   - Download `OpenGateway-AI-Setup.exe`
   - Right-click and select "Run as administrator" (if required)
   - Follow the installation wizard
   - Choose installation directory (default: `C:\Program Files\OpenGateway AI`)

3. **First Launch**:
   - Launch from Start Menu or Desktop shortcut
   - Complete initial setup wizard
   - Configure connection settings

## Development Setup

### Prerequisites
- **Node.js**: Version 18.x or later
- **npm**: Version 8.x or later
- **Git**: For cloning the repository
- **Windows SDK**: For native Windows features (optional)

### Clone and Setup
```bash
# Clone the repository
git clone https://github.com/andreapianidev/OpenGatewayAI.git
cd OpenGatewayAI

# Install dependencies
npm install

# Install Electron dependencies
npm run postinstall
```

### Development Commands
```bash
# Start development server
npm run dev

# Start Electron in development mode
npm run electron:dev

# Build for production
npm run build

# Build Windows executable
npm run build:windows

# Build all platforms
npm run build:all
```

## Build and Distribution

### Building for Windows

#### Build Windows x64 (64-bit)
```bash
npm run build:windows
# or specifically for x64
electron-builder --win --x64
```

#### Build Windows x86 (32-bit)
```bash
electron-builder --win --ia32
```

#### Build Both Architectures
```bash
electron-builder --win --x64 --ia32
```

### Distribution Formats

1. **NSIS Installer** (`.exe`)
   - Full installer with uninstaller
   - Start Menu and Desktop shortcuts
   - Registry entries for proper uninstallation
   - Auto-updater support

2. **Portable ZIP** (`.zip`)
   - Portable version requiring no installation
   - Extract and run directly
   - Ideal for USB drives or restricted environments

### Code Signing

For production releases, the application should be code signed:

```bash
# Set environment variables for code signing
set CSC_LINK=path/to/certificate.p12
set CSC_KEY_PASSWORD=certificate_password

# Build with code signing
npm run build:windows
```

## Windows-Specific Features

### System Integration
- **Windows Services**: Optional background service for continuous monitoring
- **Task Scheduler**: Integration with Windows Task Scheduler for automated tasks
- **Event Log**: Application events logged to Windows Event Log
- **Performance Counters**: Custom performance counters for monitoring

### Native Menus and Shortcuts
- **Context Menus**: Right-click context menus with Windows-standard actions
- **Keyboard Shortcuts**:
  - `Ctrl+N`: New transaction
  - `Ctrl+R`: Refresh dashboard
  - `Ctrl+S`: Save current state
  - `Ctrl+P`: Print reports
  - `F11`: Toggle fullscreen
  - `Alt+F4`: Close application

### Windows Notifications
- **Toast Notifications**: Native Windows 10/11 toast notifications
- **Action Center Integration**: Notifications appear in Windows Action Center
- **Sound Alerts**: System sound integration for important events

## Configuration

### Application Settings
Settings are stored in:
```
%APPDATA%\OpenGateway AI\config.json
```

### Logs Location
Application logs are stored in:
```
%APPDATA%\OpenGateway AI\logs\
```

### Cache and Data
Local data and cache:
```
%LOCALAPPDATA%\OpenGateway AI\
```

## Troubleshooting

### Common Issues

1. **Application Won't Start**
   - Check Windows Event Log for error details
   - Verify all dependencies are installed
   - Run as administrator if permission issues occur

2. **Performance Issues**
   - Check available RAM and disk space
   - Close unnecessary applications
   - Update graphics drivers

3. **Network Connectivity**
   - Check Windows Firewall settings
   - Verify proxy configuration
   - Test internet connectivity

### Debug Mode
Run in debug mode for detailed logging:
```bash
# From command line
"C:\Program Files\OpenGateway AI\OpenGateway AI.exe" --debug
```

### Support
For Windows-specific issues:
- Check the [GitHub Issues](https://github.com/andreapianidev/OpenGatewayAI/issues)
- Review Windows Event Log
- Contact support with system information

## Security Considerations

### Windows Security
- Application runs with standard user privileges
- No administrative rights required for normal operation
- Data encryption using Windows DPAPI
- Secure communication with TLS 1.3

### Antivirus Compatibility
- Tested with Windows Defender
- Compatible with major antivirus solutions
- Code signing prevents false positives

## Updates

### Automatic Updates
- Built-in auto-updater checks for updates on startup
- Downloads and installs updates in background
- User notification before applying updates
- Rollback capability if update fails

### Manual Updates
- Download latest version from GitHub Releases
- Uninstall previous version (optional)
- Install new version
- Settings and data are preserved

## Performance Optimization

### System Requirements
- **Minimum**: 4GB RAM, dual-core processor
- **Recommended**: 8GB RAM, quad-core processor
- **Optimal**: 16GB RAM, modern multi-core processor

### Performance Tips
- Close unnecessary background applications
- Ensure adequate free disk space (>1GB)
- Use SSD storage for better performance
- Keep Windows updated

---

**Created by Andrea Piani**  
**Email**: andrea@andreapiani.com  
**GitHub**: https://github.com/andreapianidev/OpenGatewayAI  
**Company**: Immaginet Srl

For technical support and contributions, please visit our GitHub repository.