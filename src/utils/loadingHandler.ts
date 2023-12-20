import { ElLoading } from 'element-plus'

// loading函数
// 记录请求次数
let needLoadingRequestCount = 0
let loading: any

function startLoading() {
  loading = ElLoading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.5)',
  })
}
function endLoading() {
  // 延迟500ms，防止网速特快加载中画面一闪而过
  setTimeout(function () {
    if (loading) loading.close()
  }, 500)
}
// 打开loading
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
// 关闭loading
export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}