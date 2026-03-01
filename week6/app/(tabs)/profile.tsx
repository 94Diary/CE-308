import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Profile Screen - หน้าจอโปรไฟล์ (ด้วย Tailwind CSS)
 */
export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      {/* ส่วนหัวโปรไฟล์ */}
      <View className="w-32 h-32 rounded-full bg-orange-50 items-center justify-center mb-6 border-2 border-primary">
        <Ionicons name="person" size={64} color="#f4511e" />
      </View>
      
      <Text className="text-2xl font-bold text-slate-900">Somsak Digital</Text>
      <Text className="text-slate-500 mt-1">somsak@example.com</Text>
      
      {/* การ์ดข้อมูลสรุป */}
      <View className="mt-8 p-5 bg-slate-50 rounded-2xl w-full flex-row justify-around border border-slate-100">
        <View className="items-center">
          <Text className="text-slate-400 text-xs mb-1 uppercase tracking-wider">สถานะ</Text>
          <Text className="font-bold text-slate-800">สมาชิกทั่วไป</Text>
        </View>
        <View className="w-[1] h-full bg-slate-200" />
        <View className="items-center">
          <Text className="text-slate-400 text-xs mb-1 uppercase tracking-wider">คะแนน</Text>
          <Text className="font-bold text-slate-800">1,250</Text>
        </View>
      </View>
    </View>
  );
}