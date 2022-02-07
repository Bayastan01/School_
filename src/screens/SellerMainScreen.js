import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 300,
    height: 320,
    margin: 66,
  },
  topButtons: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bottomButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  flipButton: {
    flex: 1,
    marginTop: 20,
    right: 20,
    alignSelf: 'flex-end',
  },
  recordingButton: {
    marginBottom: 10,
  },
  text: {
    fontSize: 80,
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 80,
  },
  bottomButtonsCamera: {
    marginBottom: 40,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});

class SellerMainScreen extends React.PureComponent {
  state = {
    type: RNCamera.Constants.Type.back,
  };
  flipCamera = () =>
    this.setState({
      type:
        this.state.type === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    });

  takePhoto = async () => {
    const {onTakePhoto} = this.props;
    const options = {
      quality: 0.5,
      base64: true,
      width: 300,
      height: 300,
    };
    const data = await this.camera.takePictureAsync(options);
    onTakePhoto(data.base64);
  };
  render() {
    const {type} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>550 c</Text>
        <RNCamera
          ref={cam => {
            this.camera = cam;
          }}
          type={type}
          style={styles.preview}
        />
        {}

        {/* <View style={styles.topButtons}>
          <TouchableOpacity onPress={this.flipCamera} style={styles.flipButton}>
            <Icon name="camera" size={35} color="orange" />
          <MaterialCommunityIcons name="camera" color={''} size={66} style={styles.bottomButtonsCamera}/>
          </TouchableOpacity>
        </View> */}

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={this.takePhoto}
            style={styles.recordingButton}>
            <MaterialCommunityIcons
              name="camera"
              size={66}
              style={styles.bottomButtonsCamera}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SellerMainScreen;
