import React, {memo} from 'react'
import {View, Text, ScrollView} from 'react-native'
import {NumberTSLModel, useTslWriter} from '@quec/panel-model-kit'
// @ts-ignore
import SyntaxHighlighter from 'react-native-syntax-highlighter'
// @ts-ignore
import {monoBlue, monokai, obsidian} from 'react-syntax-highlighter/styles/hljs'

interface NumberDetailCellProps {
  tsl: NumberTSLModel
}

const markdown = `
const NumberDetailCell= ({tsl}) => {
  const codeString = '(num) => num + 1'
  return (
    <View>
      <Text>{tsl.name}</Text>
      <SyntaxHighlighter
        language="javascript"
        style={obsidian}
        highlighter="hljs"
        PreTag={Text}
        CodeTag={Text}
      >
        {markdown}
      </SyntaxHighlighter>
    </View>
  )
}
`

const NumberDetailCell: React.FC<NumberDetailCellProps> = ({tsl}) => {
  const tslWriter = useTslWriter()

  return (
    <View>
      <Text>{tsl.name}</Text>
      <SyntaxHighlighter
        language="typescript"
        style={obsidian}
        highlighter="hljs"
        PreTag={Text}
        CodeTag={Text}
      >
        {markdown}
      </SyntaxHighlighter>
    </View>
  )
}

export default memo(NumberDetailCell)
