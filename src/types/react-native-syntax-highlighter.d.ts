declare module 'react-native-syntax-highlighter' {
  import React from 'react'

  export interface SyntaxHighlighterProps {
    language?: string
    style?: any
    highlighter?: 'prism' | 'hljs'
    PreTag?: React.ElementType
    CodeTag?: React.ElementType
    customStyle?: any
    children: string | string[]
    [key: string]: any
  }

  const SyntaxHighlighter: React.ComponentType<SyntaxHighlighterProps>
  export default SyntaxHighlighter
}
