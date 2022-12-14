import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, Touchable, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-web';
import { Configuration, OpenAIApi } from "openai";
import { KEY } from '@env'



export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const configuration = new Configuration({
    apiKey: KEY
  });
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setResult(res.data.data[0].url)
  };

  console.log(result);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Generate an Image using Text</Text>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
          onChangeText={(text) => setPrompt(text)}
        />
        <TouchableOpacity onPress={generateImage}>
          <View style={styles.button}>
              <Text>Generate an Image</Text>
          </View>
        </TouchableOpacity>
        {/* <Button  title='Generate an Image' /> */}
      </View>
      {result.length > 0 ? (
        <Image style={{ width: 400, height: 400, alignSelf: 'center', margin: 20 }} source={{ uri: result }} />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    margin: 10,
    fontSize: 25,
    marginTop: 30
  },
  searchForm: {
    flexDirection: 'row',
    margin: 10
  },
  searchInput: {
    width: 500,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10
  },
  button: {
    padding: 20,
    backgroundColor:'#fe434a',
    borderRadius: 10,
    width: 100
  }
});
