import React, { useState, useEffect } from "react"
import {
  Easing,
  TextInput,
  Animated,
  View,
  StyleSheet,
  
  } from "react-native";

import Svg, { G, Circle } from 'react-native-svg';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function CircularPercentLoader ({
    percentage = 0,
    radius = 40,
    strokeWidth = 10,
    progressDuration = 500,
    color = "tomato",
    delay = 0,
    max = 100,
    textColor="tomato"
}) {
      const animated = React.useRef(new Animated.Value(0)).current;
      const circleRef = React.useRef();
      const inputRef = React.useRef();
      const circumference = 2 * Math.PI * radius;
      const halfCircle = radius + strokeWidth;
      var progressStat = 0;
  
      const animation = (toValue) => {
         Animated.timing(animated, {
          delay,
          toValue,
          duration: progressDuration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start((anim) => {
          if(anim.finished) {
            animation(percentage);
          } else{
            if(progressStat == percentage){
              animated.removeAllListeners();
              animated.stopAnimation();
            }
          }
        });
      };
  
      const configProgress = () => {
        animation(percentage);
        animated.addListener((v) => {
          progressStat = v.value;
          const maxPerc = 100 * v.value / max;
          const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
          if (inputRef?.current) {
            inputRef.current.setNativeProps({
              text: `${Math.round(v.value)}`,
            });
          }
          if (circleRef?.current) {
            circleRef.current.setNativeProps({
              strokeDashoffset,
            });
          }
        }, [max, percentage]);
      }
      React.useEffect(() => {
        configProgress();
        return () => {
            animated.removeAllListeners();   
            animated.stopAnimation();     
        };
      });
      
      return (
        <View style={{ width: radius * 2, height: radius * 2 }}>
          <Svg
            height={radius * 2}
            width={radius * 2}
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
            <G
              rotation="-90"
              origin={`${halfCircle}, ${halfCircle}`}>
              <Circle
                ref={circleRef}
                cx="50%"
                cy="50%"
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDashoffset={circumference}
                strokeDasharray={circumference}
              />
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeOpacity=".1"
              />
            </G>
          </Svg>
          <AnimatedTextInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue="0"
            style={[
              StyleSheet.absoluteFillObject,
              { fontSize: radius / 2, color: textColor, ...styles.text, },
              
            ]}
          />
        </View>
      );
}
const styles = StyleSheet.create({
        text: { fontWeight: '900', textAlign: 'center' },
});

