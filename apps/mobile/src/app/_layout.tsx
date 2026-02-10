import "@/global.css"

import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { HeroUINativeProvider } from "heroui-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"

function StackLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="todo" options={{ title: "Todo" }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <HeroUINativeProvider>
          <StackLayout />
          <StatusBar style="auto" />
        </HeroUINativeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
