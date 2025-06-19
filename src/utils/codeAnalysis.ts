/**
 * Code Analysis Utilities
 * Provides tools for analyzing code quality and best practices compliance
 */

/**
 * Naming Convention Patterns
 */
const NAMING_PATTERNS = {
  // React Components should be PascalCase
  component: /^[A-Z][a-zA-Z0-9]*$/,
  
  // Variables and functions should be camelCase
  camelCase: /^[a-z][a-zA-Z0-9]*$/,
  
  // Constants should be UPPER_SNAKE_CASE
  constant: /^[A-Z][A-Z0-9_]*$/,
  
  // Files should be camelCase or PascalCase
  fileName: /^[a-zA-Z][a-zA-Z0-9]*\.(ts|tsx|js|jsx)$/,
  
  // CSS classes should be kebab-case or camelCase
  cssClass: /^[a-z][a-z0-9-]*$|^[a-z][a-zA-Z0-9]*$/,
  
  // Interface names should start with 'I' or be PascalCase
  interface: /^I[A-Z][a-zA-Z0-9]*$|^[A-Z][a-zA-Z0-9]*$/,
  
  // Type names should be PascalCase
  type: /^[A-Z][a-zA-Z0-9]*$/
};

/**
 * Best Practices Rules
 */
interface BestPracticeRule {
  name: string;
  description: string;
  pattern?: RegExp;
  check: (content: string) => {
    passed: boolean;
    violations: string[];
  };
}

