import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { homeStyles as styles } from '../styles/homeStyle';

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const tarefas = [
    { id: '1', tipo: 'tarefa', hora: '08:00', nome: 'Reunião com o time' },
    { id: '2', tipo: 'tarefa', hora: '12:00', nome: 'Almoço com a esposa' },
    { id: '3', tipo: 'tarefa', hora: '13:00', nome: 'Estudar programação' },
    { id: '4', tipo: 'habito', nome: 'Meditar' },
    { id: '5', tipo: 'habito', nome: 'Treinar' },
    { id: '6', tipo: 'habito', nome: 'Beber água' },
  ];

  const filtrados = tarefas.filter(item =>
    item.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  
  const mostrarItens = searchText.length > 0 ? filtrados : tarefas;

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerTitle}>SyncLife</Text>
        <Ionicons name="square" size={28} color="#fff" />
      </View>

     
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#555" />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar tarefa ou hábito..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Como está seu orçamento</Text>
        <Text style={styles.label}>Disponível para gastar</Text>
        <Text style={styles.valueGreen}>R$ 200</Text>
        <Text style={styles.label}>Gasto esse mês</Text>
        <Text style={styles.valueRed}>R$ 1.200</Text>
      </View>

      
      <Text style={styles.sectionTitle}>
        {searchText ? 'Resultados da pesquisa' : 'Suas atividades e hábitos de hoje'}
      </Text>

      <View style={styles.card}>
        {mostrarItens.length > 0 ? (
          mostrarItens.map((item) =>
            item.tipo === 'tarefa' ? (
              <View key={item.id} style={styles.taskRow}>
                <Text style={styles.taskHour}>{item.hora}</Text>
                <Text style={styles.taskText}>{item.nome}</Text>
                <Ionicons name="warning-outline" size={20} color="#FFC107" />
              </View>
            ) : (
              <View key={item.id} style={styles.habitRow}>
                <FontAwesome5 name="check-circle" size={20} color="#2196F3" />
                <Text style={styles.habitText}>{item.nome}</Text>
                <Ionicons name="refresh" size={20} color="#2196F3" />
              </View>
            )
          )
        ) : (
          <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
        )}
      </View>

     
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
