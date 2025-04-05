import HOST_NAME from '@/utils'
import React,{useState} from 'react'
import { useRouter } from 'expo-router'
import {View ,Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'

const Create =() =>{

    const router = useRouter()
    const [info ,setInfo] = useState({
        title:'',
        description:'',
        date:'',
        status:'pending',
    })
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')

    async function createTask(){
        const {title ,description ,date} = info
        if(!title || !description || !date){
            return setError("All fields are required")
        }

        setLoading(true)
        setError('')
        try{    
            const  response = await fetch(`${HOST_NAME}/api/task` ,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                },
                body:JSON.stringify(info)
            })
            const data = await response.json()
            if(response.ok){
                Alert.alert('Success' ,'Task created successfully' ,null,{onDismiss:()=>router.push("/")})
                // Alert.alert("Task created successfully" , options={onDismiss:()=>router.push("/(tabs)")} )
                setInfo({
                    title:'',
                    description:'',
                    date:'',
                    status:'pending',
                })

            }else{
                setError("An error occured")
            }
        }
        catch(e){
            console.log(e)
            setError("Verify your internet connection")
        }finally{
            setLoading(false)
        }
    }

    return(
        <React.Fragment>
            <ScrollView>
                <View style={styles.form} >
                        {error && <Text style={{ padding:2,color:'crimson' ,textAlign:'center' ,fontWeight:'bold'}} >{error}</Text>}

                    <View style={styles.formBox}>
                        <Text style={styles.label} >Title*</Text>
                        <TextInput style={styles.input} value={info.title} onChangeText={t=>setInfo({...info ,title:t})} />
                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.label}>Description*</Text>
                        <TextInput style={styles.input} value={info.description} onChangeText={t=>setInfo({...info ,description:t})} />

                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.label}>Date*</Text>
                        <TextInput style={styles.input} textContentType='birthdate' value={info.date} onChangeText={t=>setInfo({...info ,date:t})} />

                    </View>

                    <View style={styles.formBox}>
                        <Text style={styles.label}>Status</Text>
                        <TextInput style={styles.input} value={info.status} onChangeText={t=>setInfo({...info ,status:t})} />

                    </View>

                    <TouchableOpacity onPress={()=>createTask()} style={styles.btn} >
                        <Text style={{color:'white' ,fontWeight:'bold' ,textAlign:'center' ,fontSize:20}}>
                            {!loading ?
                            'Create task'
                            :
                            <ActivityIndicator size={26} color={'white'} />
                            }
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </React.Fragment>
    )
}

export default Create

const styles = StyleSheet.create({
    form:{
        marginTop:20,
        padding:10,
        rowGap:10
    },
    formBox:{
        gap:3,
    },
    input:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        borderRadius:5,
        color:'rgba(0,0,0,0.77)',
        textIndent:'10px',
    },
    label:{
        fontWeight:'bold'
    },
    btn:{
        marginTop:20,
        borderWidth:0,
        // borderColor:'red',
        padding:5,
        paddingVertical:7,
        borderRadius:20,
        backgroundColor:'purple'
    }
}) 