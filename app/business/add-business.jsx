import { View, Text, Image, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker'


import RNPickerSelect from 'react-native-picker-select';
import { query } from 'firebase/database';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from './../../configs/FirebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
export default function AddBusiness() {
    const navigation = useNavigation();

    const [image, setImage] = useState(null)
    const [categoryList, setCategoryList] = useState([])

    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [website, setWebsite] = useState();
    const [about, setAbout] = useState();
    const [category, setCategory] = useState();

    const [loading, setLoading] = useState(false)

    const {user} = useUser();

    const router = useRouter()

    useEffect(() => {
      navigation.setOptions({
        headerTitle:'Add New Business',
        headerShown:true,
        headerStyle: {
            backgroundColor:Colors.PRIMARY
        }
      })

      GetCategoryList();
    }, [])
    
    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });


          setImage(result?.assets[0].uri);
          console.log(result)
    }

    const GetCategoryList = async () => {
        setCategoryList([])
        const q = query(collection(db, 'Category'));
        const snapShot = await getDocs(q);

        snapShot.forEach((doc) => {
            console.log(doc.data());

            setCategoryList(prev=>[...prev, {
                label:(doc.data()).name,
                value:(doc.data()).name
            }])
        })
    }

   const onAddNewBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString()+".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, 'business-app/'+fileName);

    uploadBytes(imageRef, blob).then((snapshot) => {
        console.log('File Uploaded...')
    }).then(resp=> {
        getDownloadURL(imageRef).then(async(downloadUrl) => {
            console.log(downloadUrl);
            saveBusinessDetail(downloadUrl)
        })
    })
    setLoading(false)
    }

    const saveBusinessDetail = async (imageUrl) => {
        await setDoc(doc(db, 'BusinessList', Date.now().toString()), {
            name: name,
            address:address,
            contact:contact,
            about:about,
            website:website,
            category:category,
            username:user?.fullName,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            userImage:user?.imageUrl,
            imageUrl:imageUrl

        })

        setLoading(false)
        ToastAndroid.show('New business Addedd...', ToastAndroid.LONG)

        router.push('/business/my-business')
    }
  return (
    <View style={{padding:20}}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:25
      }}>Add New Business</Text>

      <Text style={{
        color:Colors.GRAY,
        fontFamily:'outfit'
      }}>
        Fill in details in order to add new business
      </Text>


      <TouchableOpacity 
       style={{ marginTop: 20}}
       onPress={()=>onImagePick()}
      >
       {!image? <Image 
            source={require('./../../assets/images/placeholder.png')} 
            style={{
                width:100,
                height:100
            }}
            /> 
            :
            <Image source={{uri:image}} 
            style={{
                width:100,
                height:100,
                borderRadius:50
            }}
            />}
            

            
    </TouchableOpacity>

    <View>
        <TextInput placeholder='Name'
         onChangeText={(v) => setName(v)}
         style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'white',
            marginTop:13,
            borderColor:Colors.GRAY,
            fontFamily:'outfit'
        }} 
        />
        <TextInput placeholder='Address'
        onChangeText={(v) => setAddress(v)}
        style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'white',
            marginTop:13,
            borderColor:Colors.GRAY,
            fontFamily:'outfit'
        }} 
        />
        <TextInput placeholder='Contact'
         onChangeText={(v) => setContact(v)}
         style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'white',
            marginTop:13,
            borderColor:Colors.GRAY,
            fontFamily:'outfit'
        }} 
        />
        <TextInput placeholder='Website'
         onChangeText={(v) => setWebsite(v)}
         style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'white',
            marginTop:13,
            borderColor:Colors.GRAY,
            fontFamily:'outfit'
        }} 
        />
        <TextInput placeholder='About'
         onChangeText={(v) => setAbout(v)}
         multiline
         numberOfLines={5}
         style={{
            padding:10,
            borderWidth:1,
            borderRadius:5,
            fontSize:17,
            backgroundColor:'white',
            marginTop:13,
            borderColor:Colors.GRAY,
            fontFamily:'outfit',
            height:100
        }} 
        />


        <View style={{
           
            borderWidth:1,
            borderRadius:5,
            marginTop:10,
            backgroundColor:'white',
            borderColor:Colors.GRAY,
          
        }}>
        <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={categoryList}
       />
        </View>
    </View>

    <TouchableOpacity 
     disabled={loading}
     style={{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        marginTop:20,
        borderRadius:5,

     }}
      onPress={()=> onAddNewBusiness()}
      >
        {loading ? 
          <ActivityIndicator size={'large'} color={'#fff'} /> :
        <Text style={{
            color:'#fff',
            textAlign:'center',
            fontFamily:'outfit-medium',
            

        }}>Add New Business</Text>}
    </TouchableOpacity>
    </View>
  )
}