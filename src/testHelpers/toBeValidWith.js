expect.extend({
  toBeValidWith(flow, validator) {
    const { valid, message } = validator(flow);
    if (valid) {
      return {
        message: () => `expected ${flow} not to be valid but it was`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${flow} to be valid but it failed with the message: ${message}`,
        pass: false,
      };
    }
  },
});
