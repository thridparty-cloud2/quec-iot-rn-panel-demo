//@ts-nocheck
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
} from 'react-native'

const __TextRender: any = Text.render
const __TextInputRender: any = TextInput.render

export function setupNativeStyle() {
    Text.render = function (props: TextProps, ref: React.RefObject<Text>) {
        const {style, ..._props} = props
        const _style = style ? StyleSheet.flatten(style) : {}

        return __TextRender.call(
            this,
            {
                ..._props,
                style: {
                    ..._style,
                    ...(Platform.OS === 'android' && {fontFamily: ''}),
                    ...(Platform.OS === 'ios' && {writingDirection: 'ltr'}),
                },
            },
            ref,
        )
    }
    TextInput.render = function (
        props: TextInputProps,
        ref: React.RefObject<TextInput>,
    ) {
        const {style, ..._props} = props
        const _style = style ? StyleSheet.flatten(style) : {}

        return __TextInputRender.call(
            this,
            {
                ..._props,
                style: {
                    ..._style,
                    ...(Platform.OS === 'ios' && {writingDirection: 'ltr'}),
                },
            },
            ref,
        )
    }
    // 取消 Text 字体大小随着系统变化
    Text.defaultProps = Object.assign({}, Text.defaultProps, {
        allowFontScaling: false,
    })
    TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
        allowFontScaling: false,
    })
}
