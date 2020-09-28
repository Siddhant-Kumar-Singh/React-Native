import React, {Component} from 'react';  
import { StyleSheet, View, Animated} from 'react-native';  
  
export default class ProgressBar extends React.Component {  
    constructor(props){
        super(props);
        this.state = {  
            progressStatus: 0,  
        } 
    }
    
    anim = new Animated.Value(0);  
    componentDidMount(){  
        this.onAnimate();
        this.anim.addListener(({value})=> {  
            this.setState({
                progressStatus: parseInt(value,10)
            });
        });
    }  
   
    componentWillUnmount() {
        this.anim.stopAnimation();
        this.anim.removeAllListeners();
    }
    onAnimate = () => {  
        Animated.timing(this.anim,{ 
            toValue: this.props.progressPercent,  
            duration: this.props.progressDuration,  
            useNativeDriver: true,
        }).start((ani) => {
                if(ani.finished) {          
                    this.onAnimate();
                } else{
                    if(this.state.progressStatus == this.props.progressPercent){
                        this.anim.removeAllListeners();
                        this.anim.stopAnimation();
                    }
                }
        });  
    }  
  render() {  
    return (  
      <View style={styles.container}>  
            <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%", backgroundColor: this.props.loaderColor},  
                ]}  
            />  
            <Animated.Text style={{color: this.props.colorOfFont , fontSize: this.props.fontSize, ...styles.label}}>  
                    {this.state.progressStatus }%  
            </Animated.Text>  
      </View>  
    );  
  }  
}  
const styles = StyleSheet.create({  
    container: {  
        width: "80%",  
        height: 22,  
        borderColor: "black",  
        borderWidth: 1,   
        borderRadius: 7,  
  },  
  inner:{  
        width: "95%",  
        height: 20,
        borderRadius: 6,  
        backgroundColor:"tomato",  
  },  
  label:{  
        fontSize:18,  
        // color: "#b22222",  
        position: "absolute",
        fontWeight: 'bold',  
        alignSelf: "center",  
  }  
});
