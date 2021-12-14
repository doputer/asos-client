import { Button, Card, Input, message, Modal } from 'antd';
import { getSearchedQuestions, postQuestion } from 'Apis/questionApi';
import { QuestionCollapse } from 'Components/QuestionCollapse';
import useAsync from 'Hooks/useAsync';
import { useEffect, useState } from 'react';

import { FormOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const QuestionCard = () => {
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState({
    title: '',
    message: '',
  });

  const { error, execute: sendQuestion } = useAsync(postQuestion);

  const { data: questions, execute: refetchQuestions } =
    useAsync(getSearchedQuestions);

  useEffect(() => {
    refetchQuestions(201);
  }, []);

  useEffect(() => {
    if (error) message.error(error, 0.5);
  }, [error]);

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;

    setQuestion({ ...question, [name]: value });
  };

  const handleOk = async () => {
    const result = await sendQuestion({ ...question });

    if (result)
      message.success('질문이 생성되었습니다.', 0.5, () => {
        refetchQuestions(201);
        hideMoal();
      });
  };

  const handleCancel = () => {
    setQuestion({ title: '', message: '' });
    setVisible(false);
  };

  const showModal = () => setVisible(true);
  const hideMoal = () => setVisible(false);

  return (
    <>
      <Card
        className="question-card card-cover"
        bordered
        title={<h1 className="card-title">문의하기</h1>}
        extra={
          <Button
            type="primary"
            shape="round"
            icon={<FormOutlined />}
            style={{
              width: 'fit-content',
            }}
            onClick={() => showModal()}
          >
            문의하기
          </Button>
        }
        size="small"
        bodyStyle={{
          flex: 1,
          overflow: 'auto',
        }}
      >
        <QuestionCollapse questions={questions} />
      </Card>
      <Modal
        title="문의하기"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="작성하기"
        cancelText="취소"
      >
        <div
          className="flex-column"
          style={{
            gap: '10px',
          }}
        >
          <Input
            size="large"
            placeholder="문의 제목을 입력해주세요."
            maxLength={24}
            allowClear
            name="title"
            onChange={handleInput}
            value={question.title}
          />
          <TextArea
            size="large"
            autoSize={{ minRows: 4, maxRows: 10 }}
            showCount
            maxLength={300}
            placeholder="문의 내용을 입력해주세요."
            name="message"
            onChange={handleInput}
            value={question.message}
          />
        </div>
      </Modal>
    </>
  );
};
