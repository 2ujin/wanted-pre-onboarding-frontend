import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  /* text-align: center; */
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

const CheckIcon = styled.img`
  width: 20px;
`;

const AddButton = styled.button`
  width: 40%;
`

const TodoTextInput = styled.input`
  border: none;
  padding: 0;
  margin: 0;
`;

const AddTodoButton = styled.button`
  width: 50px;

`

function Todo() {
  // 추가하는 새로운 투두 값
  const [todo, setTodo] = useState('');

  // 기존 투두값
  const [todoItem, setTodoItem] = useState('');
  const [is_update_id, setIsUpdateMode] = useState(0);

  const [isCompleted, setCompleted] = useState(false);

  const [todoList, setTodoList] = useState([
    {
      id: 0,
      isCompleted: false,
      todo: '',
      userId: 0,
      is_edit_mode: false
    }
  ]);

  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    selectTodoList();
  }, [])

  const onChangeTodoTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todo = e.target.value;
    setTodo(todo);
    return;
  };

  const onChangeTodoUpdateTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todo = e.target.value;
    setTodoItem(todo);
    // return;
  };

  const clickAddTodo = () => {
    const option = {
      url: "https://pre-onboarding-selection-task.shop/todos",
      method: "POST",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      data: {
        todo
      }
    };
    axios(option).then((response) => {
      setTodo('');
      selectTodoList();
    }).catch(error => {
      // alert("회원가입 실패 error : " + JSON.stringify(error));
    });


  }

  const selectTodoList = () => {
    try {
      const option = {
        url: "https://pre-onboarding-selection-task.shop/todos",
        method: "GET",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      };
  
      axios(option).then((response) => {
        setTodoList(response.data);
      }).catch(error => {
        // alert("회원가입 실패 error : " + JSON.stringify(error));
      });
    } catch (error) {
      //응답 실패
      // alert("회원가입 실패 error : " + JSON.stringify(error))
    }
  
  }

  const clickUpdateTodo = (item: any) => {
    setIsUpdateMode(item.id);
    setTodoItem(item.todo)
  }

  const clickSaveUpdateTodo = (item: any, todo?: any) => {
    const option = {
      url: `https://pre-onboarding-selection-task.shop/todos/${item.id}`,
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      data: {
        todo: todo ? todo : todoItem,
        isCompleted: item.isCompleted
      }
    };
    axios(option).then((response) => {
      console.log(response.data);
      setIsUpdateMode(0);
      selectTodoList()
    }).catch(error => {
      console.log(error)
      // alert("회원가입 실패 error : " + JSON.stringify(error));
    });
  }

  const clickDeleteTodo = (item: any) => {
    const option = {
      url: `https://pre-onboarding-selection-task.shop/todos/${item.id}`,
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${access_token}`
      }
    };
    axios(option).then((response) => {
      selectTodoList()
    }).catch(error => {
      console.log(error)
      // alert("회원가입 실패 error : " + JSON.stringify(error));
    });
  }


   const clickCompleteTodo = (item: any) => {
    setCompleted(!item.isCompleted);
    item.isCompleted = !item.isCompleted; 

    clickSaveUpdateTodo(item, item.todo)
  }


  return (
    <Wrapper>
      <Title>To do !</Title>
      <AddButton>+ 할일추가</AddButton>

      {/* 추가 아이템 박스 */}
      <ListItem>
        <TodoTextInput
          type="text"
          name="email"
          value={todo}
          onChange={onChangeTodoTextInput}
          placeholder="해야할 일을 작성해주세용가리"
        />

        <AddTodoButton onClick={clickAddTodo}>추가</AddTodoButton>
        {/* <CheckIcon src={`${process.env.PUBLIC_URL}/icon/check-o.svg`} /> */}
      </ListItem>

    {/* 리스트 아이템 박스 */}
      {todoList &&
          todoList.map((item: any, index) =>
        <ListItem id={item.id}>

          {item.isCompleted ? <CheckIcon onClick={() => clickCompleteTodo(item)}  src={`${process.env.PUBLIC_URL}/icon/check-o.svg`} /> : <CheckIcon onClick={() => clickCompleteTodo(item)} src={`${process.env.PUBLIC_URL}/icon/check.svg`} />}

          {is_update_id !== item.id ?     
          <span>{item.todo}</span> :    
            <TodoTextInput
            type="text"
            name="email"
            value={todoItem}
            onChange={onChangeTodoUpdateTextInput}
          />}
          <div>
            {is_update_id !== item.id ? <CheckIcon onClick={() => clickUpdateTodo(item)} src={`${process.env.PUBLIC_URL}/icon/i_fix.png`} /> : <span onClick={()=> clickSaveUpdateTodo(item)}>저장</span>}&nbsp;

            <CheckIcon onClick={() => clickDeleteTodo(item)} src={`${process.env.PUBLIC_URL}/icon/i_delete.png`} />
          </div>
        </ListItem>
    )}
    </Wrapper>
  );
}

export default Todo;
