import React, { useState } from "react"
import {
  Animated,
  View,
  Modal,
  StyleSheet,  
} from "react-native";
import RollerCoasterLoader from './RollerCoasterLoader';
import ProgressBar from './ProgressBar'
import  CircularPercentLoader  from "./CircularPercentLoader";

export const configLoading = WrappedComponent => {
  
  function renderLoader(props) {
    var loadingSpin = new Animated.Value(0);
    const [isLoading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [withModal, setWithModal] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);
    const [progressDuration, setProgressDuration] = useState(0);
    const [loaderProp, setLoaderProps] = useState( loader = {
      name: '',
      properties : {
         innerFontColor: 'green',
         colorOfLoader: 'tomato',
         colorOftext: 'tomato',
         fontSize: 18,
         innerFontSize: 18,
         }
      });

    const setLoaderPropsState = properties => {
      setLoaderProps(properties);
    };

    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    };

    const setLoadingMessageState = message => {
      setLoadingMessage(message);
    };

    const setLoadingWithModal = withModal => {
      setWithModal(withModal);
    };

    const setProgressPercentWithDuration = (percent,duration) => {
      setProgressPercent(percent);
      setProgressDuration(duration);
    };
    
    const animation = () => {
        loadingSpin.setValue(0);
        if(loadingMessage && loadingMessage != ''){
          Animated.timing(
            loadingSpin, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
               }     
            ).start((anim) => {
            if(anim.finished) {
              animation();
            } else{
                loadingSpin.stopAnimation();
            }
        });
      }
    };

    React.useEffect(() => {
      animation();
      return () => {
          loadingSpin.stopAnimation();     
      };
    });
    
   
    return (
      <>
        {isLoading && 
          <>
          {withModal ?  
            <Modal transparent={true} animationType={'none'} visible={isLoading}>
              <View style={{backgroundColor: '#00000040', ...styles.container}}>
                  <View style={styles.content}>
                      {loaderProp.name == 'rollerCoaster' && <RollerCoasterLoader loadingMessage={loadingMessage} isLoading={isLoading} loaderColor={loaderProp.properties.colorOfLoader}/>}
                      {loaderProp.name == 'circularProgress' && <CircularPercentLoader withModal={withModal} percentage={progressPercent} progressDuration={progressDuration} loadingMessage={loadingMessage} color={loaderProp.properties.colorOfLoader} textColor={loaderProp.properties.innerFontColor}/>}
                      {loaderProp.name == 'linearProgress' && <ProgressBar progressPercent={progressPercent} progressDuration={progressDuration} loaderColor={loaderProp.properties.colorOfLoader} colorOfFont={loaderProp.properties.innerFontColor} fontSize={loaderProp.properties.innerFontSize}/>}
                  </View>
                  <View style={styles.loaderText}>
                     <Animated.Text style={{opacity: loadingSpin, color: loaderProp.properties.colorOftext, fontSize: loaderProp.properties.fontSize}}>{loadingMessage}</Animated.Text>
                  </View>
                </View>
            </Modal> :
             <View style={styles.container}>
                  <View style={styles.content}>
                  {loaderProp.name == 'rollerCoaster' && <RollerCoasterLoader loadingMessage={loadingMessage} isLoading={isLoading} loaderColor={loaderProp.properties.colorOfLoader}/>}
                      {loaderProp.name == 'circularProgress' && <CircularPercentLoader withModal={withModal} percentage={progressPercent} progressDuration={progressDuration} loadingMessage={loadingMessage} color={loaderProp.properties.colorOfLoader} textColor={loaderProp.properties.innerFontColor}/>}
                      {loaderProp.name == 'linearProgress' && <ProgressBar progressPercent={progressPercent} progressDuration={progressDuration} loaderColor={loaderProp.properties.colorOfLoader} colorOfFont={loaderProp.properties.innerFontColor} fontSize={loaderProp.properties.innerFontSize}/>}
                  </View>
                  <View style={styles.loaderText}>
                    <Animated.Text style={{opacity: loadingSpin, color: loaderProp.properties.colorOftext, fontSize: loaderProp.properties.fontSize}}>{loadingMessage}</Animated.Text>
                  </View>
            </View>
          }
          </>         
        }
        <WrappedComponent {...props} setLoaderPropsState={setLoaderPropsState} setLoadingWithModal={setLoadingWithModal}  setLoading={setLoadingState} setProgressPercentWithDuration={setProgressPercentWithDuration} setLoadingMessage={setLoadingMessageState} isLoading = {isLoading} withModal={withModal}/>
      </> 
    );
  }
  return renderLoader;
}

export default configLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: "100%",
    height: '100%',
    alignContent: "center",
  },
  content: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {marginTop: 18, justifyContent: "center", alignItems:"center"},
})