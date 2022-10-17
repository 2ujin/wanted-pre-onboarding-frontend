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
`;

const SubTitle = styled.div`
  font-size: 15px;
  margin-top: 12px;
`;

const IdInput = styled.input`
  margin-top: 80px;
`;

const PassWordInput = styled.input``;

const SubmitBtn = styled.button`
  width: 100%;
  border-radius: 20px;
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

function SignUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;

  let is_disable = true;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email" && value.includes("@")) {
      is_disable = false;
    }

    if (name === "password" && value.length > 7) {
      is_disable = false;
    }

    console.log(is_disable);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const clickSignUp = () => {
    try {
      const option = {
        url: " https://pre-onboarding-selection-task.shop/auth/signup",
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        data: {
          email: form.email,
          password: form.password,
        },
      };
      axios(option).then((response) => {
        const access_token = response.data.access_token;
        if (!access_token) {
          alert("회원가입에 실패하셨습니다");
          return;
        }

        console.log(access_token);
      });
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <SubTitle>당신을 환영합니다! 👋🏻👋🏻</SubTitle>

      <IdInput
        type="text"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="아이디"
      />
      <PassWordInput
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="비밀번호"
      />

      <SubmitBtn disabled={is_disable} onClick={clickSignUp}>
        회원가입
      </SubmitBtn>
    </Wrapper>
  );
}

export default SignUp;
