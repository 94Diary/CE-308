import { ScrollView, View, Text, FlatList } from 'react-native';
import { useState } from 'react';
import "./global.css";
import { ItemCard } from './components/ItemCard';
import { CustomInput } from './components/CustomInput';
import { CustomButton } from './components/CustomButton';

export default function Index() {
  // Dataset สำหรับ Workshop 3.1 [cite: 618, 619]
  const items = [
    { id: "1", productName: "Banana", price: 2000, pcs: 10, btnSize: "sm", btnColor: "primary" },
    { id: "2", productName: "Mango", price: 1000, pcs: 10, btnSize: "md", btnColor: "secondary" },
    { id: "3", productName: "Apple", price: 1500, pcs: 10, btnSize: "lg", btnColor: "danger" },
  ];

  // State สำหรับ Workshop 3.2 [cite: 632]
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pcs, setPcs] = useState("");

  return (
    <ScrollView className="flex-1 bg-white p-5">
      {/* Workshop 3.2: Form Section */}
      <View className="mb-10">
        <Text className="text-2xl font-bold mb-5">กรอกข้อมูลสินค้า</Text>
        <CustomInput label="ชื่อสินค้า" value={name} onChangeText={setName} placeholder="กรุณากรอกชื่อสินค้า" />
        <CustomInput label="ราคา" value={price} onChangeText={setPrice} placeholder="กรุณากรอกราคา" />
        <CustomInput label="จำนวน" value={pcs} onChangeText={setPcs} placeholder="กรุณากรอกจำนวน" />
        <CustomButton title="ยืนยัน" variant="primary" size="md" onPress={() => alert("บันทึกข้อมูลแล้ว")} />
      </View>

      <View className="h-[1px] bg-gray-300 my-5" />

      {/* Workshop 3.1: Product List Section */}
      <Text className="text-2xl font-bold mb-5">รายการสินค้า</Text>
      {items.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </ScrollView>
  );
}