import { Animated, Easing, Platform } from 'react-native'

export class Animations {
  public static fromLeft(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ layout, position, scene }) => {
        const { index } = scene
        const { initWidth } = layout

        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [-initWidth, 0, 0]
        })

        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1]
          })

        return { opacity, transform: [{ translateX }] }
      }
    }
  }

  public static fromTop(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ layout, position, scene }) => {
        const { index } = scene
        const { initHeight } = layout

        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [-initHeight, 0, 0]
        })

        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1]
          })

        return { opacity, transform: [{ translateY }] }
      }
    }
  }

  public static fromRight(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ layout, position, scene }) => {
        const { index } = scene
        const { initWidth } = layout

        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [initWidth, 0, 0]
        })

        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1]
          })

        return { opacity, transform: [{ translateX }] }
      }
    }
  }

  public static fromBottom(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ layout, position, scene }) => {
        const { index } = scene
        const { initHeight } = layout

        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [initHeight, 0, 0]
        })

        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1]
          })

        return { opacity, transform: [{ translateY }] }
      }
    }
  }

  public static fadeIn(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ position, scene }) => {
        const { index } = scene

        const opacity = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [0, 1]
        })

        return { opacity }
      }
    }
  }

  public static zoomIn(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ position, scene }) => {
        const { index } = scene
        let start = 0

        if (Platform.OS !== 'ios') {
          start = 0.005
        }

        const scale = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [start, 1]
        })

        return { transform: [{ scale }] }
      }
    }
  }

  public static zoomOut(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ position, scene }) => {
        const { index } = scene

        const scale = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [10, 1]
        })

        return { transform: [{ scale }] }
      }
    }
  }

  public static flipY(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ position, scene }) => {
        const { index } = scene

        const rotateY = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: ['180deg', '0deg']
        })

        return { transform: [{ rotateY }], backfaceVisibility: 'hidden' }
      }
    }
  }

  public static flipX(duration: number = 300) {
    return {
      transitionSpec: {
        duration,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: ({ position, scene }) => {
        const { index } = scene

        const rotateX = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: ['180deg', '0deg']
        })

        return { transform: [{ rotateX }], backfaceVisibility: 'hidden' }
      }
    }
  }
}
