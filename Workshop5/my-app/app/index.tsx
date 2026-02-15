import "./global.css";
import React, { useState } from "react";
import {
  View, Text, ScrollView, KeyboardAvoidingView, Platform,
  Alert, TouchableWithoutFeedback, Keyboard
} from "react-native";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import Checkbox from "./components/Checkbox";
import RadioButton from "./components/RadioButton";
import DatePicker from "./components/DatePicker";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dateOfBirth: Date | null;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "", email: "", phone: "", address: "", gender: "", dateOfBirth: null, password: "", confirmPassword: "", acceptTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    { label: "ชาย", value: "male" },
    { label: "หญิง", value: "female" },
    { label: "ไม่ระบุ", value: "other" },
  ];

  // ฟังก์ชันคำนวณอายุ
  const calculateAge = (birthDate: Date | null): number => {
    if (!birthDate) return 0;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // ฟังก์ชันตรวจสอบความถูกต้องรายช่อง
  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "กรุณากรอกชื่อ-นามสกุล";
        if (value.trim().length < 3) return "ชื่อ-นามสกุลต้องอย่างน้อย 3 ตัวอักษร";
        return undefined;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!value.trim()) return "กรุณากรอกอีเมล";
        if (!emailRegex.test(value)) return "รูปแบบอีเมลไม่ถูกต้อง";
        return undefined;
      case "phone":
        if (!value.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
        if (!/^[0-9]{10}$/.test(value)) return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก"; 
        return undefined;
      case "address":
        if (!value.trim()) return "กรุณากรอกที่อยู่";
        if (value.trim().length < 10) return "ที่อยู่ต้องอย่างน้อย 10 ตัวอักษร";
        return undefined;
      case "gender":
        if (!value) return "กรุณาเลือกเพศ";
        return undefined;
      case "dateOfBirth":
        if (!value) return "กรุณาเลือกวันเกิด";
        const age = calculateAge(value);
        if (age < 13) return "อายุต้องมากกว่า 13 ปี";
        return undefined;
      case "password":
        if (!value) return "กรุณากรอกรหัสผ่าน";
        if (value.length < 6) return "รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร"; 
        return undefined;
      case "confirmPassword":
        if (!value) return "กรุณายืนยันรหัสผ่าน";
        if (value !== formData.password) return "รหัสผ่านไม่ตรงกัน"; 
        return undefined;
      case "acceptTerms":
        if (!value) return "กรุณายอมรับข้อกำหนดและเงื่อนไข";
        return undefined;
      default: return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) { 
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => ({ ...prev, [name]: true })); 
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) { newErrors[key] = error; isValid = false; }
    });
    setErrors(newErrors);
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched); 
    return isValid;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง"); 
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("สำเร็จ!", "ลงทะเบียนสำเร็จ", [
        { text: "รีเซ็ต", onPress: handleReset }
      ]); 
    }, 2000);
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", phone: "", address: "", gender: "", dateOfBirth: null, password: "", confirmPassword: "", acceptTerms: false });
    setErrors({});
    setTouched({}); 
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 bg-gray-50" contentContainerClassName="pb-8">
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">ลงทะเบียนสมาชิก</Text>
            <Text className="text-blue-100 text-base mt-2">กรุณากรอกข้อมูลให้ครบถ้วน</Text>
          </View>

          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(v) => handleChange("fullName", v)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(v) => handleChange("phone", v)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <CustomInput
              label="ที่อยู่"
              placeholder="ระบุที่อยู่ของคุณ"
              value={formData.address}
              onChangeText={(v) => handleChange("address", v)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              multiline
              maxLength={200}
              showCharCount
            />

            <RadioButton
              label="เพศ"
              options={genderOptions}
              selected={formData.gender}
              onSelect={(v) => {
                handleChange("gender", v);
                setTouched(prev => ({ ...prev, gender: true }));
              }}
              error={errors.gender}
              touched={touched.gender}
            />

            <DatePicker
              label="วันเกิด"
              value={formData.dateOfBirth}
              onChange={(date) => {
                handleChange("dateOfBirth", date);
                setTouched(prev => ({ ...prev, dateOfBirth: true }));
              }}
              error={errors.dateOfBirth}
              touched={touched.dateOfBirth}
            />

            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(v) => handleChange("password", v)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(v) => handleChange("confirmPassword", v)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
            />

            <Checkbox
              label="ฉันยอมรับข้อกำหนดและเงื่อนไข"
              checked={formData.acceptTerms}
              onPress={() => {
                handleChange("acceptTerms", !formData.acceptTerms);
                setTouched(prev => ({ ...prev, acceptTerms: true }));
              }}
              error={errors.acceptTerms}
              touched={touched.acceptTerms}
            />
            
            <View className="mt-4 space-y-3">
              <CustomButton title="ลงทะเบียน" onPress={handleSubmit} loading={isLoading} />
              <CustomButton title="รีเซ็ตฟอร์ม" onPress={handleReset} variant="secondary" disabled={isLoading} />
            </View>

            {/* คำแนะนำการกรอกข้อมูล */}
            <View className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <Text className="text-blue-800 text-base font-bold mb-3">คำแนะนำการกรอกข้อมูล</Text>
              <View className="space-y-2">
                <View className="flex-row items-start">
                  <Text className="text-blue-600 mr-2">•</Text>
                  <Text className="text-blue-700 text-sm flex-1">กรอกข้อมูลให้ครบถ้วน</Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-blue-600 mr-2">•</Text>
                  <Text className="text-blue-700 text-sm flex-1">อีเมลมีรูปแบบถูกต้อง</Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-blue-600 mr-2">•</Text>
                  <Text className="text-blue-700 text-sm flex-1">เบอร์โทรศัพท์เป็นตัวเลข 10 หลัก</Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-blue-600 mr-2">•</Text>
                  <Text className="text-blue-700 text-sm flex-1">รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}