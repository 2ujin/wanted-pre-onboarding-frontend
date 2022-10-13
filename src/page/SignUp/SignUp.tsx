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

function SignUp() {
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <SubTitle>당신을 환영합니다! 👋🏻👋🏻</SubTitle>

      <IdInput type="text" placeholder="아이디" />
      <PassWordInput type="password" placeholder="비밀번호" />

      <SubmitBtn>회원가입</SubmitBtn>
    </Wrapper>
  );
}

export default SignUp;
