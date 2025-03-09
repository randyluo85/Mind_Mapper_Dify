'use server'

import { NodeData, ApiResponse } from '../types/types'
import config from '../config'

// API endpoints
const API_ENDPOINTS = {
  URL: `${config.dify.baseUrl}${config.dify.endpoints.chatMessages}`,
  YOUTUBE: `${config.dify.baseUrl}${config.dify.endpoints.chatMessages}`,
  PROMPT: `${config.dify.baseUrl}${config.dify.endpoints.chatMessages}`
}

// Helper function to determine the input type
function determineInputType(input: string): 'URL' | 'YOUTUBE' | 'PROMPT' {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
  const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/

  if (youtubeRegex.test(input)) {
    return 'YOUTUBE'
  } else if (urlRegex.test(input)) {
    return 'URL'
  } else {
    return 'PROMPT'
  }
}

// Helper function to extract JSON from text
function extractJsonFromText(text: string): string {
  // 匹配包含在 ```json 和 ``` 之间的内容，或者 { 开头 } 结尾的内容
  const jsonRegex = /```json\s*(\{[\s\S]*?\})\s*```|^\s*(\{[\s\S]*\})\s*$/;
  const match = text.match(jsonRegex);
  
  if (match) {
    // 返回第一个捕获组（```json 格式）或第二个捕获组（裸 JSON 格式）
    return (match[1] || match[2]).trim();
  }
  
  // 如果没有找到符合格式的 JSON，尝试找到第一个 { 和最后一个 } 之间的内容
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  
  if (start !== -1 && end !== -1) {
    return text.slice(start, end + 1).trim();
  }
  
  throw new Error('No valid JSON found in the response');
}

// Function to call the appropriate API based on input type
export async function generateMindMap(input: string): Promise<NodeData> {
  const inputType = determineInputType(input)
  const endpoint = API_ENDPOINTS[inputType]

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.dify.apiKey}`
      },
      body: JSON.stringify({
        inputs: {},
        query: `请将以下内容转换为思维导图的 JSON 格式，必须严格按照以下格式输出：
{
  "id": "string",
  "label": "string",
  "children": [
    {
      "id": "string",
      "label": "string",
      "children": [],
      "details": ["string"]
    }
  ],
  "details": ["string"]
}

内容如下：
${input}`,
        response_mode: "blocking",  // 使用 blocking 而不是 streaming，因为我们需要完整的响应
        conversation_id: "",
        user: "mindmapper"
      })
    })

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      })
      throw new Error(`API request failed: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    
    // Log the full response for debugging
    console.log('Full API response:', JSON.stringify(data, null, 2))
    
    // 从 DIFY 响应中提取 answer
    const answer = data.answer
    
    try {
      // 从回答中提取 JSON 字符串
      const jsonStr = extractJsonFromText(answer)
      // 解析 JSON 字符串
      const parsedData: NodeData = JSON.parse(jsonStr)
      console.log('Parsed mind map data:', parsedData)
      return parsedData
    } catch (parseError) {
      console.error('Error parsing mind map data:', parseError)
      // 如果解析失败，创建一个简单的节点结构
      return {
        id: '1',
        label: 'Error',
        children: [{
          id: '2',
          label: 'Failed to parse mind map data',
          details: [answer]
        }]
      }
    }
  } catch (error) {
    console.error('Error calling API:', error)
    throw error
  }
} 