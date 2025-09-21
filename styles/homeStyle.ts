import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
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
  label: { fontSize: 14, color: '#555', marginTop: 5 },
  valueGreen: { fontSize: 22, color: '#4CAF50', fontWeight: 'bold' },
  valueRed: { fontSize: 22, color: '#F44336', fontWeight: 'bold' },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskHour: { width: 60, fontWeight: 'bold' },
  taskText: { flex: 1, fontSize: 14 },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  habitText: { flex: 1, marginLeft: 10, fontSize: 14 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#F5F5F5',
  },
});
