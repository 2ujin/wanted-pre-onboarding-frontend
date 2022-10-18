import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  /* text-align: center; */
`;

const TitleWrapper = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 40px;
  background: #f6f6f6;
  border-radius: 8px;
  box-shadow: 0 2px 2px 0 rgba(34, 34, 34, 0.1);
  padding: 20px;
  color: #404040ff;
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

  &.is_complete{
    text-decoration: line-through;
    color: #404040;
  }
`;

const CheckIcon = styled.img`
  width: 20px;
  margin-left: 5px;
`;

const TodoTextInput = styled.input`
  border: none;
  padding: 0;
  margin: 0;
  height: 20px;
  text-align: center;
  color: #4d4d4d;
  font-size: 13px;
`;

const AddTodoButton = styled.button`
  width: 70px;
`

const IconWrapper = styled.div`
  display: flex;
`;

const TodoText = styled.div`
  color: #4d4d4d;
  font-size: 13px;
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
    })
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
        alert("select todo list error" + JSON.stringify(error))
      });
    } catch (error) {
      alert(error)
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
      alert("업데이트 실패" + JSON.stringify(error));
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
      alert("삭제 실패 error : " + JSON.stringify(error));
    });
  }


   const clickCompleteTodo = (item: any) => {
    setCompleted(!item.isCompleted);
     item.isCompleted = !item.isCompleted; 
    clickSaveUpdateTodo(item, item.todo)
  }


  return (
    <Wrapper>
      <TitleWrapper>✅ 오늘의 할 일을 적어보세요!</TitleWrapper>

      {/* 추가 아이템 박스 */}
      <ListItem>
        <TodoTextInput
          type="text"
          name="email"
          value={todo}
          onChange={onChangeTodoTextInput}
          placeholder="해야할 일을 작성해주세요!"
        />

        <AddTodoButton onClick={clickAddTodo}>+ 추가</AddTodoButton>
      </ListItem>

    {/* 리스트 아이템 박스 */}
      {todoList &&
          todoList.map((item: any, index) =>
            <ListItem id={item.id} className={item.isCompleted ? 'is_complete' : ''}>
              {item.isCompleted ? <CheckIcon onClick={() => clickCompleteTodo(item)} src={`${process.env.PUBLIC_URL}/icon/check-o.png`} /> : <CheckIcon onClick={() => clickCompleteTodo(item)} src={`${process.env.PUBLIC_URL}/icon/check.svg`} />}

              {is_update_id !== item.id ?
                <TodoText>{item.todo}</TodoText> :
                <TodoTextInput
                  type="text"
                  name="email"
                  value={todoItem}
                  onChange={onChangeTodoUpdateTextInput}
                />}

              <IconWrapper>
                {is_update_id !== item.id ? <CheckIcon onClick={() => clickUpdateTodo(item)} src={`${process.env.PUBLIC_URL}/icon/i_fix.png`} /> : <CheckIcon onClick={() => clickSaveUpdateTodo(item)} src={`${process.env.PUBLIC_URL}/icon/i_save.png`} />}
                <CheckIcon onClick={() => clickDeleteTodo(item)} src={`${process.env.PUBLIC_URL}/icon/i_delete.png`} />
              </IconWrapper>
        </ListItem>
    )}
    </Wrapper>
  );
}

export default Todo;
