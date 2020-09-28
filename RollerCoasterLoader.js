import React from 'react';

import {
    View,
    StyleSheet,
    Animated,
    Modal
} from 'react-native';

export default class RollerCoasterLoader extends React.Component {

    constructor(props){
        super(props);
        this.loadingSpin = new Animated.Value(0);
    }

    spinAnimation() {
        this.loadingSpin.setValue(0);
            Animated.timing(
                this.loadingSpin, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: false,
                }     
            ).start((animation) => {
            if(animation.finished) {
              this.spinAnimation();
            } else{
                this.stopAnimation();
            }
        });
    }

    componentDidMount() {
        this.spinAnimation();
    }

    componentWillUnmount(){
        this.stopAnimation();
    }

    stopAnimation(){
        Animated.timing(
            this.loadingSpin
          ).stop();
    }
    
    render() {
        const spin = this.loadingSpin.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: ['0deg','45deg','150deg', '255deg','360deg']
        });
        return (
             <View style={styles.loaderView}>
                    <Animated.Image style={{ transform:[{rotate: spin}], ...styles.loaderImage}} source={require('./images/loader2.png')}/>
            </View>
                    
        );
    }
}


const styles = StyleSheet.create({
    loaderView: {
        alignItems: "center",
    },
    loaderImage: {
        justifyContent: "center",
        height: 45,
        width:45,
    },
});