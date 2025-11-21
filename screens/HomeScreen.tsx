import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { homeStyles as styles } from '../styles/homeStyle';

// ----------------- TIPOS -----------------
interface Habito {
  id: string;
  nome: string;
  streak: number;
  ultimoDiaCompleto: string | null;
}

interface Tarefa {
  id: string;
  nome: string;
  hora: string;
  tipo: "tarefa";
}

const HomeScreen: React.FC = () => {

  const [searchText, setSearchText] = useState("");

  // -------- FORMULÁRIO --------
  const [novoNome, setNovoNome] = useState("");
  const [novoHorario, setNovoHorario] = useState("");

  // -------- LISTA DE TAREFAS --------
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // -------- PONTOS / HÁBITOS --------
  const [pontos, setPontos] = useState(0);

  const [habitos, setHabitos] = useState<Habito[]>([
    { id: '4', nome: 'Meditar', streak: 0, ultimoDiaCompleto: null },
    { id: '5', nome: 'Treinar', streak: 0, ultimoDiaCompleto: null },
    { id: '6', nome: 'Beber água', streak: 0, ultimoDiaCompleto: null },
  ]);

  // -------- ADICIONAR TAREFA --------
  const adicionarTarefa = () => {
    if (!novoNome.trim() || !novoHorario.trim()) return;

    const novaTarefa: Tarefa = {
      id: String(Date.now()),
      nome: novoNome.trim(),
      hora: novoHorario.trim(),
      tipo: "tarefa",
    };

    setTarefas(prev => [...prev, novaTarefa]);

    setNovoNome("");
    setNovoHorario("");
  };

  // -------- CONCLUIR HÁBITO (PONTOS + STREAK) --------
  const concluirHabito = (id: string) => {
    let adicionarPontos = false;

    const novos = habitos.map(h => {
      if (h.id !== id) return h;

      const hoje = new Date().toDateString();
      const ontem = new Date(Date.now() - 86400000).toDateString();

      let novoStreak = h.streak;

      // já completou hoje → não contabiliza de novo
      if (h.ultimoDiaCompleto === hoje) {
        return h;
      }

      // completou ontem → continua streak
      if (h.ultimoDiaCompleto === ontem) {
        novoStreak++;
      } else {
        novoStreak = 1;
      }

      adicionarPontos = true;

      return {
        ...h,
        streak: novoStreak,
        ultimoDiaCompleto: hoje,
      };
    });

    setHabitos(novos);

    if (adicionarPontos) {
      setPontos(p => p + 10);
    }
  };

  // -------- FILTROS --------
  const tarefasFiltradas = tarefas.filter(t =>
    t.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const habitosFiltrados = habitos.filter(h =>
    h.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerTitle}>SyncLife</Text>
        <Ionicons name="square" size={28} color="#fff" />
      </View>


      {/* BUSCA */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#555" />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar atividade ou hábito..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* ORÇAMENTO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Como está seu orçamento</Text>
        <Text style={styles.label}>Disponível para gastar</Text>
        <Text style={styles.valueGreen}>R$ 200</Text>
        <Text style={styles.label}>Gasto esse mês</Text>
        <Text style={styles.valueRed}>R$ 1.200</Text>
      </View>

      {/* FORMULÁRIO */}
      <Text style={styles.sectionTitle}>Adicionar nova atividade</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Nome da atividade"
          value={novoNome}
          onChangeText={setNovoNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Horário (ex: 14:00)"
          value={novoHorario}
          onChangeText={setNovoHorario}
        />

        <TouchableOpacity style={styles.btn} onPress={adicionarTarefa}>
          <Text style={styles.btnText}>Adicionar atividade</Text>
        </TouchableOpacity>
      </View>

      {/* ATIVIDADES */}
      <Text style={styles.sectionTitle}>Suas atividades para hoje</Text>

      <View style={styles.card}>
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map(item => (
            <View key={item.id} style={styles.taskRow}>
              <Text style={styles.taskHour}>{item.hora}</Text>
              <Text style={styles.taskText}>{item.nome}</Text>
              <Ionicons name="warning-outline" size={20} color="#FFC107" />
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhuma atividade encontrada.</Text>
        )}
      </View>

      {/* HÁBITOS */}
      <Text style={styles.sectionTitle}>Hábitos de hoje</Text>
      {/* PONTOS */}
      <Text style={{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        color: "#4CAF50",
      }}>
        Pontos: {pontos}
      </Text>
      <View style={styles.card}>
        {habitosFiltrados.length > 0 ? (
          habitosFiltrados.map(item => (
            <View key={item.id} style={styles.habitRow}>
              <TouchableOpacity onPress={() => concluirHabito(item.id)}>
                <FontAwesome5 name="check-circle" size={22} color="#4CAF50" />
              </TouchableOpacity>

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.habitText}>{item.nome}</Text>
                <Text style={{ fontSize: 12, color: "#555" }}>
                  Streak: {item.streak} dias
                </Text>
              </View>

              <Ionicons name="refresh" size={20} color="#2196F3" />
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum hábito encontrado.</Text>
        )}
      </View>

    </ScrollView>


  );
};

export default HomeScreen;
