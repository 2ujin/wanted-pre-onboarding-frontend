import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { api_url } from "../Components/components";

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
        url: `${api_url}/auth/signup`,
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
          alert("??????????????? ?????????????????????");
          return;
        }

        // ????????? ???????????? ??????,
        if(confirm("??????????????? ?????????????????????!")){
          history.push('/')
        }
      }).catch(error => {
        alert("???????????? ?????? error : " + JSON.stringify(error));
      });


    } catch (error) {
      //?????? ??????
      alert("???????????? ?????? error : " + JSON.stringify(error))
    }
  };

  return (
    <>
      <TitleImg src={`${process.env.PUBLIC_URL}/icon/sign-up.svg`} />
      <Title>SIGN UP ???????? </Title>
      <Desc>????????? ???????????????!</Desc>

      <Wrapper>
      <IdInput
        type="text"
        name="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="?????????"
      />
      <ErrorText>{!is_email_disable || email == '' ? null : '???????????? ?????? ????????? ???????????????!'}</ErrorText>
      <PassWordInput
        type="password"
        name="password"
        value={password}
        onChange={onChangePassword}
        placeholder="????????????"
      />
      <ErrorText>{!is_password_disable || password == '' ? null : '??????????????? 8?????? ????????????????????????.'}</ErrorText>
        <SubmitBtn disabled={is_email_disable || is_password_disable} className={is_email_disable || is_password_disable ? 'disabled' : ''} onClick={clickSignUp}>
        ????????????
      </SubmitBtn>
    </Wrapper>
    </>
  );
}

export default SignUp;
