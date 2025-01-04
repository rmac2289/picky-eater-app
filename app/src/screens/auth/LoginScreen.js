import React, { useState } from 'react';
import {
 View,
 Text,
 TextInput,
 TouchableOpacity,
 StyleSheet,
 Alert,
 Platform,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { LOCAL_API_URL } from '@env';


const LoginScreen = ({ navigation }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const { signIn } = useAuth();

 const handleLogin = async () => {
   if (!email || !password) {
     Alert.alert('Error', 'Please fill in all fields');
     return;
   }

   setIsLoading(true);
   try {
     const formData = new FormData();
     formData.append('username', email);
     formData.append('password', password);

     const response = await axios.post(`${LOCAL_API_URL}/token`, formData, {
       headers: {
         'Content-Type': 'multipart/form-data',
       },
     });
     
     await signIn(response.data.access_token);
   } catch (error) {
     Alert.alert(
       'Error',
       error.response?.data?.detail || 'An error occurred during login'
     );
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Picky Eater Helper</Text>
     <View style={styles.inputContainer}>
       <TextInput
         style={styles.input}
         placeholder="Email"
         value={email}
         onChangeText={setEmail}
         autoCapitalize="none"
         keyboardType="email-address"
         placeholderTextColor={'grey'}
       />
       <TextInput
         style={styles.input}
         placeholder="Password"
         value={password}
         onChangeText={setPassword}
         secureTextEntry
         placeholderTextColor={'grey'}
       />
       <TouchableOpacity 
         style={styles.button}
         onPress={handleLogin}
         disabled={isLoading}
       >
         <Text style={styles.buttonText}>
           {isLoading ? 'Logging in...' : 'Login'}
         </Text>
       </TouchableOpacity>
       <TouchableOpacity 
         onPress={() => navigation.navigate('Register')}
         style={styles.linkButton}
       >
         <Text style={styles.linkText}>Don't have an account? Register</Text>
       </TouchableOpacity>
     </View>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   padding: 16,
   backgroundColor: '#f5f5f5',
   justifyContent: 'center',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   textAlign: 'center',
   color: '#6200ee',
   marginBottom: 32,
 },
 inputContainer: {
   backgroundColor: '#fff',
   padding: 16,
   borderRadius: 8,
   ...Platform.select({
     ios: {
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.1,
       shadowRadius: 4,
     },
     android: {
       elevation: 2,
     },
   }),
 },
 input: {
   borderWidth: 1,
   borderColor: '#e0e0e0',
   borderRadius: 4,
   padding: 12,
   marginBottom: 16,
 },
 button: {
   backgroundColor: '#6200ee',
   padding: 12,
   borderRadius: 4,
   alignItems: 'center',
 },
 buttonText: {
   color: '#fff',
   fontWeight: '500',
 },
 linkButton: {
   marginTop: 16,
   alignItems: 'center',
 },
 linkText: {
   color: '#6200ee',
 },
});

export default LoginScreen;