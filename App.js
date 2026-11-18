import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";

const TARGET = new Date("2026-12-04T00:00:00-05:00").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const pad = (n) => String(n).padStart(2, "0");

export default function App() {
  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const timer = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Image source={require("./assets/splash.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>MUY PRONTO</Text>
      <Text style={styles.subtitle}>Estamos preparando algo increíble para ti.</Text>
      <View style={styles.line} />
      <Text style={styles.label}>EL LANZAMIENTO COMIENZA EN</Text>
      <View style={styles.timer}>
        {[
          ["DÍAS", time.days],
          ["HORAS", time.hours],
          ["MIN", time.minutes],
          ["SEG", time.seconds],
        ].map(([label, value]) => (
          <View style={styles.unit} key={label}>
            <Text style={styles.number}>{pad(value)}</Text>
            <Text style={styles.unitLabel}>{label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.date}>04 · 12 · 2026</Text>
      <Text style={styles.footer}>© 2026 ALEX</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, backgroundColor: "#080811", alignItems: "center",
    justifyContent: "center", paddingHorizontal: 22,
  },
  logo: { width: 230, height: 210, marginBottom: 18 },
  title: { color: "#FFFFFF", fontSize: 30, fontWeight: "800", letterSpacing: 2 },
  subtitle: { color: "#A1A1AA", fontSize: 14, textAlign: "center", marginTop: 12 },
  line: { width: "78%", height: 1, backgroundColor: "#39304D", marginVertical: 28 },
  label: { color: "#B69AFF", fontSize: 11, fontWeight: "700", letterSpacing: 1.5, marginBottom: 16 },
  timer: { flexDirection: "row", gap: 9, width: "100%", justifyContent: "center" },
  unit: { backgroundColor: "#171323", borderRadius: 12, minWidth: 68, paddingVertical: 14, paddingHorizontal: 8, alignItems: "center" },
  number: { color: "#D3C2FF", fontSize: 25, fontWeight: "800", fontVariant: ["tabular-nums"] },
  unitLabel: { color: "#A1A1AA", fontSize: 9, marginTop: 5, letterSpacing: 1 },
  date: { color: "#B69AFF", fontSize: 13, fontWeight: "700", marginTop: 22, letterSpacing: 2 },
  footer: { color: "#777487", fontSize: 10, marginTop: 38 },
});
