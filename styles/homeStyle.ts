import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // 🔍 Barra de pesquisa
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },

  // campo pequeno de horário usado ao adicionar/editar hábito
  timeInput: {
    width: 80,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff'
  },

  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    marginLeft: 8,
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    elevation: 2,
  },
  addButtonDisabled: {
    backgroundColor: '#9ec9f7',
  },
  smallError: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  habitTime: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },

  // 🧾 Cards e seções
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  valueGreen: {
    fontSize: 22,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  valueRed: {
    fontSize: 22,
    color: '#F44336',
    fontWeight: 'bold',
  },

  // 📋 Tarefas e hábitos
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskHour: {
    width: 60,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 14,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  habitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  habitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeBadge: {
    backgroundColor: '#eef6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeBadgeText: {
    color: '#1976D2',
    fontWeight: '600',
    fontSize: 12,
  },

  // ❌ Texto quando nada for encontrado
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
    fontSize: 15,
  },

  // ⚙️ Rodapé
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#F5F5F5',
  },
});
