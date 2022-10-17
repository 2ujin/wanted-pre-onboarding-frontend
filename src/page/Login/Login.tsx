import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 30px;
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
`;

const IdInput = styled.input`
  margin-top: 80px;
`;

const PassWordInput = styled.input``;

const SubmitBtn = styled.div`
  width: 100%;
  border-radius: 20px;
  background-color: blue;
  padding: 15px;
  text-align: center;
  color: white;
  margin-top: 25px;
`;

const GoSignUp = styled.div`
  font-size: 12px;
  text-decoration: underline;
  margin-top: 15px;
`;



function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    const is_access_token = localStorage.getItem('access_token')
    if(is_access_token){
      history.push('todo');
      return;
    }
  }, []);

  const clickLogin = () => {
    try {
      const option = {
        url: " https://pre-onboarding-selection-task.shop/auth/signin",
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
      };
      axios(option).then((response) => {
        const access_token = response.data.access_token;
        if (!access_token) {
          alert("로그인에 실패하셨습니다");
          return;
        }
  
        // access_token을 저장해주고 로그인 페이지로 이동,
        localStorage.setItem('access_token', access_token);
        
        alert("로그인 성공");
        history.push('/todo')


      }).catch(error => {
        alert("로그인 실패 error : " + JSON.stringify(error));
      });
  
  
    } catch (error) {
      //응답 실패
      alert("로그인 실패 error : " + JSON.stringify(error))
    }
  };

  

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input_email = e.target.value;
    setEmail(input_email);
  };


  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input_password = e.target.value;
    setPassword(input_password);
  };



  return (
    <Wrapper>
      <Title>로그인</Title>
      <IdInput type="text" 
        name="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="아이디" />

      <PassWordInput type="password" 
        name="password"
        value={password}
        onChange={onChangePassword} placeholder="비밀번호" />

      <SubmitBtn onClick={clickLogin}>로그인</SubmitBtn>
      <GoSignUp onClick={() => history.push("/sign-up")}>회원가입하기</GoSignUp>
    </Wrapper>
  );
}

export default Login;
