#!/usr/bin/env node

/**
 * Code Analysis Script
 * Analyzes the codebase for best practices compliance and generates a report
 */

const fs = require('fs');
const path = require('path');

// Simple implementation of the analysis functions for Node.js
class CodeAnalyzer {
  constructor() {
    this.NAMING_PATTERNS = {
      component: /^[A-Z][a-zA-Z0-9]*$/,
      camelCase: /^[a-z][a-zA-Z0-9]*$/,
      constant: /^[A-Z][A-Z0-9_]*$/,
      interface: /^I[A-Z][a-zA-Z0-9]*$|^[A-Z][a-zA-Z0-9]*$/
    };
  }

  analyzeFile(content, fileName) {
    const issues = [];
    
    // Check for console.log
    const consoleLogs = (content.match(/console\.log\(/g) || []).length;
    if (consoleLogs > 0) {
      issues.push(`${consoleLogs} console.log statement(s) found`);
    }
    
    // Check for any types
    const anyTypes = (content.match(/:\s*any\b/g) || []).length;
    if (anyTypes > 0) {
      issues.push(`${anyTypes} 'any' type(s) found`);
    }
    
    // Check for hardcoded URLs
    const urls = content.match(/https?:\/\/[^\s"'`]+/g) || [];
    const hardcodedUrls = urls.filter(url => 
      !url.includes('localhost') && 
      !url.includes('example.com') &&
      !url.includes('process.env')
    );
    if (hardcodedUrls.length > 0) {
      issues.push(`${hardcodedUrls.length} hardcoded URL(s) found`);
    }
    
    // Check naming conventions
    const namingIssues = this.checkNaming(content);
    issues.push(...namingIssues);
    
    // Calculate score
    const maxIssues = 10; // Arbitrary max for scoring
    const score = Math.max(0, Math.round((1 - issues.length / maxIssues) * 100));
    
    return {
      fileName,
      score,
      issues,
      issueCount: issues.length
    };
  }
  
  checkNaming(content) {
    const issues = [];
    
    // Check component names
    const componentMatches = content.match(/(?:export\s+(?:default\s+)?(?:function|const)\s+)(\w+)/g) || [];
    componentMatches.forEach(match => {
      const name = match.match(/(\w+)$/)?.[1];
      if (name && name[0] === name[0].toUpperCase() && !this.NAMING_PATTERNS.component.test(name)) {
        issues.push(`Component '${name}' should use PascalCase`);
      }
    });
    
    // Check interface names
    const interfaceMatches = content.match(/interface\s+(\w+)/g) || [];
    interfaceMatches.forEach(match => {
      const name = match.match(/interface\s+(\w+)/)?.[1];
      if (name && !this.NAMING_PATTERNS.interface.test(name)) {
        issues.push(`Interface '${name}' should use PascalCase`);
      }
    });
    
    return issues;
  }
  
  scanDirectory(dirPath, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
    const files = [];
    
    const scanRecursive = (currentPath) => {
      const items = fs.readdirSync(currentPath);
      
      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanRecursive(fullPath);
        } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const relativePath = path.relative(process.cwd(), fullPath);
            files.push({ name: relativePath, content });
          } catch (error) {
            console.warn(`Could not read file ${fullPath}:`, error.message);
          }
        }
      });
    };
    
    scanRecursive(dirPath);
    return files;
  }
  
  generateReport(files) {
    console.log('\n🔍 Code Analysis Report\n' + '='.repeat(50));
    
    const results = files.map(file => this.analyzeFile(file.content, file.name));
    
    // Overall statistics
    const totalFiles = results.length;
    const totalIssues = results.reduce((sum, r) => sum + r.issueCount, 0);
    const averageScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / totalFiles);
    const goodFiles = results.filter(r => r.score >= 80).length;
    
    console.log(`📊 Overall Statistics:`);
    console.log(`   Files analyzed: ${totalFiles}`);
    console.log(`   Average score: ${averageScore}/100`);
    console.log(`   Files with good practices: ${goodFiles}/${totalFiles} (${Math.round(goodFiles/totalFiles*100)}%)`);
    console.log(`   Total issues found: ${totalIssues}`);
    
    // Top issues
    const allIssues = results.flatMap(r => r.issues);
    const issueTypes = {};
    allIssues.forEach(issue => {
      const type = issue.split(' ')[0];
      issueTypes[type] = (issueTypes[type] || 0) + 1;
    });
    
    console.log(`\n🚨 Most Common Issues:`);
    Object.entries(issueTypes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([type, count]) => {
        console.log(`   ${type}: ${count} occurrences`);
      });
    
    // Files with most issues
    const problematicFiles = results
      .filter(r => r.issueCount > 0)
      .sort((a, b) => b.issueCount - a.issueCount)
      .slice(0, 10);
    
    if (problematicFiles.length > 0) {
      console.log(`\n⚠️  Files needing attention:`);
      problematicFiles.forEach(file => {
        console.log(`   ${file.fileName} (Score: ${file.score}/100, Issues: ${file.issueCount})`);
        file.issues.slice(0, 3).forEach(issue => {
          console.log(`     - ${issue}`);
        });
        if (file.issues.length > 3) {
          console.log(`     ... and ${file.issues.length - 3} more`);
        }
      });
    }
    
    // Best performing files
    const bestFiles = results
      .filter(r => r.score >= 90)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    if (bestFiles.length > 0) {
      console.log(`\n✅ Best performing files:`);
      bestFiles.forEach(file => {
        console.log(`   ${file.fileName} (Score: ${file.score}/100)`);
      });
    }
    
    // Recommendations
    console.log(`\n💡 Recommendations:`);
    if (issueTypes['console.log']) {
      console.log(`   - Remove ${issueTypes['console.log']} console.log statements`);
    }
    if (issueTypes['any']) {
      console.log(`   - Replace 'any' types with proper TypeScript types`);
    }
    if (issueTypes['hardcoded']) {
      console.log(`   - Move hardcoded URLs to environment variables`);
    }
    if (Object.keys(issueTypes).some(key => key.includes('naming'))) {
      console.log(`   - Fix naming convention violations`);
    }
    
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Analysis complete! Overall score: ${averageScore}/100`);
    
    return {
      totalFiles,
      averageScore,
      totalIssues,
      results
    };
  }
}

// Main execution
if (require.main === module) {
  const analyzer = new CodeAnalyzer();
  const srcPath = path.join(process.cwd(), 'src');
  
  console.log('Starting code analysis...');
  console.log(`Scanning directory: ${srcPath}`);
  
  try {
    const files = analyzer.scanDirectory(srcPath);
    console.log(`Found ${files.length} files to analyze`);
    
    const report = analyzer.generateReport(files);
    
    // Save report to file
    const reportPath = path.join(process.cwd(), 'code-analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nDetailed report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error('Error during analysis:', error.message);
    process.exit(1);
  }
}

module.exports = CodeAnalyzer;