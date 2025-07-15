import { Button, Form, Input } from "antd";
import "./comments.scss";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { createComment, loadComments } from "../ProductItemSlice";
import { useEffect } from "react";

type CommentForm = {
  userName: string
  text: string
}

export const Comments = ({ productId }: {productId: number}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.product);
  
  const formHandler = (values: CommentForm) => {
    const date = new Date().toLocaleString();
    dispatch(createComment({ ...values, productId, date }));
    form.resetFields()
  };

  useEffect(() => {
    dispatch(loadComments(productId));
  }, [productId]);

  return (
    <div className="commentsContainet">
      <h1>Добавьте комментарий</h1>
      <Form form={form} onFinish={formHandler}>
        <Form.Item name="userName">
          <Input placeholder="Введите имя" />
        </Form.Item>
        <Form.Item name="text">
          <Input.TextArea placeholder="Комментарий" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form>
      <h2>Список комментариев:</h2>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="commentItem">
            <span>{comment.userName}</span>
            <span>{comment.date}</span>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
