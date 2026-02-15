import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface CustomInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export default function CustomInput({
  label,
  error,
  touched,
  showCharCount,
  maxLength,
  value,
  multiline,
  ...textInputProps
}: CustomInputProps) {
  const hasError = touched && error;
  const charCount = typeof value === "string" ? value.length : 0;

  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-700 text-base font-semibold">{label}</Text>
        {showCharCount && maxLength && (
          <Text className="text-gray-500 text-sm">
            {charCount}/{maxLength}
          </Text>
        )}
      </View>
      <TextInput
        className={`w-full px-4 py-3 border rounded-lg text-base ${
          hasError ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        } ${multiline ? "min-h-[100px]" : ""}`}
        placeholderTextColor="#9CA3AF"
        value={value}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        {...textInputProps}
      />
      {hasError && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}