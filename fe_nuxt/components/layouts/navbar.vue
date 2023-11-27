<template>
    <div>
      <nav class="h-20 bg-[#ffffff]">
        <ProfileSection />
      </nav>

    </div>
  </template>
  
  <script>
  import ProfileSection from "@/components/ProfileSection.vue"; // Sesuaikan dengan lokasi sebenarnya komponen ProfileSection
  
  export default {
    components: {
      ProfileSection,
    },
  };
  </script>
  
  <style scoped>
  .profile-section {
  z-index: 100; 
}
  </style>
  