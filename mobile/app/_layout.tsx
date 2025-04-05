import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)"
        options={{
          headerShown:false,
        }}
      />

      <Stack.Screen name="[task_id]" options={{
        headerShown:true,
        headerTitle:'Edit task'
      }} />
    </Stack>
  )
  // return <Stack />;
}
