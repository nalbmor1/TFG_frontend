import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RouteLoader() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: -insets.bottom,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.4)',
            zIndex: 10
        }}>
            <LottieView
                source={require('../../../assets/lottie/map_loading.json')}
                autoPlay
                loop
                style={{ width: 80, height: 80 }}
            />
        </View>
    );
}