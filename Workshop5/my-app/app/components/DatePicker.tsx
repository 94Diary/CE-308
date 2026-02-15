import React, { useState } from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  touched?: boolean;
}

export default function DatePicker({
  label,
  value,
  onChange,
  error,
  touched,
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const hasError = touched && error;

  const formatDate = (date: Date | null): string => {
    if (!date) return "เลือกวันเกิด";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
      if (Platform.OS === "ios") {
        setShowPicker(false);
      }
    } else if (event.type === "dismissed") {
      setShowPicker(false);
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 text-base font-semibold mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className={`w-full px-4 py-3 border rounded-lg ${
          hasError ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        }`}
        activeOpacity={0.7}
      >
        <Text
          className={`text-base ${
            value ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {formatDate(value)}
        </Text>
      </TouchableOpacity>
      {hasError && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}
