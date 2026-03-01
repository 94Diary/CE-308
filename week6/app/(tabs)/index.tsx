import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

/**
 * Market Screen - หน้าจอแสดงรายการสินค้า (ด้วย Tailwind CSS)
 */

const products = [
  { id: '1', name: 'Premium Coffee Bean', price: '450', description: 'เมล็ดกาแฟคั่วกลางจากดอยช้าง หอมกลิ่นช็อกโกแลตและถั่ว' },
  { id: '2', name: 'Green Tea Powder', price: '290', description: 'ผงชาเขียวมัทฉะแท้ 100% นำเข้าจากเมืองอูจิ ประเทศญี่ปุ่น' },
  { id: '3', name: 'Oat Milk 1L', price: '115', description: 'นมข้าวโอ๊ต รสจืด ปราศจากน้ำตาลแลคโตส' },
];

export default function MarketScreen() {
  return (
    <ScrollView className="bg-slate-50 flex-1 p-5">
      <Text className="text-xl font-bold mb-4 text-slate-800">รายการสินค้า</Text>
      
      {products.map((item) => (
        <Pressable
          key={item.id}
          // ใช้ className สไตล์ Tailwind แทน StyleSheet
          className="bg-white p-5 rounded-2xl mb-4 flex-row items-center justify-between active:scale-95 shadow-sm border border-slate-100"
          onPress={() => {
            router.push({
              pathname: '/details',
              params: {
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
              }
            });
          }}
        >
          <View className="flex-1">
            <Text className="text-lg font-bold text-slate-900 mb-1">{item.name}</Text>
            <Text className="text-primary font-bold text-base">฿{item.price}</Text>
          </View>
          <View className="bg-slate-50 w-8 h-8 rounded-full items-center justify-center">
             <Text className="text-slate-400 font-bold">></Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}