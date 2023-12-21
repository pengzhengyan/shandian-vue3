<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConfigStore, useMemberStore } from '@/stores'
import { PageLayout } from '@/enums/config';
import { useRouter, useRoute } from 'vue-router'


type MenuItem = {
  text: string
  iconName?: string
  routeName?: string
  children?: MenuItem[]
}

const configStore = useConfigStore()
const memberStore = useMemberStore()
const sidebarMenu = ref<MenuItem[]>([
  {
    text: '审核',
    iconName: 'icon-advertisement',
    children: [
      {
        text: '额度申请审核',
        routeName: 'applications-review',
      },
      {
        text: '订单申请',
        routeName: 'oders-review',
      },
    ],
  },
  {
    text: '用户分析',
    iconName: 'icon-limits',
    children: []
  },
])

let router = useRouter()
let route = useRoute()
let menuDefaultActiveIndex = computed(() => {
  let routeName = route.name
  let index = ''

  for (let i = 0, length = sidebarMenu.value.length - 1; i <= length; i++) {
    let item = sidebarMenu.value[i]

    if (item.routeName === routeName) {
      index = i + ''
      continue
    }

    let childrenItems = item.children

    for (let _subI = 0, _subLength = childrenItems!.length - 1; _subI <= _subLength; _subI++) {
      let subItem = childrenItems![_subI]

      if (subItem.routeName === routeName) {
        index = i + '-' + _subI
        continue
      }
    }

    if (index) continue
  }

  return index
})

function handleMenuSelect(index: string) {
  let indexArray = index.split('-')
  let item = {} as MenuItem

  if (indexArray.length === 1) item = sidebarMenu.value[+index]
  else item = sidebarMenu.value[+indexArray[0]].children![+indexArray[1]]

  router.push({ name: item.routeName })
}
</script>

<template>
  <template v-if="configStore.pageLayout === PageLayout.FullScreen">
    <router-view />
  </template>
  <template v-else>
    <div class="Layout">
      <div class="sidebar-container">
        <div class="logo">
          <img src="" />
        </div>
        <el-menu class="menu"
                 :default-active="menuDefaultActiveIndex"
                 active-text-color="#6b7aff"
                 @select="handleMenuSelect">
          <template v-for="(item, index) of sidebarMenu"
                    :key="index">
            <el-sub-menu v-if="item.children!.length"
                         :index="String(index)">
              <template #title>
                <i class="icon iconfont"
                   :class="item.iconName"></i>
                <span>{{ item.text }}</span>
              </template>
              <el-menu-item v-for="(subItem, subIndex) of item.children"
                            :key="subIndex"
                            :index="`${String(index)}-${String(subIndex)}`">
                {{ subItem.text }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item :index="String(index)"
                          v-else>
              <i class="icon iconfont"
                 :class="item.iconName"></i>
              <span>{{ item.text }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="main-container">
        <div class="header">
          <div class="left">

          </div>
          <div class="right">
            <el-avatar :size="50"
                       :src="memberStore.profile?.avatar" />
          </div>
        </div>
        <el-scrollbar height="100%">
          <div style="min-width: 1096px;">
            <div class="main-content pd25"
                 style="margin: 10px 0">
              <router-view />
              <p style="text-align: center; color: rgb(186, 187, 196); font-size: 12px; padding: 50px 0px 16px;"></p>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </template>
</template>

<style scoped lang="less">
.Layout {
  height: 100vh;
  display: flex;
  overflow: hidden;

  .sidebar-container {
    flex-shrink: 0;
    width: 184px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 8px 16px 0 #e5e6ed;
    z-index: 1;

    .logo {
      padding: 23px 0 20px;
      margin: 0 24px;
      border-bottom: 1px solid #e6e6e6;
    }

    :deep(.menu) {
      --el-menu-hover-bg-color: #f6f6f6;
      --el-menu-item-font-size: 13px;
      --el-menu-item-height: 40px;
      padding-top: 12px;
      border-right: none;

      .el-sub-menu,
      .el-menu-item {
        .icon {
          font-size: 14px;
          color: var(--el-menu-active-color);
          margin-right: 8px;
        }

        &:not(.is-active) {
          .icon {
            color: #babbc4;
          }
        }

        &.is-active {
          .el-sub-menu__title {
            color: var(--el-menu-active-color);
          }
        }
      }

      .el-sub-menu {
        .el-sub-menu__icon-arrow {
          right: 24px;
          color: #909399;
        }

        .el-menu {
          --el-menu-sub-item-height: 32px;
          --el-menu-item-font-size: 12px;

          .el-menu-item {
            margin: 4px 0;

            &.is-active {
              background-color: #f6f6f6;
            }
          }
        }
      }
    }
  }

  .main-container {
    width: 100%;
    flex-grow: 1;
    background-color: #f6f6f6;
    // overflow: auto;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 25px;

      .right {
        .user-avata {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }

    .main-content {
      width: 100%;
      position: relative;
      overflow: auto;
      height: calc(100vh - 72px);
      margin-top: 72px;


    }

    .pd25 {
      padding: 0 25px;
    }
  }
}
</style>