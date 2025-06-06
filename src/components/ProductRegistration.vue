<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Register New Product</h2>

    <form @submit.prevent="submitProduct" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Product Name</label>
        <input v-model="name" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block mb-1 font-medium">Category</label>
        <select v-model="category" class="w-full p-2 border rounded" required>
          <option value="" disabled>Select Category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div>
        <label class="block mb-1 font-medium">Price ($)</label>
        <input v-model.number="price" type="number" step="0.01" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block mb-1 font-medium">Initial Stock</label>
        <input v-model.number="stock" type="number" class="w-full p-2 border rounded" required />
      </div>

      <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>

    <div
      v-if="toast.visible"
      class="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'ProductRegistration',
  setup() {
    const name = ref('');
    const category = ref('');
    const price = ref(0);
    const stock = ref(0);
    const categories = ref([]);

    const toast = ref({ visible: false, message: '' });

    const showToast = (message) => {
      toast.value.message = message;
      toast.value.visible = true;
      setTimeout(() => {
        toast.value.visible = false;
      }, 3000);
    };

    const submitProduct = async () => {
      try {
        await axios.post('https://ecommerce-dashboard-backend-production.up.railway.app/api/inventory/add', {
          name: name.value,
          category: category.value,
          price: price.value,
          stock: stock.value,
        });
        showToast('Product added successfully');
        name.value = '';
        category.value = '';
        price.value = 0;
        stock.value = 0;
      } catch (error) {
        console.error('Error adding product:', error);
        showToast('Failed to add product');
      }
    };

    onMounted(async () => {
      try {
        const response = await axios.get('https://ecommerce-dashboard-backend-production.up.railway.app/api/inventory/categories');
        categories.value = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    });

    return {
      name,
      category,
      price,
      stock,
      submitProduct,
      toast,
      categories,
    };
  },
};
</script>

<style scoped>
form input,
form select {
  display: block;
  width: 100%;
}
</style>
