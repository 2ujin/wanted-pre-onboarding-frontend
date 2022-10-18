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
  margin-left: 10px;
  color: black;
`;

const Desc = styled.div`
  font-size: 14px;
  color: #a1a1a1;
  margin-left: 10px;
  margin-top: 15px;
`

const IdInput = styled.input`
  margin-top: 30px;
`;

const PassWordInput = styled.input``;

const SubmitBtn = styled.button`
  width: 100%;
  border-radius: 20px;
  background-color: blue;
  padding: 15px;
  text-align: center;
  color: white;
  margin-top: 25px;

  &.disabled {
    background-color: #a5c4ff;
    color: white
  }

`;

const GoSignUp = styled.div`
  font-size: 12px;
  text-decoration: underline;
  margin-top: 15px;
`;


const TitleImg = styled.img`
  width: 90%;
  margin-bottom: 10px;
`

const ErrorText = styled.div`
  color: red;
  margin-top: 7px;
  margin-bottom: 10px;
  font-size: 13px;
`


function Login() {
  const history = useHistory();
  const api_url = "https://pre-onboarding-selection-task.shop";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [is_email_disable, setIsEmailDiable] = useState(true);
  const [is_password_disable, setIsPasswordDiable] = useState(true);

  const [is_login_error, setIsLoginError] = useState(false);

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
        url: `${api_url}/auth/signin`,
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
        
        alert("로그인 성공! 환영합니다 😃");
        history.push('/todo')
      }).catch(error => {
        console.log(error)
        if (error.code == "ERR_BAD_REQUEST") {
          setIsLoginError(true);
        }

      })
  
    } catch (error) {
      alert(JSON.stringify(error))
    }
  };

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
    } else {
      setIsPasswordDiable(true)
    }
    setPassword(input_password);
  };

  return (
    <>
      <TitleImg src={`${process.env.PUBLIC_URL}/icon/login.svg`} />
      <Title>LOGIN 👋🏻 </Title>
      <Desc>다시 만나서 반가워요!</Desc>
      <Wrapper>
        <IdInput type="text"
          name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일" />
        <ErrorText>{!is_email_disable || email == '' ? null : '올바르지 않은 이메일 형식입니다!'}</ErrorText>

        <PassWordInput type="password"
          name="password"
          value={password}
          onChange={onChangePassword} placeholder="비밀번호" />
        <ErrorText>{!is_password_disable || password == '' ? null : '비밀번호는 8글자 이상이어야됩니다.'}</ErrorText>

        <SubmitBtn disabled={is_email_disable || is_password_disable} className={is_email_disable || is_password_disable ? 'disabled' : ''} onClick={clickLogin}>로그인</SubmitBtn>
        <ErrorText>{is_login_error ? '아이디 또는 비밀번호를 잘못입력하셨습니다.' : ''}</ErrorText>

        <GoSignUp onClick={() => history.push("/sign-up")}>회원가입하기</GoSignUp>
      </Wrapper>
    </>
  );
}

export default Login;
