import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Layout = () =>{
    return(
        <Tabs  >
            <Tabs.Screen name="index"
            options={{
                title:'home',
                headerTitle:'Task manager',
                tabsIcon:()=><Feather name="home" />
            }} 
            />
            <Tabs.Screen name="create"
            options={{
                title:'create',
                headerTitle:'Task creation'
            }}
            />

        </Tabs>
    )
}

export default Layout