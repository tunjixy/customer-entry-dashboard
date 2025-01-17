<template>
  <div>
    <DashboardSidebar :menus="menus" />
    <div class="relative lg:ml-[260px] px-0 lg:pl-5">
      <NavHeader />
      <div ref="dynamicDiv" class="bg-white lg:rounded-tl-3xl shadow-custom">
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
import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue'
import UsersIcon from '@/assets/icons/user.svg'
import NavHeader from '@/components/navigation/NavHeader.vue'
import DashboardSidebar from '@/components/navigation/DashboardSidebar.vue'

const menus = ref<Menu[]>([{ name: 'Users', url: '/', icon: UsersIcon }])

const div = useTemplateRef('dynamicDiv')

function setDivHeight() {
  if (div.value) {
    div.value.style.height = `${window.innerHeight - 65}px`
  }
}

window.addEventListener('resize', setDivHeight)

onMounted(() => {
  setDivHeight()
})

onUnmounted(() => {
  window.removeEventListener('resize', setDivHeight)
})
</script>
