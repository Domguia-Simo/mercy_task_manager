import HOST_NAME, { Task } from '@/utils'
import { Feather } from '@expo/vector-icons'
import { useRouter} from 'expo-router'
import React,{useState ,useEffect} from 'react'
import {View ,Text ,ScrollView ,ActivityIndicator ,StyleSheet, Alert, TouchableOpacity} from 'react-native'



const Index =() =>{

    const router = useRouter()

    const [tasks ,setTasks] = useState()
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState('')
    const [deleting ,setDeleting] = useState(false)
    const [refresh ,setRefresh] = useState(false)

    useEffect(()=>{

        async function getTasks(){
            setLoading(true)
            try{
                const response = await fetch(`${HOST_NAME}/api/task` ,{method:'get'})
                const data = await response.json()
                console.log(data);
                console.log(response);
                
                setTasks(data.tasks)
            }
            catch(e){
                console.log(e)
                setError("Verify your internet connection")
            }
            finally{
                setLoading(false)
            }
        }
        getTasks()
    },[refresh])

    // async function editTask(){
    //     try{
    //         const response = await fetch(`${HOST_NAME}/api/tesk` ,{
    //             method:'put',
    //             headers:{
    //                 'content-type':'application/json'
    //             },
    //             body:JSON.stringify('')
    //         })
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // }

    async function markAsDone(_id){
        try{    
            const  response = await fetch(`${HOST_NAME}/api/task/done/${_id}`)
            if(response.ok){
                Alert.alert("Task created successfully")
                setRefresh(prev => !prev)                
            }else{
                setError("An error occured")
            }
        }
        catch(e){
            console.log(e)
            setError("Verify your internet connection")
        }finally{
        }
    }

    async function deletTask(id){
        console.log("deleting a task");
        
        setDeleting(true)
        try{
            const response = await fetch(`${HOST_NAME}/api/task/${id}` ,{method:'delete'})
            if(response.ok){
                Alert.alert("Task deleted successfully")
                setRefresh(prev => !prev)
            }
        }
        catch(e){
            console.log(e)
            setError("Verify your internet")
        }
        finally{
            setDeleting(false)
        }
    }

    function editTask(id){
        router.push(`/${id}`)
    }


    return(
        <React.Fragment>
            <View style={{padding:10}} >
                <Text style={{fontSize:20 ,fontWeight:'bold'}}>My tasks ({tasks && tasks.length || 0}) -- <TouchableOpacity onPress={()=>setRefresh(prev => !prev)}><Text>refresh</Text></TouchableOpacity> --</Text>
            </View>
            {!loading ?
            <ScrollView  >
                <View style={styles.tasksContainer}>
                {tasks && tasks.map((task ,idx) => <TaskItem editTask={editTask} key={idx} _id={task._id} markAsDone={markAsDone} deletTask={deletTask} title={task.title} description={task.description} status={task.status} date={task.date}/>)}                

                </View>
            </ScrollView>
            :
                <ActivityIndicator
                    size={16}
                    color={"blue"}
                />
            }
        </React.Fragment>
    )
}

export default Index

const TaskItem = ({ _id ,title ,description , status ,date,deletTask ,markAsDone ,editTask}) =>{

    const [error ,setError] = useState('')
    const [deleting ,setDeleting] = useState(false)

    function getColor(status){
        switch(status){
            case 'pending':
                return 'orange'
            case 'done':
                return 'green'
        }
    }


    return (
        <View style={styles.task}>
            <View>
                <Text style={{fontWeight:'bold'}}>{title}</Text>
                <Text>{description}</Text>
                <Text>
                    <Text style={{color:getColor(status) ,fontWeight:'semibold'}} >{status}</Text>{' | '}
                    <Text>{date.toString().split('T')[0]}</Text>
                </Text>
            </View>
            <View style={{flexDirection:'row' ,justifyContent:'space-evenly' ,gap:10 ,alignItems:'center'}} >
                <View>
                    {status == 'pending' && 
                    <View>
                        <TouchableOpacity onPress={()=>markAsDone(_id)} >
                        <View style={{flexDirection:'column' ,alignItems:'center'}} >
                            <Feather name='check' size={16}/>
                            <Text style={{fontSize:10}}>Mark as done</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    }

                </View>
                <View style={{gap:10}}>
                    <TouchableOpacity onPress={()=>editTask(_id)} >
                        <View style={{flexDirection:'column' ,alignItems:'center'}} >
                            <Feather name='edit' size={16}/>
                            <Text style={{fontSize:10}}>edit</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>deletTask(_id)} >
                        <View style={{flexDirection:'column' ,alignItems:'center'}} >
                            <Feather name='trash' size={20}/>
                            <Text style={{fontSize:10}}>delete</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tasksContainer:{
        // borderWidth:1,
        rowGap:10
        // border
    },
    task:{
        justifyContent:'space-between',
        padding:3,

        backgroundColor:'white',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        flexDirection:'row'
    }
})