import { useAppDispatch } from "../../../reduxHooks";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import { login, registration } from "./loginSlice";

type UserFormType ={
  name: string
  login: string
  phone: string
  password: string
}

export const Login = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [error, setError] = useState<null | string>(null)
    const [form] = Form.useForm()


  const dispatch = useAppDispatch()
  const handleFinish = async (values: UserFormType) => {
    if(values.phone){
        const result = await dispatch(registration(values))
        if(result.payload && 'message' in result.payload && result.payload.message === 'Пользовоатель уже зарегестрирован'){
            setError(result.payload.message)
            setOpenRegistration(false)
            form.resetFields()
        }
    }
    const result = await dispatch(login(values))
    if(result.payload && 'message' in result.payload && result.payload.message === 'Логин или пароль неверны'){
        setError(result.payload.message)
    }else if(result.payload && 'login' in result.payload) {
        setError(null)
    }
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ color: 'red' }}>{error}</h2>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              min: 5,
              message: "Должно быть не меньше 5 символов",
            },
          ]}
        >
          <Input placeholder="введите логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              min: 5,
              message: "Должно быть не меньше 5 символов",
            },
          ]}
        >
          <Input placeholder="введите пароль" />
        </Form.Item>
        {openRegistration && (
          <>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  min: 3,
                  message: "Должно быть не меньше 3 символов",
                },
              ]}
            >
              <Input placeholder="Укажите имя" />
            </Form.Item>
            <Form.Item name="phone">
              <Input placeholder="Укажите телефон" />
            </Form.Item>
          </>
        )}
       <Button htmlType="submit">{openRegistration ? 'Зарегестрироваться' : 'Войти'}</Button>
      </Form>
      {!openRegistration && <Button style={{marginTop: 20}} type="primary" htmlType="submit" onClick={() => setOpenRegistration(true)}>Зарегестрироваться</Button>}
    </div>
  );
};
