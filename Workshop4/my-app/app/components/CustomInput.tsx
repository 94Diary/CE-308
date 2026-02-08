import { View, Text, TextInput } from 'react-native';

type CustomInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
};

export const CustomInput = ({ label, value, onChangeText, placeholder }: CustomInputProps) => (
  <View className="mb-4">
    <Text className="text-gray-700 mb-1 font-medium">{label}</Text>
    <TextInput
      className="border border-gray-300 rounded-lg p-3 bg-white focus:border-blue-500"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  </View>
);