<template>
    <div>
      <LayoutsNavbar />
      <LayoutsSidebar />
      <div class="welcome-box">
        <h1>Welcome Guys</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .welcome-box {
    position: fixed;
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
    border-radius: 25px;
    width: 1000px; /* Ganti ukuran lebar sesuai kebutuhan */
    height: 500px;
    padding: 15px;
    background-color: #f5f5f5;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Pastikan box muncul di atas sidebar */
  }
  
  .welcome-box p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  </style>