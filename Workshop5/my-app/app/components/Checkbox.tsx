import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}

export default function Checkbox({
  label,
  checked,
  onPress,
  error,
  touched,
}: CheckboxProps) {
  const hasError = touched && error;

  return (
    <View className="mb-4">
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center"
        activeOpacity={0.7}
      >
        <View
          className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
            hasError
              ? "border-red-500"
              : checked
              ? "border-blue-600 bg-blue-600"
              : "border-gray-300"
          }`}
        >
          {checked && <Text className="text-white font-bold text-sm">✓</Text>}
        </View>
        <Text className="text-gray-700 text-base flex-1">{label}</Text>
      </TouchableOpacity>
      {hasError && <Text className="text-red-500 text-sm mt-1 ml-9">{error}</Text>}
    </View>
  );
}
