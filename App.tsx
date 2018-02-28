import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import CacheImage from "./CacheImage";

export default class App extends React.Component<{}, { uri: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      uri:
        "https://www.planwallpaper.com/static/images/maxresdefault_8yZPhSS.jpg"
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.setState({
      uri:
        "http://wallpaper-gallery.net/images/cool-pictures/cool-pictures-2.jpg"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CacheImage style={styles.image} uri={this.state.uri} />
        <Button title="change picture" onPress={this.onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 200,
    width: 200
  }
});
