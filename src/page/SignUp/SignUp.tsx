import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 30px;
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-left: 10px;
  color: black;
`;

const Desc = styled.div`
  font-size: 14px;
  color: #a1a1a1;
  margin-left: 10px;
  margin-top: 15px;
`;

const IdInput = styled.input`
  margin-top: 30px;
`;

const PassWordInput = styled.input``;

const SubmitBtn = styled.button`
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  text-align: center;
  color: white;
  margin-top: 25px;

  &.disabled {
    background-color: #a5c4ff;
    color: white
  }

`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 12px;
`;

const TitleImg = styled.img`
  width: 90%;
  margin-bottom: 10px;
`


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [is_email_disable, setIsEmailDiable] = useState(true); 
  let [is_password_disable, setIsPasswordDiable] = useState(true); 

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input_email = e.target.value;
    if (input_email.includes("@")) {
      setIsEmailDiable(false)
    } else {
      setIsEmailDiable(true)
    }
    setEmail(input_email);
  };


  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input_password = e.target.value;
    if (input_password.length >= 8) {
      setIsPasswordDiable(false)
    }else{
      setIsPasswordDiable(true)
    }
    setPassword(input_password);
  };

  const history = useHistory();
  const clickSignUp = () => {
    try {
      const option = {
        url: " https://pre-onboarding-selection-task.shop/auth/signup",
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
          alert("회원가입에 실패하셨습니다");
          return;
        }

        // 로그인 페이지로 이동,
        if(confirm("회원가입에 성공하셨습니다!")){
          history.push('/')
        }
      }).catch(error => {
        alert("회원가입 실패 error : " + JSON.stringify(error));
      });


    } catch (error) {
      //응답 실패
      alert("회원가입 실패 error : " + JSON.stringify(error))
    }
  };

  return (
    <>
      <TitleImg src={`${process.env.PUBLIC_URL}/icon/sign-up.svg`} />
      <Title>SIGN UP 👋🏻 </Title>
      <Desc>당신을 환영합니다!</Desc>

      <Wrapper>
      <IdInput
        type="text"
        name="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="이메일"
      />
      <ErrorText>{!is_email_disable || email == '' ? null : '올바르지 않은 이메일 형식입니다!'}</ErrorText>
      <PassWordInput
        type="password"
        name="password"
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호"
      />
      <ErrorText>{!is_password_disable || password == '' ? null : '비밀번호는 8글자 이상이어야됩니다.'}</ErrorText>
        <SubmitBtn disabled={is_email_disable || is_password_disable} className={is_email_disable || is_password_disable ? 'disabled' : ''} onClick={clickSignUp}>
        회원가입
      </SubmitBtn>
    </Wrapper>
    </>
  );
}

export default SignUp;
