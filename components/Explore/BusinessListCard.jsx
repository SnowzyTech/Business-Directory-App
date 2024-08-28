import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {

    const router = useRouter();
  return (
    <TouchableOpacity 
     onPress={()=> router.push('/businessdetail/'+business?.id)}
     
    style={{
        marginTop:18,
        backgroundColor:'#fff',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
    }}>
      <Image source={{uri:business?.imageUrl}}
        style={{
            width:'100%',
            height:150,
            borderTopLeftRadius:15,
            borderTopRightRadius:15
        }}
      />

      <View style={{padding:10}}>
        <Text style={{
            fontSize:20,
            fontFamily:'outfit-bold'
        }}>{business?.name}</Text>
        <Text style={{ fontFamily: 'outfit', color:Colors.GRAY}}>{business?.address}</Text>
      </View>
    </TouchableOpacity
    >
  )
}