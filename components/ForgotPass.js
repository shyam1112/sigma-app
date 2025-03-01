import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ToastAndroid, ActivityIndicator,ScrollView, Pressable } from 'react-native';
import emailjs from "emailjs-com";
import { useNavigation } from '@react-navigation/native';
import config from '../config.json';
import axios from 'axios';

export default function Forgotpass() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(true);
  const [otp, setOtp] = useState();
  const [inputotp, setInputotp] = useState('');
  const [isotptrue, setIsotptrue] = useState(false);

  const [newpass, setNewpass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigation = useNavigation();
  const [btn, setbtn] = useState(false);


  const changepass = async () => {
    console.log("Into change password.");
  
    // Function to validate password
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      return passwordRegex.test(password);
    };
  
    // Validate new password
    if (!validatePassword(newpass)) {
      ToastAndroid.show(
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        ToastAndroid.LONG
      );
      return;
    }
  
    // Check if passwords match
    if (newpass !== confirmPass) {
      ToastAndroid.show("Both passwords must be the same.", ToastAndroid.LONG);
      return;
    }
  
    // Perform password change
    try {
        const response = await axios.put(`${config.HOST}/api/auth/updatepass/${email.trim()}`, {
            pass: newpass,
        });
    
        if (response.status === 200) {
            ToastAndroid.show('Your password was successfully changed.', ToastAndroid.LONG);
            navigation.navigate('login');
        } else {
            ToastAndroid.show('Failed to change the password. Please try again.', ToastAndroid.LONG);
        }
    } catch (error) {
        console.error('Error updating password:', error.response?.data || error.message);
        ToastAndroid.show(
            error.response?.data?.error || 'An error occurred while updating the password. Please try again.',
            ToastAndroid.LONG
        );
    }
    
  };
  

  const sendEmail = () => {

    const random = Math.floor(Math.random() * 9000 + 1000);
    console.log(email);
    setOtp(random);

    let templateParams = {
      name: "SigmaChat",
      message: `Your otp is : ${random}`,
      to_email: "sigmachatapp11@gmail.com",
      reply_to: email.trim(),
    };
    // console.log('ENVIADOS: ', JSON.stringify(templateParams));

    emailjs.send('service_gaeu4du', 'template_zff1r5f', templateParams, 'TenizJy1_iwSGs7rx').then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess(false);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );

  }

  const checkemail = async() => {
    setbtn(true);
    console.log("email: ",email);
    
    if (email === '') {
      ToastAndroid.show('Email is required!', ToastAndroid.TOP);
    } else if (!email.includes('@')) {
      ToastAndroid.show('Include @ in your email!', ToastAndroid.TOP);
    } else {
      try {
        const response = await axios.post(`${config.HOST}/api/auth/checkemail`, {email:email.trim()});
        // const data = await response.json();
        console.log(response.data);
        
        if (response?.data?.exists == false) {
          ToastAndroid.show("Email doesn't exists. Please use a different email.", ToastAndroid.TOP);
        } else {
          // Email is available, proceed with login
          console.log("Send to mail ");
          
          sendEmail();
        }
        setbtn(false);
      } catch (error) {
        console.error('Error checking email:', error);
        ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
      }
    }
    setbtn(false);
  }
  const submitotp = () => {
    if (inputotp.length < 4) {
      ToastAndroid.show('Please Enter Correct OTP!', ToastAndroid.TOP);
    } else {
      if (String(inputotp) === String(otp)) {
        setIsotptrue(true);
        // console.log("OTP is same!!");
      } else {
        console.log("OTP is undefine/wrong");
        ToastAndroid.show('OTP is incorrect.', ToastAndroid.TOP);
      }
    }
    // console.log(inputotp);
  }

  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  const togglepass = () => {
    setToggle1(!toggle1);
  }

  const toggleconpass = () => {
    setToggle2(!toggle2)
  }


  return (
    <View style={styles.container}>
      {
        success ? (
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Don't Worry! We are here</Text>
            </View>

            <Text style={{ marginTop: 40, fontSize: 11, marginBottom: 5, color: 'grey' }}>We will send OTP to your mailID</Text>
            <View style={{
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'grey',
              width: 250,
              borderRadius: 20,
              height: 50,

              backgroundColor: '#fff',
              flexDirection: 'row',
            }}>

              <Image
                source={require('./images/email.png')}
                style={styles.icon}
              />
              <ScrollView horizontal={true}>

                <TextInput
                  style={styles.email}
                  placeholder='Enter Your Email'
                  value={email}
                  onChangeText={(e) => setEmail(e.toLowerCase())}
                />
              </ScrollView>
            </View>

            {btn ? (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) :
            <View>
              <TouchableOpacity onPress={checkemail}>
                <Text style={{ backgroundColor: 'skyblue', width: 100, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 10, fontSize: 15, marginTop: 20 }}>Send</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        ) : (
          <View style={styles.container}>
            {isotptrue ? (
              <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Change Password</Text>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: '500', color: 'grey' }}>Enter New Password</Text>

                  <View style={styles.textbox2}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('./images/password.png')}
                        style={styles.icon}
                      />
                      <TextInput secureTextEntry={toggle1} style={styles.textbox1text} placeholder='Enter Password' value={newpass} onChangeText={(text) => setNewpass(text)} />
                    </View>
                    {toggle1 ?
                      <Pressable onPress={togglepass}>
                        <Image
                          source={require('./images/passhide.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                      :
                      <Pressable onPress={togglepass}>
                        <Image
                          source={require('./images/passshow.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                    }
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: '500', color: 'grey' }}>Confirm Password</Text>
                  <View style={styles.textbox2}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('./images/password.png')}
                        style={styles.icon}
                      />
                      <TextInput secureTextEntry={toggle2} style={styles.textbox1text} placeholder='Enter Password' value={confirmPass} onChangeText={(text) => setConfirmPass(text)} />
                    </View>
                    {toggle2 ?
                      <Pressable onPress={toggleconpass}>
                        <Image
                          source={require('./images/passhide.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                      :
                      <Pressable onPress={toggleconpass}>
                        <Image
                          source={require('./images/passshow.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                    }
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={changepass}>
                    <Text style={{ backgroundColor: 'skyblue', width: 100, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 10, fontSize: 15, marginTop: 20 }}> Submit </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Verify the Authorisation Code</Text>
                <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }}>Sent to {email}</Text>
                <View style={{ borderColor: 'gray', borderWidth: 1, flexDirection: 'row', marginTop: 30, borderRadius: 10, marginBottom: 10 }}>

                  <TextInput
                    style={styles.otpinput}
                    placeholder='Enter otp here'
                    value={inputotp}
                    onChangeText={(e) => setInputotp(e)}
                    require
                  />
                </View>

                <View>
                  <TouchableOpacity onPress={submitotp}>
                    <Text style={{ backgroundColor: 'skyblue', width: 100, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 10, fontSize: 15, marginTop: 20 }}> Submit </Text>
                  </TouchableOpacity>
                </View>

              </View>
            )

            }
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop: 11,
    marginLeft: 8,
    alignContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 50
  },
  email: {
    height: 40,
    marginTop: 3,
    paddingHorizontal: 10,
    width: 220,
    marginBottom: 3
  },
  otpinput: {
    height: 40,
    marginTop: 3,
    paddingHorizontal: 10,
    width: 220,
    marginBottom: 3
  },
  textbox2: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    width: 250,
    borderRadius: 10,
    height: 45,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textbox1text: {
    height: 50,
    fontSize: 15,
    marginLeft: 10,
    marginTop: -4,
  },
});