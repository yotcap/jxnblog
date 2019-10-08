module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ['import', {
      'libraryName': 'iview',
      'libraryDirectory': 'src/components'
    }],
    ['prismjs', {
      'languages': ['javascript', 'css', 'markup', 'bash', 'json', 'less', 'scss'],
      'plugins': ['line-numbers', 'show-language', 'highlight-keywords', 'copy-to-clipboard'],
      'theme': 'tomorrow',
      'css': true
    }]
  ]
}
