import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// Context
import { UserContext } from '../../contexts/UserContext';

// Styled Components
import { 
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText, 
    SignMessageButtonTextBold,
 } from './styles';

 // API
 import Api from '../../Api';

 // Reusable components
 import SignInput from '../../components/SignInput';

// Icons
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    // onLogin
    const handleSignClick = async () => {
        if (emailField != '' || passwordField != '') {
            let json = await Api.signIn(emailField, passwordField);

            if(json.token) {
                // Save the token in async storage 
                await AsyncStorage.setItem('token', json.token);
                // Save avatar in context
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar,
                    },
                });
                // Send the user to another page
                navigation.reset({
                    routes: [{name: 'MainTab'}],
                });

            } else {
                alert("E-mail e/ou senha incorretos");
            }

        } else {
            alert("Preencha os campos!")
        }
    };

    const handleMessageButtonClick = () => {
        // Send the user to another page without the possibility to get back directly
        navigation.reset({
            routes: [{name: 'SignUp'}],
        });
    };

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={setEmailField}
                />
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={setPasswordField}
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Login</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
};
