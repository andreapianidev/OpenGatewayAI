#!/bin/bash

# OpenGateway AI Build Script
# Builds for macOS (Intel & Apple Silicon), Windows, and Web
# Created by Andrea Piani

set -e

echo "🚀 OpenGateway AI - Universal Build Script"
echo "==========================================="
echo "Building for all platforms..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf dist-electron/
rm -rf build/
rm -rf release/

# Build web version
print_status "Building web version..."
npm run build:web
if [ $? -eq 0 ]; then
    print_success "Web build completed successfully!"
else
    print_error "Web build failed!"
    exit 1
fi

# Build macOS Intel version
print_status "Building macOS Intel version..."
npm run build:mac-intel
if [ $? -eq 0 ]; then
    print_success "macOS Intel build completed successfully!"
else
    print_warning "macOS Intel build failed or skipped"
fi

# Build macOS Apple Silicon version
print_status "Building macOS Apple Silicon version..."
npm run build:mac-silicon
if [ $? -eq 0 ]; then
    print_success "macOS Apple Silicon build completed successfully!"
else
    print_warning "macOS Apple Silicon build failed or skipped"
fi

# Build Windows version (if on macOS/Linux with wine)
print_status "Building Windows version..."
npm run build:windows
if [ $? -eq 0 ]; then
    print_success "Windows build completed successfully!"
else
    print_warning "Windows build failed or skipped (may require Wine on macOS/Linux)"
fi

echo ""
print_success "🎉 Build process completed!"
echo ""
echo "📦 Build artifacts:"
echo "   • Web: ./dist/"
echo "   • macOS Intel: ./dist-electron/"
echo "   • macOS Apple Silicon: ./dist-electron/"
echo "   • Windows: ./dist-electron/"
echo ""
echo "📋 Available npm scripts:"
echo "   • npm run build:web - Build web version only"
echo "   • npm run build:mac-intel - Build macOS Intel only"
echo "   • npm run build:mac-silicon - Build macOS Apple Silicon only"
echo "   • npm run build:windows - Build Windows only"
echo "   • npm run build:all - Build all platforms"
echo ""
echo "🔗 GitHub: https://github.com/andreapianidev/OpenGatewayAI"
echo "👨‍💻 Created by Andrea Piani"
echo ""