<script setup lang="ts">
import { ref } from 'vue'
import { postLoginH5API } from '@/services/member'
import { useMemberStore } from '@/stores'
import { useRouter } from 'vue-router'
// import type {LoginResult} from '@/types/member'
/**
 * 按钮加载状态
 * - (true) 加载中
 * - (false) 反之
 */
let buttonLoading = ref(false)
const account = ref('')
const password = ref('')

const enterlogin = (e: KeyboardEvent) => {
  if (e.key === "Enter") handleLogIn()
}
/** 处理登录按钮点击事件 */
async function handleLogIn() {
  const result = await postLoginH5API({
    account: account.value,
    password: password.value
  })
  if (result) {
    const { setProfile } = useMemberStore()
    setProfile(result.data)
    useRouter().push({ name: 'applications-review' })
  }
}
</script>

<template>
  <div class="Login"
       @keyup="enterlogin">
    <div class="left-content">
      <div class="title">
        <p>Welcome back!</p>
        <p>Please sign in to your</p>
        <p><span style="text-decoration: underline;">SHANDIAN TECH</span> account</p>
      </div>
      <div class="description">
        闪垫科技审批后台
      </div>
    </div>
    <div class="right-content">
      <div class="logo">
        <span style='color: mediumpurple;'>SHANDIAN</span>
        <span>' '</span>
        <span style='color: hotpink;'>TECH</span>

      </div>
      <div class="enter-container">
        <div class="title">闪垫科技</div>
        <div class="description">首次登录即为注册</div>
        <div class="form">
          <div class="form-item">
            <div class="label">用户名</div>
            <el-input placeholder="手机号"
                      autocomplete="off"
                      v-model="account" />
          </div>
          <div class="form-item">
            <div class="label">密码</div>
            <el-input placeholder="6-12位"
                      show-password
                      autocomplete="off"
                      v-model="password" />
          </div>
        </div>
        <el-button class="login-button"
                   type="primary"
                   :loading="buttonLoading"
                   @click="handleLogIn">登录 / 注册</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.Login {
  width: 100vw;
  height: 100vh;
  background-color: #f7fafe;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 3vw;

  .left-content {
    width: 740px;
    height: 100%;
    padding: 50px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    &::before {
      background-color: var(--el-color-primary);
      background-image: url('@/assets/images/login/image1.jpg');
      background-size: cover;
    }

    &::after {
      backdrop-filter: blur(25px);
    }

    .title {
      font-weight: 600;
      font-size: 50px;
      color: #fff;
      text-align: center;
      margin-bottom: 30px;
      line-height: 54px;
      z-index: 1;
    }

    .description {
      font-size: 20px;
      color: #fff;
      opacity: .55;
      text-align: center;
      z-index: 1;
    }
  }

  .right-content {
    width: 508px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      font-weight: 800;
      font-size: 30px;
      margin-bottom: 20px;
    }

    .enter-container {
      width: 100%;
      background-color: #fff;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, .05);

      .title {
        text-align: center;
        font-size: 24px;
        color: #000;
        margin-bottom: 15px;
      }

      .description {
        text-align: center;
        font-size: 16px;
        color: #000;
        opacity: .55;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 30px;

        .form-item {
          .label {
            font-size: 14px;
            color: #000;
            opacity: .55;
            margin-bottom: 10px;
          }

          .el-input {
            --el-input-border-radius: 12px;
            --el-component-size: 48px;
          }
        }
      }

      .login-button {
        --el-font-size-base: 16px;
        --el-border-radius-base: 12px;
        width: 100%;
        height: 48px;
        margin-top: 16px;
      }
    }
  }
}
</style>
@/pinia/userInfo