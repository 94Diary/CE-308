import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

/**
 * Details Screen - หน้าจอรายละเอียดสินค้า (ด้วย Tailwind CSS)
 */
export default function DetailsScreen() {
  // รับค่า Params ที่ส่งมาจากหน้าก่อนหน้า
  const { name, price, description } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white">
      {/* พื้นที่แสดงรูปภาพ */}
      <View className="w-full h-80 bg-slate-100 items-center justify-center">
        <Text className="text-slate-400 font-medium">Product Image Placeholder</Text>
      </View>

      <View className="p-8">
        <Text className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">{name}</Text>
        <Text className="text-2xl font-bold text-primary mb-6">฿{price}</Text>
        
        <View className="h-[1] bg-slate-100 w-full mb-6" />
        
        <Text className="text-lg font-bold text-slate-800 mb-2">รายละเอียดสินค้า</Text>
        <Text className="text-slate-600 leading-7 text-base">
          {description}
        </Text>
        
        {/* ปุ่มสั่งซื้อ (ตกแต่งด้วย Tailwind) */}
        <View className="mt-10 bg-primary p-4 rounded-xl items-center shadow-md shadow-orange-300">
          <Text className="text-white font-bold text-lg">เพิ่มลงตะกร้า</Text>
        </View>
      </View>
    </ScrollView>
  );
}