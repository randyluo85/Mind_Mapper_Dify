// 环境变量配置
export const config = {
  dify: {
    apiKey: process.env.DIFY_API_KEY || '',
    baseUrl: process.env.DIFY_API_BASE_URL || 'http://14.29.175.216:8123',
    endpoints: {
      chatMessages: '/v1/chat-messages'
    }
  }
}

// 验证配置
if (!config.dify.apiKey) {
  throw new Error('DIFY_API_KEY is required')
}

export default config 