<template>
    <aside class="sidebar">
        <nav>
            <div class="order-first hidden w-full lg:block">
                <img class="object-cover h-full bg-cover rounded-l-lg content-center py-3 with-shadow centered-image"
                    src="assets/Telkomsigma-baru.svg" alt="" />
            </div>
            <br><br><br><br><br>
            <ul>
                <li @click="navigateTo('/dashbord')"><i class="fas fa-home px-3"></i>Dashboard</li>
                <li @click="navigateTo('/user')"><i class="fas fa-user px-3"></i>User</li>
                <li @click="navigateTo('/employee')"><i class="fas fa-clipboard-user px-3"></i>Employee</li>
                <li @click="toggleDropdown('internalOrder')"><i class="fas fa-receipt px-3"></i>Internal Order<i
                        class="fas fa-greater-than px-9 fa-2xs"></i>
                    <ul v-if="dropdowns.internalOrder">
                        <li @click="navigateTo('/internal-order/item1')"><i class="fas fa-circle fa-2xs px-3"></i>Order</li>
                        <li @click="navigateTo('/internal-order/item2')"><i class="fas fa-circle fa-2xs px-3"></i>Repository</li>
                    </ul>
                </li>
                <li @click="toggleDropdown('projectCharter')"><i class="fas fa-clipboard-list px-3"></i>Project Charter<i
                        class="fas fa-greater-than px-7 fa-2xs"></i>
                    <ul v-if="dropdowns.projectCharter">
                        <li @click="navigateTo('/project-charter/item1')"><i class="fas fa-circle fa-2xs px-3"></i>Order</li>
                        <li @click="navigateTo('/project-charter/item2')"><i class="fas fa-circle fa-2xs px-3"></i>Repository</li>
                    </ul>
                </li>
                <li @click="navigateTo('/logout')"><i class="fas fa-right-from-bracket px-3"></i>Logout</li>
            </ul>
            <br><br><br><br><br><br><br><br><br>
            
            <div  @click="navigateTo('/profile')" class="profile-section">
               
                <div class="profile-info">
                    <img class="profile-picture" src="assets/haikal-profile.jpg" alt="Profile Picture" />
                    <div class="user-info">
                        <div class="username">Haikal Adibasta</div>
                        <div class="email">superhaikal@gmail.com</div>
                    </div>
                </div>
            </div>
        </nav>
        
        
    </aside>
</template>
  
<script>
export default {
    data() {
        return {
            dropdowns: {
                internalOrder: false,
                projectCharter: false,
            },
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        toggleDropdown(key) {
            this.dropdowns[key] = !this.dropdowns[key];
        },
    },
};
</script>
  
<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');


.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    font-weight:normal;
    font-size: 14px; /* Adjust the font size for username */
    
}

.email {
    font-size: 12px; /* Adjust the font size for email */
    color: #808080; /* Grey color for email */
}

.profile-section {

  border-top: 2px solid #ccc; /* Warna dan ketebalan garis */
    margin-top: auto; /* Push profile section to the bottom */
    padding: 20px; /* Add padding for better spacing */
    background-color: #ffffff;
    cursor:pointer;
    
}

.profile-section:hover{
    border-radius: 5px;
    background-color: #eaeaea;
}

.profile-info {
    display: flex;
    align-items: center;
}

.profile-picture {
    width: 40px; /* Adjust the width of the profile picture */
    height: 40px; /* Adjust the height of the profile picture */
    border-radius: 50%; /* Make it circular */
    margin-right: 10px; /* Add margin to separate profile picture from user info */
}

.centered-image {
    max-width: 100%;
    display: block;
    margin: 0 auto;
}

.sidebar {
    font-family: 'Poppins';
    width: 280px;
    background-color: #ffffff;
    color: rgb(82, 82, 82)000;
    position: fixed;
    /* Fixed position so it stays visible while scrolling */
    height: 100vh;
    /* Full height of the viewport */
    top: 0;
    /* Align to the top of the viewport */
    left: 0;
    /* Align to the left of the viewport */
    padding-left: 5px;
    padding-top: 20px;
    /* Add some padding at the top */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    /* Add a subtle box shadow for depth */
}

nav {
    padding: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    font-size: 16px;
    color: rgb(100, 100, 100);
    border-radius: 7px;
    list-style-type: none;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
    /* Add a smooth transition for hover effect */
}

li:hover {

    color: #ffffff;
    background-color: #d40000;
    /* Change the background color on hover */
    border-radius: 7px;
}

ul ul {
    display: none;
    padding-left: 15px;
}

ul li:hover>ul {

    display: block;
}</style>
  