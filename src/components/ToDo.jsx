import React,{useEffect, useState} from "react"
import styled from "styled-components"
function ToDo() {
    const [tasks,setTasks] = useState([
        {
            id:  1 ,
            title : "Finish React and PWA ",
        },
        {
            id:  2 ,
            title : "Start PWA",
        },
        {
            id:  3 ,
            title : "Buy 1kg Tomato",
        },
        {
            id:  4 ,
            title : " Buy 1kg Onion",
        },
        {
            id:  5 ,
            title : "Go to school",
        },
    ])
    const [completed, setCompleted] = useState([
        {
            id: 6,
            title: "Finish React",
        },
        {
            id: 7,
            title: "Finish HTML & CSS",
        },
        {
            id: 8,
            title: "Finish JS & Jquery",
        },
        {
            id: 9,
            title: "Finish Bootstrap & SASS & Git ",
        },
        {
            id: 10,
            title: " Finish Frontend Today",
        },
    ]);
    
    const [newtask,setNewtask] = useState([]);
    const [taskCount, setTaskCount] = useState(0);

    useEffect(() => {
        setTaskCount(completed.length+ tasks.length)
    }, [])

    const DeleteTasks = (id) => {
        let new_list = tasks.filter((task) => task.id !== id)
        setTasks(new_list);
    }
    const DeleteCompleted = (id) => {
        let new_completedList = completed.filter((task) => task.id !== id)
        setCompleted(new_completedList)
    }
    const completeTask = (id) => {
        let current_task = tasks.find((task) => task.id == id)
        setCompleted([...completed, current_task]);
        let new_list = tasks.filter((task) => task.id !== id)
        setTasks(new_list)
    }
    const RevertTasks = (id) => {
        let revert = completed.find((task) => task.id  == id )
        setTasks([...tasks, revert])
        let newly_opened_list = completed.filter((task) => task.id !== id)
        setCompleted(newly_opened_list)
    }
    const RenderTasks = () => {
        return (
            tasks.map((task) => {
              return  <ListItem key={task.id}>
                            <LeftContainer onClick={() => completeTask(task.id)}>
                                <CheckContainer></CheckContainer>
                                <ItemContent>{task.id}, {task.title}</ItemContent>
                            </LeftContainer>
                            <RightContainer>
                                <ActionButton onClick={() => DeleteTasks(task.id)}>
                                    <ButtonImage src={require ("./../assets/delete.svg").default} alt = "" />
                                </ActionButton>
                            </RightContainer>
                        </ListItem>
            })
        )
    }
    const RenderCompleted = () => {
        return (
            completed.map((task) =>{
               return <ListItem key={task.id}>
                            <LeftContainer>
                                <CheckContainerCompleted><TickImage src={require("./../assets/tick-green.svg").default} alt=""/></CheckContainerCompleted>
                                <ItemContentCompleted>{task.id}, {task.title}</ItemContentCompleted>
                            </LeftContainer>
                            <RightContainer>
                                <ActionButton onClick={() => DeleteCompleted(task.id)}>
                                    <ButtonImage src={require("./../assets/delete.svg").default} alt = "" />
                                </ActionButton>
                                <ActionButton onClick={() => RevertTasks(task.id)}>
                                    <ButtonImage src={require("./../assets/revert.svg").default} alt = "" />
                                </ActionButton>
                            </RightContainer>
                        </ListItem>
            })
        )
    }
    const UpdateTasks = (event) => {
        event.preventDefault();
        let  new_tasks = {
            id: taskCount + 1,
            title : newtask
        }
        setTasks([...tasks,new_tasks])
        setNewtask("")
        setTaskCount((prev) => prev + 1)
    }
  return (
    <>
      <Container>
            <Heading>ToDo list</Heading>
            <TodoContainer>
                    <Subheading>Things to be Done </Subheading>
                    <ToDoList>
                        {RenderTasks()}
                    </ToDoList>
                    
            </TodoContainer>
            <NewToDoForm>
                <FormInput value={newtask} onChange={(e) => {setNewtask(e.target.value)}} placeholder="Type your new task!...."/>
                <FormSubmitButton onClick={(e) => UpdateTasks(e)}>Add new!</FormSubmitButton>
            </NewToDoForm>
            <TodoContainer>
                    <Subheading>Completed </Subheading>
                    <ToDoList>
                        {RenderCompleted()}
                    </ToDoList>

            </TodoContainer>
      </Container>
    </>
  );
}

export default ToDo;

//styled components 
const Container = styled.div`
    width: 90%auto;
    max-width: 1000px;
    padding: 50px 10%;
    border-left : 2px solid #f5f5f5;
    border-right : 2px solid #f5f5f5;
    margin : 0 auto;
    min-height : 100vh; 
`;
const Heading = styled.h1`
    font-size: 52px;
    font-weight:bold;
    text-align:center;
    margin-bottom : 40px;
`
const TodoContainer = styled.div`

`
const Subheading = styled.h1`
    font-size:36px;
    color:#050241;
`
const ToDoList = styled.ul`
    
`
const ListItem = styled.li`
    display:flex;
    align-items: center;
    justify-content : space-between;
    margin-bottom : 20px;
    `
const LeftContainer = styled.div`
    display:flex;
    align-items:center;

`
const CheckContainer = styled.span`
    width:32px;
    height:32px;
    border-radius:50%;
    border:2px solid #050241;
    display:inline-block;
    margin-right:15px;
    cursor:pointer; 
`
const ItemContent = styled.span`
    font-size:29px;
    cursor:pointer;
`
const RightContainer = styled.div`

`
const ActionButton = styled.button`
    border:none;
    background:none;
    cursor:pointer;
    margin-right:20px;
    outline:none;
    &:last-child {
        margin-right : 0
    }
`
const ButtonImage = styled.img``
const NewToDoForm = styled.form`
    display:flex;
    margin-left:40px;
    margin-right:30px;
    position:relative;
    &::before {
        content : "";
        background-image:url(${require("./../assets/plus.svg").default})
        width:16px;
        height:16px;
        display:block;
        position:absolute;
        left:10px;
        top:0;
        bottom:0;
        margin:auto 0;
        z-index:2;
    } 
`
const FormInput = styled.input`
    display:block;
    width:100%;
    outline:none;
    border:1px solid #c6c6c6;
    border-right:none;
    padding: 0 10px 0 35px;
    font-size:22px;
`
const FormSubmitButton = styled.button`
    padding:15px 25px;
    white-space : nowrap;
    border:none;
    background: #050241;
    color: #fff;
    cursor:pointer;
    border-radius : 6px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    font-size:24px;
`
const CheckContainerCompleted = styled(CheckContainer)`
    display:flex;
    align-items:center;
    justify-content:center;
    border-color: #06c692;
`
const ItemContentCompleted = styled(ItemContent)`
    color:#06c692;
`
const TickImage = styled.img``