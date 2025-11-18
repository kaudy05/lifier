import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { homeStyles as styles } from '../styles/homeStyle';
import { createHabit, getHabits, Habit, updateHabit, deleteHabit } from '../database/habitRepository';

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');
  const [newHabitTime, setNewHabitTime] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingTime, setEditingTime] = useState('');

  // amostras removidas — somente hábitos persistidos serão exibidos
  const tarefas: Array<{ id: string; tipo: string; hora?: string; nome?: string }> = [];

  // combina `tarefas` e hábitos em uma única lista para busca e exibição
  const combinedItems = [
    ...tarefas.map(t => ({ ...t, id: `t-${t.id}` })),
    ...habits.map(h => ({ id: `h-${h.id}`, tipo: 'habito', nome: h.nome, horario: h.horario })),
  ];

  const filtrados = combinedItems.filter(item =>
    (item.nome ?? '').toLowerCase().includes(searchText.toLowerCase())
  );

  const mostrarItens = searchText.length > 0 ? filtrados : combinedItems;

  useEffect(() => {
    loadHabits();
  }, []);

  const route = useRoute<any>();
  const userId: number | null = route?.params?.userId ?? null;

  function formatTimeInput(value: string) {
    // keep only digits, max 4 (HHMM)
    const digits = (value || '').replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + ':' + digits.slice(2);
  }

  function formatTimeDisplay(value?: string | null) {
    if (!value) return '';
    const v = String(value);
    if (v.includes(':')) return v;
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return digits.slice(0, 2) + ':' + digits.slice(2);
  }

  async function loadHabits() {
    const rows = await getHabits(userId ?? null);
    setHabits(rows || []);
  }

  async function handleAddHabit() {
    if (!newHabit.trim()) return;
    const ok = await createHabit(newHabit.trim(), newHabitTime.trim() || null, userId ?? null);
    if (ok) {
      setNewHabit('');
      setNewHabitTime('');
      await loadHabits();
    }
  }

  async function handleStartEdit(combinedId: string, nome: string, horario?: string | null) {
    setEditingId(combinedId);
    setEditingText(nome);
    setEditingTime(horario ?? '');
  }

  async function handleSaveEdit() {
    if (editingId == null) return;
    if (!editingText.trim()) return;
    
    const idNum = parseInt(String(editingId).replace(/^h-/, ''), 10);
    if (Number.isNaN(idNum)) return;
    const ok = await updateHabit(idNum, editingText.trim(), editingTime.trim() || null, userId ?? null);
    if (ok) {
      setEditingId(null);
      setEditingText('');
      setEditingTime('');
      await loadHabits();
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setEditingText('');
  }

  async function handleDelete(combinedId: string) {
    Alert.alert('Confirmar', 'Deseja remover este hábito?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          const idNum = parseInt(String(combinedId).replace(/^h-/, ''), 10);
          if (Number.isNaN(idNum)) return;
          const ok = await deleteHabit(idNum, userId ?? null);
          if (ok) await loadHabits();
        },
      },
    ]);
  }

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

      <View style={[styles.card, { marginTop: 10 }]}> 
        <Text style={styles.sectionTitle}>Adicionar hábito</Text>
        <View style={styles.addRow as any}>
          <TextInput
            style={[styles.searchInput, { flex: 1, paddingVertical: 8 }]}
            placeholder="Nome do hábito"
            value={newHabit}
            onChangeText={(v) => { setNewHabit(v); }}
          />
          <TextInput
            style={styles.timeInput}
            placeholder="HH:MM"
            keyboardType="number-pad"
            value={newHabitTime}
            onChangeText={(v) => { setNewHabitTime(formatTimeInput(v)); }}
          />
          <TouchableOpacity
            onPress={handleAddHabit}
            style={styles.addButton as any}
            disabled={!newHabit.trim()}
          >
            <FontAwesome5 name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
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
                <Text style={styles.taskHour}>{(item as any).hora}</Text>
                <Text style={styles.taskText}>{(item as any).nome}</Text>
                <Ionicons name="warning-outline" size={20} color="#FFC107" />
              </View>
            ) : (
              <View key={item.id} style={styles.habitRow}>
                <FontAwesome5 name="check-circle" size={20} color="#2196F3" />
                {editingId === String(item.id) ? (
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={[styles.searchInput, { flex: 1, height: 36 }]}
                      value={editingText}
                      onChangeText={(v) => setEditingText(v)}
                    />
                    <TextInput
                      style={styles.timeInput}
                      placeholder="HH:MM"
                      value={editingTime}
                      onChangeText={(v) => { setEditingTime(v); }}
                    />
                    <TouchableOpacity onPress={handleSaveEdit} style={{ marginLeft: 8 }}>
                      <Ionicons name="checkmark" size={22} color={'#4CAF50'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelEdit} style={{ marginLeft: 8 }}>
                      <Ionicons name="close" size={22} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={{ flex: 1 }}>
                      <View>
                        <Text style={[styles.habitText]}>{(item as any).nome}</Text>
                      </View>
                      <View style={styles.habitMeta as any}>
                        {(item as any).horario ? (
                          <View style={styles.timeBadge as any}>
                            <Text style={styles.timeBadgeText as any}>{formatTimeDisplay((item as any).horario)}</Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => handleStartEdit(String(item.id), (item as any).nome, (item as any).horario)}>
                      <Ionicons name="create-outline" size={20} color="#2196F3" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(String(item.id))} style={{ marginLeft: 10 }}>
                      <Ionicons name="trash-outline" size={20} color="#F44336" />
                    </TouchableOpacity>
                  </>
                )}
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