const BEST_PRACTICE_RULES: BestPracticeRule[] = [
  {
    name: 'No console.log in production',
    description: 'Remove console.log statements from production code',
    pattern: /console\.log\(/g,
    check: (content: string) => {
      const matches = content.match(/console\.log\(/g) || [];
      return {
        passed: matches.length === 0,
        violations: matches.map((_, index) => `console.log found at occurrence ${index + 1}`)
      };
    }
  },
  {
    name: 'Proper error handling',
    description: 'Use try-catch blocks for async operations',
    check: (content: string) => {
      const asyncFunctions = content.match(/async\s+\w+/g) || [];
      const tryCatchBlocks = content.match(/try\s*\{[\s\S]*?catch/g) || [];
      const hasProperErrorHandling = asyncFunctions.length === 0 || tryCatchBlocks.length > 0;
      
      return {
        passed: hasProperErrorHandling,
        violations: hasProperErrorHandling ? [] : ['Async functions should have proper error handling']
      };
    }
  },
  {
    name: 'No hardcoded URLs',
    description: 'Use environment variables for API URLs',
    pattern: /https?:\/\/[^\s"'`]+/g,
    check: (content: string) => {
      const urls = content.match(/https?:\/\/[^\s"'`]+/g) || [];
      const violations = urls.filter(url => 
        !url.includes('process.env') && 
        !url.includes('localhost') &&
        !url.includes('example.com')
      );
      
      return {
        passed: violations.length === 0,
        violations: violations.map(url => `Hardcoded URL found: ${url}`)
      };
    }
  },
  {
    name: 'Proper TypeScript types',
    description: 'Avoid using any type',
    pattern: /:\s*any\b/g,
    check: (content: string) => {
      const anyTypes = content.match(/:\s*any\b/g) || [];
      return {
        passed: anyTypes.length === 0,
        violations: anyTypes.map((_, index) => `'any' type found at occurrence ${index + 1}`)
      };
    }
  },
  {
    name: 'Component prop validation',
    description: 'React components should have proper prop types',
    check: (content: string) => {
      const isReactComponent = /export\s+(default\s+)?(?:function|const)\s+[A-Z]\w*/.test(content) ||
                              /React\.FC/.test(content);
      
      if (!isReactComponent) {
        return { passed: true, violations: [] };
      }
      
      const hasInterface = /interface\s+\w+Props/.test(content);
      const hasTypeAnnotation = /:\s*React\.FC<\w+>/.test(content);
      
      return {
        passed: hasInterface || hasTypeAnnotation,
        violations: hasInterface || hasTypeAnnotation ? [] : ['React component should have proper prop types']
      };
    }
  },
  {
    name: 'No unused imports',
    description: 'Remove unused import statements',
    check: (content: string) => {
      const imports = content.match(/import\s+(?:{[^}]+}|\w+)\s+from\s+['"][^'"]+['"]/g) || [];
      const violations: string[] = [];
      
      imports.forEach(importStatement => {
        const match = importStatement.match(/import\s+(?:{([^}]+)}|(\w+))/);
        if (match) {
          const importedItems = match[1] ? match[1].split(',').map(s => s.trim()) : [match[2]];
          importedItems.forEach(item => {
            if (item && !content.includes(item.replace(/\s+as\s+\w+/, ''))) {
              violations.push(`Unused import: ${item}`);
            }
          });
        }
      });
      
      return {
        passed: violations.length === 0,
        violations
      };
    }
  },
  {
    name: 'Proper function naming',
    description: 'Functions should use camelCase naming',
    check: (content: string) => {
      const functions = content.match(/(?:function|const)\s+(\w+)/g) || [];
      const violations: string[] = [];
      
      functions.forEach(func => {
        const match = func.match(/(?:function|const)\s+(\w+)/);
        if (match && match[1]) {
          const funcName = match[1];
          if (!NAMING_PATTERNS.camelCase.test(funcName) && !NAMING_PATTERNS.component.test(funcName)) {
            violations.push(`Function '${funcName}' should use camelCase naming`);
          }
        }
      });
      
      return {
        passed: violations.length === 0,
        violations
      };
    }
  },
  {
    name: 'No magic numbers',
    description: 'Use named constants instead of magic numbers',
    check: (content: string) => {
      // Look for standalone numbers that might be magic numbers
      const numbers = content.match(/\b(?<!\.)\d{2,}(?!\.\d)\b/g) || [];
      const commonNumbers = ['100', '200', '300', '400', '500', '1000'];
      const violations = numbers.filter(num => 
        !commonNumbers.includes(num) && 
        parseInt(num) > 10 &&
        !content.includes(`const `) // Rough check if it's already a constant
      );
      
      return {
        passed: violations.length === 0,
        violations: violations.map(num => `Potential magic number: ${num}`)
      };
    }
  }
];

/**
 * Analyze code content for best practices compliance
 */
export const analyzeCode = (content: string, fileName: string): {
  fileName: string;
  score: number;
  totalRules: number;
  passedRules: number;
  violations: Array<{
    rule: string;
    description: string;
    violations: string[];
  }>;
} => {
  const results = BEST_PRACTICE_RULES.map(rule => {
    const result = rule.check(content);
    return {
      rule: rule.name,
      description: rule.description,
      passed: result.passed,
      violations: result.violations
    };
  });
  
  const passedRules = results.filter(r => r.passed).length;
  const totalRules = results.length;
  const score = Math.round((passedRules / totalRules) * 100);
  
  return {
    fileName,
    score,
    totalRules,
    passedRules,
    violations: results.filter(r => !r.passed)
  };
};

/**
 * Check naming conventions in code
 */
export const checkNamingConventions = (content: string): {
  passed: boolean;
  violations: string[];
} => {
  const violations: string[] = [];
  
  // Check component names
  const components = content.match(/(?:export\s+(?:default\s+)?(?:function|const)\s+|React\.FC<\w+>\s*=\s*\(\)\s*=>)\s*(\w+)/g) || [];
  components.forEach(comp => {
    const match = comp.match(/(\w+)$/);
    if (match && match[1] && !NAMING_PATTERNS.component.test(match[1])) {
      violations.push(`Component '${match[1]}' should use PascalCase`);
    }
  });
  
  // Check interface names
  const interfaces = content.match(/interface\s+(\w+)/g) || [];
  interfaces.forEach(int => {
    const match = int.match(/interface\s+(\w+)/);
    if (match && match[1] && !NAMING_PATTERNS.interface.test(match[1])) {
      violations.push(`Interface '${match[1]}' should use PascalCase or start with 'I'`);
    }
  });
  
  // Check constant names
  const constants = content.match(/const\s+(\w+)\s*=\s*(?:'[^']*'|"[^"]*"|\d+|true|false)/g) || [];
  constants.forEach(constant => {
    const match = constant.match(/const\s+(\w+)/);
    if (match && match[1]) {
      const constName = match[1];
      // If it's all uppercase, it should follow UPPER_SNAKE_CASE
      if (constName === constName.toUpperCase() && !NAMING_PATTERNS.constant.test(constName)) {
        violations.push(`Constant '${constName}' should use UPPER_SNAKE_CASE`);
      }
    }
  });
  
  return {
    passed: violations.length === 0,
    violations
  };
};

/**
 * Generate a comprehensive code quality report
 */
export const generateQualityReport = (files: Array<{ name: string; content: string }>): {
  overallScore: number;
  totalFiles: number;
  filesAnalyzed: number;
  summary: {
    bestPractices: number;
    namingConventions: number;
    totalViolations: number;
  };
  fileReports: Array<{
    fileName: string;
    score: number;
    violations: number;
    issues: string[];
  }>;
} => {
  const fileReports = files.map(file => {
    const codeAnalysis = analyzeCode(file.content, file.name);
    const namingAnalysis = checkNamingConventions(file.content);
    
    const allIssues = [
      ...codeAnalysis.violations.flatMap(v => v.violations),
      ...namingAnalysis.violations
    ];
    
    return {
      fileName: file.name,
      score: codeAnalysis.score,
      violations: allIssues.length,
      issues: allIssues
    };
  });
  
  const overallScore = Math.round(
    fileReports.reduce((sum, report) => sum + report.score, 0) / fileReports.length
  );
  
  const totalViolations = fileReports.reduce((sum, report) => sum + report.violations, 0);
  
  return {
    overallScore,
    totalFiles: files.length,
    filesAnalyzed: fileReports.length,
    summary: {
      bestPractices: Math.round(fileReports.filter(r => r.score >= 80).length / fileReports.length * 100),
      namingConventions: Math.round(fileReports.filter(r => r.issues.filter(i => i.includes('naming')).length === 0).length / fileReports.length * 100),
      totalViolations
    },
    fileReports
  };
};