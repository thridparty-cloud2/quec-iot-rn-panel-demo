import {setBusinessThemeHooks} from '@quec/panel-business-kit';
import {setComponentThemeHooks} from '@quec/panel-components-kit';
import {createThemeStore} from '@quec/panel-theme-kit';
import {darkColors, lightColors} from '../config/color.config';
import {darkImages, lightImages} from '../config/image.config';
export const {
    useThemeColors,
    useThemeColorStyles,
    useInitTheme,
    useThemeImg,
    useThemeStatusBarStyle,
    useThemeMode,
} = createThemeStore({
    lightColors,
    darkColors,
    lightImages,
    darkImages,
    colorToStyleFn: undefined,
});

// 也可不填
setComponentThemeHooks({
    useComponentThemeColor: useThemeColors,
    useComponentThemeImg: useThemeImg,
    useThemeStatusBarStyle: useThemeStatusBarStyle,
});

setBusinessThemeHooks({
    useBusinessThemeColor: useThemeColors,
    useBusinessThemeImg: useThemeImg,
    useThemeStatusBarStyle: useThemeStatusBarStyle,
});
