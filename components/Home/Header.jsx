import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import {Colors} from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
export default function Header() {

    const { user } = useUser()
  return (
    <View style={{
        padding:20,
        paddingTop:49,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 20
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
      }}>
        <Image source={{uri:user?.imageUrl }} 
          style={{
            width:45,
            height:45,
            borderRadius:99
          }} 
        />

        <View>
            <Text style={{
                color:'#fff'
            }}>Welcome</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:21,
                color:'#fff'
            }}>{user?.fullName}</Text>
        </View>
      </View>

      <View style={{
        display:'flex',
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems:'center',
        gap:10,
        padding: 10,
        marginVertical: 10,
        marginTop: 15,
        borderRadius: 10,

      }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Search...' 
           style={{
            fontFamily:'outfit',
            fontSize:16,
           }}
         />
      </View>
    </View>
  )
}


