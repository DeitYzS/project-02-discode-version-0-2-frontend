<template>
  <div class="VStack">
    <div class="VStack text-center align-middle items-center space-y-10 mt-20">
      <div class="space-y-6">
        <p class="text-5xl font-semibold">
          Unlock New Way with Super Idol
          <br />
          Unleash the Spirit of Management!
        </p>
        <p class="text-gray-500">
          Elephant pants are loose, wide-legged pants with colourful patterns, often featuring
          elephant designs.
          <br />
          They are known for their comfortable and relaxed fit, popular for casual and beachwear.
        </p>
      </div>

      <div class="HStack space-x-10">
        
        <RouterLink
          class="ocean-blue p-2 rounded-lg"
          :to="{ name: 'register' }"
        >
          Register
        </RouterLink>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.ocean-blue {
  background-color: #1b9ff4;
  color: white;
  min-width: 120px;
}
</style>
