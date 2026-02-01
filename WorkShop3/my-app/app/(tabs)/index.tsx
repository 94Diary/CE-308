import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const ProfileApp = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
     
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

     
      <View style={styles.row}>
        <View style={[styles.infoBox, { backgroundColor: '#8E44AD' }]}>
          <Text style={styles.boxTitle}>รหัส</Text>
          <Text style={styles.boxText}>66110768</Text>
        </View>
        <View style={[styles.infoBox, { backgroundColor: '#E67E22' }]}>
          <Text style={styles.boxTitle}>คณะ</Text>
          <Text style={styles.boxText}>วิทยาลัยวิศวกรรมศาสตร์และเทคโนโลยี</Text>
        </View>
        <View style={[styles.infoBox, { backgroundColor: '#16A085' }]}>
          <Text style={styles.boxTitle}>สาขา</Text>
          <Text style={styles.boxText}>วิศวกรรมคอมพิวเตอร์</Text>
        </View>
      </View>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ข้อมูลส่วนตัว:</Text>
        <View style={styles.card}><Text>ชื่อ-นามสกุล: พรพิชัย สีธินัน</Text></View>
        <View style={styles.card}><Text>อีเมล: 66110768@Dpu.ac.th</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>การศึกษา:</Text>
        <View style={styles.card}><Text>มหาวิทยาลัยธุรกิจบัณฑิตย์</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>สิ่งที่ชอบ:</Text>
        <View style={styles.card}><Text>• พัฒนา โปรแกรมโดยใช้ Lua กับ Python</Text></View>
        <View style={styles.card}><Text>• เล่นเกม open world</Text></View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>สิ่งที่ไม่ชอบ:</Text>
        <View style={styles.card}><Text>• ไอกัส ไอตี๋ เพื่อนๆในกลุ่มมันเจ้าชู้รับไม่ได้</Text></View>
        <View style={styles.card}><Text>• เล่นเกมกับเพื่อนแล้วมันโง่เกิน</Text></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 100, 
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15, // มีมุมโค้งมน
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row', // จัดเรียงแนว Row 
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  boxText: {
    color: 'white',
    fontSize: 12,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#2C3E50', // 
  },
});
export default ProfileApp;