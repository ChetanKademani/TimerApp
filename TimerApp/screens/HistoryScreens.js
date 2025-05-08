import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";

const HistoryScreen = () => {
  const { state } = useContext(TimerContext);
  const history = state.history;

  const renderItem = ({ item }) => {
    const formattedDate = new Date(item.completedAt).toLocaleString();
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.timestamp}>Completed at: {formattedDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Timer History</Text>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>No completed timers yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    fontStyle: "italic",
    color: "#888",
  },
});

export default HistoryScreen;
