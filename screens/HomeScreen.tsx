import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import { homeStyles as styles } from '../styles/homeStyle';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerTitle}>SyncLife</Text>
        <Ionicons name="square" size={28} color="#fff" />
      </View>

      {/* Orçamento */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Como está seu orçamento</Text>
        <Text style={styles.label}>Disponível para gastar</Text>
        <Text style={styles.valueGreen}>R$ 200</Text>
        <Text style={styles.label}>Gasto esse mês</Text>
        <Text style={styles.valueRed}>R$ 1.200</Text>
      </View>

      {/* Atividades */}
      <Text style={styles.sectionTitle}>Suas atividades para hoje</Text>
      <View style={styles.card}>
        <View style={styles.taskRow}>
          <Text style={styles.taskHour}>08:00</Text>
          <Text style={styles.taskText}>Reunião com o time</Text>
          <Ionicons name="warning-outline" size={20} color="#FFC107" />
        </View>
        <View style={styles.taskRow}>
          <Text style={styles.taskHour}>12:00</Text>
          <Text style={styles.taskText}>Almoço com a esposa</Text>
        </View>
        <View style={styles.taskRow}>
          <Text style={styles.taskHour}>13:00</Text>
          <Text style={styles.taskText}>Sla awdawdawdaw</Text>
        </View>
      </View>

      {/* Hábitos */}
      <Text style={styles.sectionTitle}>Hábitos de hoje</Text>
      <View style={styles.card}>
        <View style={styles.habitRow}>
          <FontAwesome5 name="spa" size={20} color="#000" />
          <Text style={styles.habitText}>Meditar</Text>
          <Ionicons name="refresh" size={20} color="#2196F3" />
        </View>
        <View style={styles.habitRow}>
          <FontAwesome5 name="dumbbell" size={20} color="#000" />
          <Text style={styles.habitText}>Treinar</Text>
          <Ionicons name="refresh" size={20} color="#2196F3" />
        </View>
        <View style={styles.habitRow}>
          <FontAwesome5 name="user-tie" size={20} color="#000" />
          <Text style={styles.habitText}>Comer o patrão</Text>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
        </View>
      </View>

      {/* Menu inferior */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <FontAwesome5 name="dollar-sign" size={24} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="tasks" size={24} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bar-chart-outline" size={24} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
