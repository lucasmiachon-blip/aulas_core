/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Arquivos para verificar
    files: ['scripts/**/*.js', 'OSTEOPOROSE/src/js/**/*.js', 'GRADE/src/js/**/*.js'],
    
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        CustomEvent: 'readonly',
        URLSearchParams: 'readonly',
        location: 'readonly',
        history: 'readonly',
        navigator: 'readonly',
        alert: 'readonly',
        Node: 'readonly',
        URL: 'readonly',
        ResizeObserver: 'readonly',
        DOMParser: 'readonly',
        MutationObserver: 'readonly',
        IntersectionObserver: 'readonly',
        // Node globals (for scripts)
        process: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
      },
    },
    
    rules: {
      // Erros importantes
      'no-undef': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-const-assign': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      
      // Boas práticas (warn, não error)
      'eqeqeq': ['warn', 'smart'],
      'no-var': 'warn',
      'prefer-const': 'warn',
      
      // Desligados (muito barulhento para código legado)
      'no-console': 'off',
      'no-debugger': 'warn',
    },
  },
  
  {
    // Ignorar completamente
    ignores: [
      'node_modules/**',
      'archive/**',
      'scripts/archive/**',
      '**/*.min.js',
      '**/node_modules/**',
    ],
  },
];
