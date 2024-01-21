import FontAwesome from "@expo/vector-icons/FontAwesome"
// Import your global CSS file
import "../global.css"
import {
  DarkTheme,
  Theme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as Notifications from "expo-notifications"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "expo-status-bar"
import * as Updates from "expo-updates"
import React, { useRef } from "react"
import { AppState, Platform } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ToastProvider } from "~/components/ui/toast"
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar"
import { NAV_THEME } from "~/lib/constants"
import { PortalHost } from "~/lib/rn-primitives/portal/portal-native"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
}

async function onFetchUpdateAsync() {
  if (process.env.NODE_ENV === "development") {
    return
  }

  const update = await Updates.checkForUpdateAsync()

  if (update.isAvailable) {
    await Updates.fetchUpdateAsync()
    await Updates.reloadAsync()
  }
}

export default function RootLayout() {
  useAppForground(onFetchUpdateAsync, true)

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  useEffect(() => {
    // Listener for when the app is opened from a notification
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification Response:", response)
        // Handle the notification response
      }
    )

    // Check if app was opened by a notification
    handleInitialNotification()

    // Clean up
    return () => subscription.remove()
  }, [])

  // Function to handle the initial notification
  const handleInitialNotification = async () => {
    const response = await Notifications.getLastNotificationResponseAsync()
    if (response) {
      console.log("Launched by a notification:", response)
      // Handle the initial notification
    }
  }

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.log(error)
      throw error
    }
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  )
}

function useAppForground(cb: () => void, onMount = true) {
  const appState = useRef(AppState.currentState)
  useEffect(() => {
    if (onMount) {
      cb()
    }
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        cb()
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])
}
