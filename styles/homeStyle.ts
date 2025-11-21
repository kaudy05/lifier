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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  habitText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
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


  input: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    padding: 12,              // AUMENTADO
    fontSize: 14,             // TEXTO MAIOR
    borderRadius: 14,         // MAIS ARREDONDADO
    backgroundColor: "#f7f7f7",
    marginBottom: 12,
  },

  btn: {
    backgroundColor: "#1E88E5",   // AZUL BONITO
    paddingVertical: 14,          // MAIOR
    paddingHorizontal: 10,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#1E88E5",       // SOMBRA LEVE
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,                 // SOMBRA NO ANDROID
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
  },


});
