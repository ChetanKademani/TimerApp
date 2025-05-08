import React, { useEffect, useRef, useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { TimerContext } from "../context/TimerContext";

const TimerCard = ({ timer }) => {
  const { dispatch } = useContext(TimerContext);
  const intervalRef = useRef(null);
  const [localRemaining, setLocalRemaining] = useState(timer.remaining);

  // Sync local state with global when reset
  useEffect(() => {
    setLocalRemaining(timer.remaining);
  }, [timer.remaining]);

  useEffect(() => {
    if (timer.status === "Running") {
      intervalRef.current = setInterval(() => {
        setLocalRemaining((prev) => {
          const newTime = prev - 1;

          // Halfway alert
          if (
            !timer.halfwayTriggered &&
            newTime === Math.floor(timer.duration / 2)
          ) {
            Alert.alert(
              "Halfway there!",
              `You're halfway through "${timer.name}"`
            );
            dispatch({
              type: "UPDATE_TIMER",
              payload: { id: timer.id, halfwayTriggered: true },
            });
          }

          if (newTime <= 0) {
            clearInterval(intervalRef.current);
            dispatch({
              type: "UPDATE_TIMER",
              payload: { id: timer.id, remaining: 0, status: "Completed" },
            });
            dispatch({
              type: "ADD_TO_HISTORY",
              payload: {
                name: timer.name,
                completedAt: new Date().toISOString(),
              },
            });
            Alert.alert("Timer Completed!", `"${timer.name}" is done.`);
            return 0;
          }

          dispatch({
            type: "UPDATE_TIMER",
            payload: { id: timer.id, remaining: newTime },
          });
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [timer.status]);

  const handleStart = () => {
    if (timer.status === "Completed") return;
    dispatch({
      type: "UPDATE_TIMER",
      payload: { id: timer.id, status: "Running" },
    });
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    dispatch({
      type: "UPDATE_TIMER",
      payload: { id: timer.id, status: "Paused" },
    });
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    dispatch({
      type: "UPDATE_TIMER",
      payload: {
        id: timer.id,
        remaining: timer.duration,
        status: "Paused",
        halfwayTriggered: false,
      },
    });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.floor((localRemaining / timer.duration) * 100);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {timer.name} ({timer.category})
      </Text>
      <Text>Status: {timer.status}</Text>
      <Text>Time Left: {formatTime(localRemaining)}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          title="Start"
          onPress={handleStart}
          disabled={timer.status === "Running"}
        />
        <Button
          title="Pause"
          onPress={handlePause}
          disabled={timer.status !== "Running"}
        />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  progressBar: {
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default TimerCard;
