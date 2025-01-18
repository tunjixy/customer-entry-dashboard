<template>
  <div>
    <DashboardSidebar :menus="menus" />
    <div class="relative lg:ml-[260px] px-0 lg:pl-5">
      <NavHeader />
      <div ref="scrollArea" class="bg-white lg:rounded-tl-3xl shadow-custom">
        <div class="h-full overflow-y-auto">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '@/types/misc'
import { ref, useTemplateRef, onMounted, onUnmounted, markRaw } from 'vue'
import UsersIcon from '@/assets/icons/user.svg'
import NavHeader from '@/components/navigation/NavHeader.vue'
import DashboardSidebar from '@/components/navigation/DashboardSidebar.vue'

const menus = ref<Menu[]>([
  { name: 'Users', url: '/', icon: markRaw(UsersIcon as unknown as object) },
])

const scrollArea = useTemplateRef('scrollArea')

function updateScrollArea() {
  if (scrollArea.value) {
    scrollArea.value.style.height = `${window.innerHeight - 65}px`
  }
}

window.addEventListener('resize', updateScrollArea)

onMounted(() => {
  updateScrollArea()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollArea)
})
</script>
