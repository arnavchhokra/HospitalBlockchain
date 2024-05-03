if (typeof process === 'undefined') {
    Object.defineProperty(
      this,
      'process',
      {
        value: {
          env: {
            NODE_ENV: 'production'
          }
        },
        writable: true
      });
  }