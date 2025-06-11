import { View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants/icons'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000', // schwarzer Hintergrund
          borderTopWidth: 0,
          height: 100,
          paddingTop: 25,
        },
        tabBarActiveTintColor: '#007AFF', // aktive Icon-Farbe
        tabBarInactiveTintColor: '#ffffff', // inaktive Icon-Farbe
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={icons.home}
              style={{
                width: 40,
                height: 40,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="favorites"
        options={{
            title: 'Favorites',
            tabBarIcon: ({ color, size }) => (
                <Image
                source={icons.favorites}
                style={{
                    width: size ?? 24,
                    height: size ?? 24,
                    tintColor: color,
                }}
                resizeMode="contain"
                />
            ),
        }}
      />
        <Tabs.Screen 
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <Image
                source={icons.settings}
                style={{
                  width: 38,
                  height: 38,
                  tintColor: color,
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
    </Tabs>
  )
}

export default _layout
