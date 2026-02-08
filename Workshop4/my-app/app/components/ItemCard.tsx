import { View, Text } from 'react-native';
import { CustomButton } from './CustomButton';

type ItemCardProps = {
  productName: string;
  price: number;
  pcs: number;
  btnSize: any;
  btnColor: any;
};

export const ItemCard = ({ productName, price, pcs, btnSize, btnColor }: ItemCardProps) => (
  <View className="bg-gray-100 p-4 mb-4 rounded-xl border border-gray-200">
    <Text className="text-[2.25rem] font-bold text-gray-800">{productName}</Text>
    <Text className="text-base text-gray-600">ราคา: {price}</Text>
    <Text className="text-base text-gray-600 mb-3">จำนวน: {pcs}</Text>
    <CustomButton 
      title="สั่งซื้อ" 
      variant={btnColor} 
      size={btnSize} 
      onPress={() => alert(`สั่งซื้อ ${productName} สำเร็จ!`)} 
    />
  </View>
);