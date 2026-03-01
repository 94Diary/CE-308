import { Stack } from 'expo-router';
import "./global.css"; 

/**
 * Root Layout - แหล่งรวมหน้าจอทั้งหมด
 */
export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#f4511e' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Product Details' }} />
    </Stack>
  );
}