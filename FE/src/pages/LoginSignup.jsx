import React, { useContext, useEffect, useState } from 'react'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'
import { logInAPI, signUpAPI } from '../API'
import axios from 'axios';
const LoginSignup = () => {
    const [submit, setSubmit] = useState('Login');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handerPhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handerPassWordChange = (event) => {
        setPassword(event.target.value);

    }

    const handerNameChange = (event) => {
        setName(event.target.value);

    }

    const handerAdressChange = (event) => {
        setAdress(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handerForgot = () => {
        if (submit === 'Forgot') {
            alert('Chức năng đang được phát triển');
        } 
    }
    const handerLogin = async () => {
        if (submit === 'Login') {
            try {
                const data = {
                    "sdt": phoneNumber,
                    "password": password
                };
                const response = await fetch(logInAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }

                const responseData = await response.json();

                // Xử lý khi request thành công
                login(responseData);
                alert(`Xin chào ${responseData.hoTen}`);
                if (responseData.vaiTro.toLowerCase() === 'user') navigate('/homepage');
                else navigate('/admin');
            } catch (error) {
                if (error.message === 'HTTP error 401') {
                    // Xử lý khi password incorrect
                    alert('Password incorrect');
                    setPassword('');
                } else if (error.message === 'HTTP error 404') {
                    // Xử lý khi account doesn't exist
                    alert('Account does not exist');
                    setPhoneNumber('');
                    setPassword('');
                } else {
                    // Xử lý khi có lỗi xảy ra
                    console.error('An error occurred:', error);
                }
                
            }
        }
    };

    const handerSignup = async () => {
        if (submit === 'Signup') {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                setPassword('');
                setConfirmPassword('');
                return;
            }
            try {
                const data = {
                    "sdt": phoneNumber,
                    "hoTen": name,
                    "password": password,
                    "diaChi": adress
                }
                const response = await fetch(signUpAPI, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const responseData = await response.json();
                if (response.ok) {
                    // Xử lý khi request thành công
                    alert(`Welcome ${responseData.hoTen}`)
                    setSubmit('Login');
                    
                } else {
                    // Xử lý khi request thất bại
                    alert('Lỗi tạo tài khoản');
                }
                
            } catch (error) {
                alert('Lỗi server');
            }
            setPhoneNumber('');
            setPassword('');
        }
    }
    const handerForgotPassword = async () => {
        if (submit === 'Forgot password') {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            try {
                const url = `http://localhost:8080/api/nguoidung/thaydoimatkhau?sdt=${phoneNumber}&matkhauMoi=${password}`;
                const response = await axios.put(url);
                setPassword('');
                setPhoneNumber('');
                alert('Thay đổi mật khẩu thành công');
            } catch (error) {
                alert('Lỗi server');
            }
            setPassword('');
            setPhoneNumber('');
        }
    }


    return (
        <div className="my-container">
            <div className="my-header">
                <div className="my-text">{submit}</div>
                <div className="my-underline"></div>
            </div>
            <div className="my-inputs">
                <div className="my-input">
                    <input placeholder='Số điện thoại' type="text" onChange={handerPhoneNumberChange} value={phoneNumber} />
                </div>
                {
                    submit === "Signup" ?
                    <>
                        <div className="my-input">
                            <input placeholder='Họ và Tên' type="text" onChange={handerNameChange} />
                        </div>
                        <div className="my-input">
                            <input placeholder='Địa chỉ' type="text" onChange={handerAdressChange} />
                        </div>
                    </> : <></>
                }
                {   
                    submit !== "Forgot password" ? 
                    <> 
                        <div className="my-input">
                            <input placeholder='Password' type="password" value={password} onChange={handerPassWordChange} />
                        </div> 
                    </>: <></>
                }
                {
                    submit === "Signup" ?
                        <div className="my-input">
                            <input placeholder='Confirm Password' type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        </div>
                        : <></>
                }
                {
                    submit === "Forgot password" ? 
                    <> 
                        <div className="my-input">
                            <input placeholder='New passowrd' type="password" onChange={handerPassWordChange} />
                        </div>
                        <div className="my-input">
                            <input placeholder='Confirm new password' type="password" onChange={handleConfirmPasswordChange} />
                        </div>
                    </>: <></>
                }
            </div>
            {   
                submit !== "Forgot password" ?
                <div className="my-forgot-password" onClick={() => {setSubmit('Forgot password')}}>Forgot Password? </div>
                :
                <div className="my-forgot-password" onClick={() => {setSubmit('Login')}}>Haved Account? </div>
                
            }
            <div className="my-submit-container">
                {
                    submit !== "Forgot password" ?
                    <>
                        <div className={submit === "Login" ? "my-submit my-gray" : "my-submit"} onClick={() => { setSubmit('Signup'); handerSignup(); }}>Sign Up</div>
                        <div className={submit === "Signup" ? "my-submit my-gray" : "my-submit"} onClick={() => { setSubmit('Login'); handerLogin(); }} > Login</div>
                    </>
                    : 
                    <>
                        <div className={submit === "Forgot password" ? "my-submit my-gray" : "my-submit"} onClick={() => {handerForgotPassword(); setSubmit('Login');} } >Sent</div>
                    </>
                     
                }
                
            </div>
        </div>
    )
}

export default LoginSignup;