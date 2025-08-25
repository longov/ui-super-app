import {StatusBar, Dimensions} from 'react-native'

const WINDOW_HEIGHT = height(100)
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0
export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const ANDROID_NAV_HEIGHT = ios ? 0 : SCREEN_HEIGHT - WINDOW_HEIGHT - STATUS_BAR_HEIGHT
