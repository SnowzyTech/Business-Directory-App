import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser'
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

    }}>
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 120
        }}>

      <Image source={require('./../assets/images/login.png')} 
         style={{ 
             width: 230,
             height: 400,
             borderRadius: 20,
             borderWidth: 5,
             borderColor: '#000'
            }}
            />

        </View>

            <View style={styles.subContainer}>
                <Text style={styles.text}>Your Ultimate 
                    <Text style={{
                        color:Colors.PRIMARY,
                    }}> Community Business Directory</Text> App</Text>

                    <Text style={styles.text2}>Find your favorite near you and post your own business to your community</Text>

                    <TouchableOpacity style={styles.btn} onPress={onPress}>
                        <Text style={styles.text3}>Let's Get Started</Text>
                    </TouchableOpacity>
            </View>

    </View>
  )
}

const styles = StyleSheet.create({
  subContainer:{
    backgroundColor: '#fff',
    padding:20,
    marginTop: -20,
    
  },
  text: {
    fontSize:30,
    fontFamily:'outfit-bold',
    textAlign: 'center',
    marginTop: 20
  },
  text2:{
    fontSize:15,
    fontFamily:'outfit',
    textAlign:'center',
    marginVertical:15,
    color:Colors.GRAY
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
  text3:{
    textAlign:'center',
    color: '#fff',
    fontFamily: 'outfit'
  }
})
