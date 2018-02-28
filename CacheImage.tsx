import React from "react";
import { Image, ImageProperties, ImageURISource } from "react-native";
import shorthash from "shorthash";
import { FileSystem } from "expo";

interface Props extends ImageProperties {
  uri: string;
}

interface State {
  source: ImageURISource;
}

export default class CacheImage extends React.Component<Props, State> {
  state = {
    source: {}
  };

  async downloadImage(uri: string) {
    const name = shorthash.unique(uri);
    console.log(name);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      console.log("read image from cache");
      this.setState({
        source: {
          uri: image.uri
        }
      });
      return;
    }

    console.log("downloading image to cache");
    const newImage = await FileSystem.downloadAsync(uri, path);
    this.setState({
      source: {
        uri: newImage.uri
      }
    });
  }

  async componentWillReceiveProps(nextProps: Props, props: Props) {
    if (nextProps.uri === props.uri) {
      return;
    }
    this.downloadImage(nextProps.uri);
  }

  async componentDidMount() {
    this.downloadImage(this.props.uri);
  }

  render() {
    const { uri, ...otherProps } = this.props;
    return <Image source={this.state.source} {...otherProps} />;
  }
}
