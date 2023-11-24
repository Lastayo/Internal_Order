<template>
  <div>
    <LayoutsNavbar />
    <LayoutsSidebar />
    <div class="profile-box">
      <div class="profile-data">
        <div class="profile-info">
          <img
            class="profile-picture"
            src="assets/man.png"
            alt="Profile Picture"
          />
          <div class="user-info">
            <div class="username">Haikal Adibasta</div>
            <div class="email">superhaikal@gmail.com</div>
          </div>
        </div>
        <div class="delete-btn">
          <button @click="deleteProfilePicture">Delete Avatar</button>
        </div>
        <div class="edit-btn">
          <button @click="editProfilePicture">Edit Avatar</button>
        </div>
      </div>
      <hr class="garis-profil">
      <div class="personal-detail">
        <div class="personal-text">Personal Details</div>
        <div class="personal-info">
          <div class="detail-item">
            <div class="detail-label">Name</div>
            <div class="detail-value placeholder">Haikal Adibasta</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Email</div>
            <div class="detail-value placeholder">superhaikal@gmail.com</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Position</div>
            <div class="detail-value placeholder">Vice President</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Role</div>
            <div class="detail-value placeholder">Admin</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Telp Number</div>
            <div class="detail-value placeholder">085707141728</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
      deleteProfilePicture() {
          // Logika untuk menghapus foto profil
          console.log('Foto profil dihapus');
      },
      editProfilePicture() {
          // Logika untuk mengedit foto profil
          console.log('Foto profil diedit');
      },
  },
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.personal-detail {
padding: 20px 40px;
}
.personal-text {
font-size: 25px;
font-weight: 600;
}

.personal-info {
display: flex;
flex-wrap: wrap;
margin-top: 20px;
}

.detail-item {
flex-basis: calc(50% - 20px);
margin-right: 20px;
margin-bottom: 20px;
}

.detail-label {
font-weight: 500;
color: #333;
}

.detail-value {
margin-top: 5px;
color: #67728A;

}

.placeholder {
  
  font-size: 14px;
color: #67728A; /* Warna teks placeholder */
border: 1px solid #abb4c7; /* Warna border */
background-color: #f3f6f9; /* Warna background */
padding: 10px; /* Padding untuk memberikan ruang di sekitar teks */
border-radius: 8px;
}


.profile-info {
padding-right: 450px;
display: flex;
align-items: center;
}

.delete-btn button {
  margin-left: 10px;
  cursor: pointer;
  padding: 10px 10px;
  background-color: #fff;
  color: #C53030;
  border: 1px solid #C53030;
  border-radius: 5px;
  font-size: 14px;
}

.delete-btn button:hover {
  background-color: #f1f1f1;
}

.edit-btn button {
  margin-left: 10px;
  cursor: pointer;
  padding: 10px 25px;
  background-color: #C53030;

  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
}

.edit-btn button:hover {
  background-color: #900000;
}


.user-info {
  padding-left: 15px;
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 500;
  font-size: 16px;
  /* Adjust the font size for username */

}

.email {
  font-size: 13px;
  /* Adjust the font size for email */
  color: #808080;
  /* Grey color for email */
}


.profile-data {
  padding-bottom: 30px;
  padding-top: 30px;
  padding-left: 40px;
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 75px;
  /* Adjust the width of the profile picture */
  height: 75px;
  /* Adjust the height of the profile picture */
  border-radius: 50%;
  /* Make it circular */
  margin-right: 10px;
  /* Add margin to separate profile picture from user info */
}

.centered-image {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.profile-box {

  font-family: Poppins;
  position: fixed;
  top: 55%;
  right: 70px;
  transform: translateY(-50%);
  border-radius: 20px;
  width: 1100px;
  /* Ganti ukuran lebar sesuai kebutuhan */
  height: 550px;
  
  padding: 15px;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  /* Pastikan box muncul di atas sidebar */
}

/* .profile-box p {
  margin: 0;
  font-size: 16px;
  color: #333;
} */
</style>