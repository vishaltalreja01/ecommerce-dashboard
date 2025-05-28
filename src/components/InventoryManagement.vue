<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Inventory Management</h2>

    <input
      type="text"
      v-model="search"
      placeholder="Search products..."
      class="p-2 border rounded w-full mb-4"
    />

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">Product</th>
          <th class="border p-2">Category</th>
          <th class="border p-2">Stock</th>
          <th class="border p-2">Price</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td class="border p-2">{{ product.name }}</td>
          <td class="border p-2">{{ product.category }}</td>
          <td class="border p-2">
            <input
              type="number"
              v-model.number="product.stock"
              class="w-16 p-1 border rounded"
            />
          </td>
          <td class="border p-2">${{ product.price.toFixed(2) }}</td>
          <td class="border p-2">
            <button @click="updateStock(product)" class="bg-blue-500 text-white px-2 py-1 rounded">
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Toast Notification -->
    <div
      v-if="toast.visible"
      :class="[
        'fixed bottom-6 right-6 px-4 py-2 rounded shadow-lg transition-opacity duration-300',
        toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

export default {
  name: 'InventoryManagement',
  setup() {
    const products = ref([]);
    const search = ref('');

    const toast = ref({
      visible: false,
      message: '',
      type: 'success', // 'success' or 'error'
    });

    const showToast = (message, type = 'success') => {
      toast.value.message = message;
      toast.value.type = type;
      toast.value.visible = true;
      setTimeout(() => {
        toast.value.visible = false;
      }, 3000);
    };

    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/inventory');
        products.value = response.data;
      } catch (error) {
        console.error('Error fetching inventory:', error);
        showToast('Failed to fetch inventory', 'error');
      }
    };

    const updateStock = async (product) => {
      try {
        await axios.post('http://localhost:3001/api/inventory/update', {
          id: product.id,
          stock: product.stock,
        });
        showToast('Stock updated successfully', 'success');
      } catch (error) {
        console.error(error);
        showToast('Error updating stock', 'error');
      }
    };

    const filteredProducts = computed(() => {
      return products.value.filter((p) =>
        p.name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    onMounted(fetchInventory);

    return {
      search,
      products,
      filteredProducts,
      updateStock,
      toast,
    };
  },
};
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
