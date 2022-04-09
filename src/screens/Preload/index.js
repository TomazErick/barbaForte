import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

// Context
import { userContext } from '../../contexts/UserContext';

// API
import Api from '../../Api';

// Style
import { Container, LoadingIcon } from './styles';

// SVG
import BarberLogo from '../../assets/barber.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(userContext);

    const navigation = useNavigation();

    // check wheter the user has a token or not
    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // validate token
                let res = await Api.checkToken(token);
                if (res.token) {
                    await AsyncStorage.setItem('token', json.token);

                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: json.data.avatar,
                        },
                    });
    
                    navigation.reset({
                        routes: [{name: 'MainTab'}],
                    }); 

                } else {
                    navigation.navigate('SignIn');
                }
            } else {
                navigation.navigate('SignIn');
            };
        };
        checkToken();
    }, []);

    return (
        <Container>
            <BarberLogo width="100%" height="160"/>
            <LoadingIcon size="large" color="#FFFFFF"/>
        </Container>
    );
};
