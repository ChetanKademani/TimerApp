import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TimerContext } from "../context/TimerContext";
import TimerCard from "../components/TimeCard";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(TimerContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const addTimer = () => {
    if (!name || !duration || !category) return;
    dispatch({
      type: "ADD_TIMER",
      payload: {
        id: Date.now().toString(),
        name,
        duration: parseInt(duration),
        remaining: parseInt(duration),
        category,
        status: "Paused",
        startTime: null,
        halfwayTriggered: false,
      },
    });
    setName("");
    setDuration("");
    setCategory("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Timer</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <Button title="Add Timer" onPress={addTimer} />

      {/* ✅ Paste the category grouping block here */}
      {Object.entries(
        state.timers.reduce((acc, timer) => {
          if (!acc[timer.category]) acc[timer.category] = [];
          acc[timer.category].push(timer);
          return acc;
        }, {})
      ).map(([category, timersInCategory]) => (
        <View key={category} style={styles.categoryBlock}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <Button
              title={expandedCategories[category] ? "Collapse" : "Expand"}
              onPress={() => toggleCategory(category)}
            />
          </View>

          {expandedCategories[category] && (
            <>
              <View style={styles.bulkActions}>
                <Button
                  title="Start All"
                  onPress={() =>
                    timersInCategory.forEach((t) =>
                      dispatch({
                        type: "UPDATE_TIMER",
                        payload: { id: t.id, status: "Running" },
                      })
                    )
                  }
                />
                <Button
                  title="Pause All"
                  onPress={() =>
                    timersInCategory.forEach((t) =>
                      dispatch({
                        type: "UPDATE_TIMER",
                        payload: { id: t.id, status: "Paused" },
                      })
                    )
                  }
                />
                <Button
                  title="Reset All"
                  onPress={() =>
                    timersInCategory.forEach((t) =>
                      dispatch({
                        type: "UPDATE_TIMER",
                        payload: {
                          id: t.id,
                          remaining: t.duration,
                          status: "Paused",
                          halfwayTriggered: false,
                        },
                      })
                    )
                  }
                />
              </View>

              {timersInCategory.map((timer) => (
                <TimerCard key={timer.id} timer={timer} />
              ))}
            </>
          )}
        </View>
      ))}

      <Button
        title="Go to History"
        onPress={() => navigation.navigate("History")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, marginVertical: 12 },
  input: { borderWidth: 1, padding: 8, marginVertical: 6, borderRadius: 6 },
  categoryBlock: {
    marginTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default HomeScreen;
