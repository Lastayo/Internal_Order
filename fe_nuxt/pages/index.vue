<template>
    <!-- Your HTML/template code goes here -->
    <div>
      <p>Hello, {{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: 'World'
      };
    }
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles go here */
  </style>
  