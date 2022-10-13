import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 60px;
`;

const ListItem = styled.div`
  border-radius: 20px;
  border: 0.1px solid #dfdfdf;
  padding: 10px;
  text-align: left;
  font-size: 12px;
  box-shadow: 0 2px 2px 0 rgba(34, 34, 34, 0.1);
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckIcon = styled.img``;

function Todo() {
  return (
    <Wrapper>
      <Title>To do !</Title>

      <ListItem>
        밥 묵기
        <CheckIcon src={`${process.env.PUBLIC_URL}/icon/check-o.svg`} />
      </ListItem>
      <ListItem>
        코딩하기
        <CheckIcon src={`${process.env.PUBLIC_URL}/icon/check-o.svg`} />
      </ListItem>
      <ListItem>
        쌈싸묵기
        <CheckIcon src={`${process.env.PUBLIC_URL}/icon/check-o.svg`} />
      </ListItem>
    </Wrapper>
  );
}

export default Todo;
