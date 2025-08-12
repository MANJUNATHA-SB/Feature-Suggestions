import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as SQLite from "expo-sqlite";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Open SQLite DB (Mobile only)
const openDB = () => {
  if (SQLite.openDatabase) {
    return SQLite.openDatabase("translations.db");
  } else {
    console.warn("SQLite not supported in web mode.");
    return {
      transaction: () => ({ executeSql: () => {} }),
    };
  }
};
const db = openDB();

// Create table
db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS translations (id INTEGER PRIMARY KEY AUTOINCREMENT, english TEXT, translated TEXT, language TEXT);"
  );
});

// Gemini setup
const genAI = new GoogleGenerativeAI(""); // Replace with your Gemini API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function App() {
  const [englishText, setEnglishText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Kannada");
  const [translatedText, setTranslatedText] = useState("");

  const translateText = async () => {
    try {
      const prompt = `
        Translate this text to ${selectedLanguage}.
        Output ONLY the translated sentence, no extra text, quotes, or explanation.
        Text: ${englishText}
      `;

      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();

      // Remove accidental quotes or extra formatting
      text = text.replace(/^["']|["']$/g, "");

      setTranslatedText(text);

      // Store in SQLite
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO translations (english, translated, language) VALUES (?, ?, ?);",
          [englishText, text, selectedLanguage]
        );
      });
    } catch (error) {
      console.error(error);
      setTranslatedText("Error translating text.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language Translator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter English text"
        value={englishText}
        onChangeText={setEnglishText}
      />

      <Picker
        selectedValue={selectedLanguage}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Kannada" value="Kannada" />
        <Picker.Item label="Hindi" value="Hindi" />
        <Picker.Item label="Tamil" value="Tamil" />
        <Picker.Item label="Malayalam" value="Malayalam" />
        <Picker.Item label="Bengali" value="Bengali" />
        <Picker.Item label="Odisa" value="odisa" />
        <Picker.Item label="Marathi" value="Marathi" />
        <Picker.Item label="Punjabi" value="Punjabi" />
      </Picker>

      <Button title="Translate" onPress={translateText} />

      {translatedText ? (
        <Text style={styles.result}>{translatedText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: { height: 50, marginBottom: 20 },
  result: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
});
