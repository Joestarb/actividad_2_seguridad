<template>
    <div class="flex min-h-screen bg-[#F9F9F9F]  ">
    <!-- Sidebar -->

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-[#578E7E] shadow-sm p-4 flex items-center justify-between">
        <div>
          <RouterLink to="/" class="text-xl font-bold text-[#F5F5F5]">My App Header</RouterLink>
        </div>
        <div class=" flex gap-5">
          <RouterLink to="/" class=" text-white font-semibold">Notas</RouterLink>
          <RouterLink to="/categories" class=" text-white font-semibold">Categorias</RouterLink>

          <RouterLink to="/vs" class=" text-white font-semibold">Watch</RouterLink>

        </div>
      </header>

      <main class="flex-1 bg-[#F9F9F9F]">
        <div class="rounded-lg p-6">
          <slot />
        </div>
      </main>

      <footer class="bg-[#578E7E] text-white py-4 text-center">
        <p class="text-sm">&copy; 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
