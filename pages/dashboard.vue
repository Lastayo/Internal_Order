
<template>
  <div class="flex bg-[#EDF2F7] bg-cover min-h-screen">
    <LayoutsSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <LayoutsNavbar />
      <div class="py-8 px-12 ">
        <div class="w-full flex flex-col bg-cover p-5 rounded" :style="{ 'background-image': 'url(/assets/spand3.jpg)' }">
          <h1 class="text-white font-semibold text-md md:text-xl lg:text-2xl">Welcome Back!</h1>
          <h3 class="text-white font-bold text-2xl md:text-3xl lg:text-4xl">{{ user.nama }}</h3>
        </div>

        <div class="py-6 flex space-x-7">
          <div class="h-32   w-full flex flex-col border-2 p-6 text-center bg-white rounded-lg">
            <h1 class="text-black font-bold text-xl">Internal Order Project</h1>
            <div> {{ project.total_projects }} </div>
          </div>
          <div class="h-32 w-full flex flex-col border-2 p-6 text-center bg-white rounded-lg">
            <h1 class="text-black font-bold text-xl">Total Project</h1>
          </div>
          <div class="h-32 w-full flex flex-col border-2 p-6 text-center bg-white rounded-lg">
            <h1 class="text-black font-bold text-xl">Project Charter</h1>
          </div>
        </div>

        <div class="flex space-x-14">
          <div class="h-72 w-full flex flex-col border-2 p-6 text-center bg-white rounded-lg">
            <h1 class="text-black font-bold text-xl">Internal Order Status Bar</h1>
            <canvas ref="iosbChart"></canvas>
          </div>
          <div class="h-72 w-full flex flex-col border-2 p-6 text-center bg-white rounded-lg">
            <h1 class="text-black font-bold text-xl">Project Charter Status Bar</h1>
            <canvas ref="pcsbChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        nama: "",
      },
      user: {},
      project: {},
      charter: {},
    };
  },

  methods: {
    createDonutChart(chartId, data, labels, colors) {
      const ctx = this.$refs[chartId].getContext('2d');

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: colors,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },

  mounted() {
    this.createDonutChart('iosbChart', [30, 25, 25], ['On Going', 'Finish', 'Dropped'], ['#C53030', '#E7E7E7', '#68788F']);
    this.createDonutChart('pcsbChart', [15, 60, 25], ['On Going', 'Finish', 'Dropped'], ['#C53030', '#E7E7E7', '#68788F']);

    let token = localStorage.getItem('token')

    console.log(token)

    axios.get('https://z8v4553q-8000.asse.devtunnels.ms/api/user/login/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    ).then((res) => {
      this.user = res.data
    })
      .catch((err) => {
        console.log(err)
      })

    axios.get('https://z8v4553q-8000.asse.devtunnels.ms/api/projectinternal/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
      .then((res) => {
        this.project = res.data.total_projects; // Update this line
      })
      .catch((err) => {
        console.log(err)
      })

    axios.get('https://z8v4553q-8000.asse.devtunnels.ms/api/projectcharter/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
      .then((res) => {
        this.charter = res.data.total_projects; // Update this line
      })
      .catch((err) => {
        console.log(err)
      })
  },

};
</script>
  
<style scoped>
/* Your Tailwind CSS styling */
</style>
  