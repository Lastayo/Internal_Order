<template>
    <aside class="sidebar">
        <nav>
            <div class="order-first hidden w-full lg:block">
                <img class="object-cover h-full bg-cover rounded-l-lg content-center px-5 py-2" src="assets/Telkomsigma-baru.svg"
                  alt="" />
              </div>
              <br><br><br><br><br><br>
            <ul>
                <li @click="navigateTo('/dashboard')">
                    <!-- <img src="/assets/Vector.svg" alt="Dashboard Icon" /> -->
                    Dashboard</li>
                <li class="fas fa-home" @click="navigateTo('/user')">User</li>
                <li @click="navigateTo('/employee')">Employee</li>
                <li @click="toggleDropdown('internalOrder')">Internal Order
                    <ul v-if="dropdowns.internalOrder">
                        <li @click="navigateTo('/internal-order/item1')">Order</li>
                        <li @click="navigateTo('/internal-order/item2')">Repository</li>
                    </ul>
                </li>
                <li @click="toggleDropdown('projectCharter')">Project Charter
                    <ul v-if="dropdowns.projectCharter">
                        <li @click="navigateTo('/project-charter/item1')">Order</li>
                        <li @click="navigateTo('/project-charter/item2')">Repository</li>
                    </ul>
                </li>
                <li @click="navigateTo('/logout')">Logout</li>
            </ul>
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

.sidebar {
    width: 270px;
    background-color: #ffffff;
    color: rgb(0, 0, 0)000;
    position: fixed; /* Fixed position so it stays visible while scrolling */
    height: 100vh; /* Full height of the viewport */
    top: 0; /* Align to the top of the viewport */
    left: 0; /* Align to the left of the viewport */
    padding-left: 40px;
    padding-top: 20px; /* Add some padding at the top */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add a subtle box shadow for depth */
}

nav {
    padding: 10px;
}

ul {
    list-style-type:none;
    padding: 0;
}

li {
    border-radius: 7px;
    list-style-type:none;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s; /* Add a smooth transition for hover effect */
}

li:hover {
    
    color: #ffffff;
    background-color: #d40000; /* Change the background color on hover */
    border-radius: 7px;
}

ul ul {
    display: none;
    padding-left: 15px;
}

ul li:hover>ul {
   
    display:block;
}
</style>
  