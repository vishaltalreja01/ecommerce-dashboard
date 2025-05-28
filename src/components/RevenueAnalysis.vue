<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-6">Dashboard: Orders & Revenue</h2>
    <div class="flex gap-6 mb-6">
      <div>
        <label>Time Range:</label>
        <select v-model="selectedRange" @change="fetchData" class="p-2 border rounded">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
      </div>
      <div>
        <label>Category Filter:</label>
        <select v-model="selectedCategory" @change="fetchData" class="p-2 border rounded">
          <option value="">All</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mb-6">
      <div class="p-4 border rounded">
        <h3 class="text-lg font-semibold">Total Orders</h3>
        <p class="text-2xl">{{ totalOrders }}</p>
      </div>
      <div class="p-4 border rounded">
        <h3 class="text-lg font-semibold">Total Revenue</h3>
        <p class="text-2xl">${{ totalRevenue.toLocaleString() }}</p>
      </div>
    </div>

    <div>
      <canvas ref="ordersChart"></canvas>
    </div>
    <div class="mt-6">
      <canvas ref="revenueChart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'Dashboard',
  setup() {
    const ordersChart = ref(null);
    const revenueChart = ref(null);

    const selectedRange = ref('daily');
    const selectedCategory = ref('');
    const categories = ref(['Electronics', 'Home']); // You can fetch dynamically if needed

    const totalOrders = ref(0);
    const totalRevenue = ref(0);

    const ordersChartInstance = ref(null);
    const revenueChartInstance = ref(null);

    const dashboardData = ref([]);

    const fetchData = async () => {
      try {
        const params = {
          range: selectedRange.value,
        };
        if (selectedCategory.value) {
          params.category = selectedCategory.value;
        }

        const response = await axios.get('https://ecommerce-dashboard-backend-production.up.railway.app/api/inventory/dashboard-data', { params });
        dashboardData.value = response.data;

        calculateTotals();
        renderCharts();
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };

    const calculateTotals = () => {
      totalOrders.value = dashboardData.value.reduce((sum, item) => sum + item.orders, 0);
      totalRevenue.value = dashboardData.value.reduce((sum, item) => sum + item.revenue, 0);
    };

    const renderCharts = () => {
      // Extract unique sorted dates for x-axis
      const labels = [...new Set(dashboardData.value.map(item => item.date))].sort();

      const ordersData = labels.map(date =>
        dashboardData.value
          .filter(item => item.date === date)
          .reduce((sum, item) => sum + item.orders, 0)
      );

      const revenueData = labels.map(date =>
        dashboardData.value
          .filter(item => item.date === date)
          .reduce((sum, item) => sum + item.revenue, 0)
      );

      // Orders Chart
      if (ordersChartInstance.value) ordersChartInstance.value.destroy();
      ordersChartInstance.value = new Chart(ordersChart.value, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Orders',
              data: ordersData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });

      // Revenue Chart
      if (revenueChartInstance.value) revenueChartInstance.value.destroy();
      revenueChartInstance.value = new Chart(revenueChart.value, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Revenue ($)',
              data: revenueData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: val => `$${val.toLocaleString()}`,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: ctx => `$${ctx.parsed.y.toLocaleString()}`,
              },
            },
          },
        },
      });
    };

    onMounted(fetchData);

    return {
      selectedRange,
      selectedCategory,
      categories,
      totalOrders,
      totalRevenue,
      ordersChart,
      revenueChart,
      fetchData,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 300px !important;
}
</style>
