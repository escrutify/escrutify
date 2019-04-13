/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Svg, Circle, Rect } from 'react-native-svg';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);

class Camera extends Component<Props> {
    render() {
        return (
            <RNCamera
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permision to use camera'}
                permissionDialogMessage={'We need your permission to use your camera'}>
                {({ camera, status }) => {
                    if (status !== 'READY') return <PendingView />
                    return (
                        <View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                margin: 10
                            }}>
                                <Text style={{ fontSize: 30, margin: 30}}> ESCANEA TU {this.props.text}</Text>
                                <Svg height="80%" width="100%" viewBox="0 0 100 100" style={{flex: 2, margin: 0}}>
                                    <Rect
                                        x="0"
                                        y="-20"
                                        width="100"
                                        height="150"
                                        stroke="red"
                                        strokeWidth="2"
                                        fill="transparent"
                                    />
                                </Svg>
                            </View>
                            <View style={{
                                flex: 0,
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <TouchableOpacity onPress={() => this.props.snap()}
                                                  style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            </RNCamera>
        )
    }

    takePicture = async function(camera) {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            this.props.snap(data)
        }
    }
}

type Props = {};
export default class App extends Component<Props> {
    state = { snap: 'dni' }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ESCRUTIFY</Text>
                {
                    this.state.snap === 'dni' ? <Camera text="DNI" snap={() => this.setState(() => ({snap: 'ok'}))}/> :
                    this.state.snap === 'ok' ? <TouchableOpacity onPress={() => this.setState(() => ({snap: 'acta'}))}>
                        <View>
                            <Text style={{fontSize: 50}}>hello mundo</Text>
                        </View>
                    </TouchableOpacity> :
                    this.state.snap === 'acta' ? <Camera text="ACTA" snap={() => this.setState(() => ({snap: 'done'}))}/> :
                    this.state.snap === 'done' ? <TouchableOpacity onPress={() => this.setState(() => ({snap: 'dni'}))}>
                        <View>
                            <Text style={{fontSize: 50}}>That's all folks</Text>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => this.setState(() => ({snap: 'dni'}))}>
                        <View>
                            <Text style={{fontSize: 50}}>ERROR</Text>
                        </View>
                    </TouchableOpacity>

                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
