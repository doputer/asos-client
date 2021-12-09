import { Button, Collapse, Input, Modal, Tag } from 'antd';
import useQuestions from 'Hooks/useQuestions';
import { useState } from 'react';

import { FormOutlined } from '@ant-design/icons';
import { IQuestion } from 'Interfaces/IQuestion';

export const QuestionCollapse = () => {
  const { Panel } = Collapse;
  const { TextArea } = Input;

  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState({
    title: '',
    message: '',
  });

  const [questions, refreshQuestions] = useQuestions(146);

  console.log(questions);

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;

    setQuestion({ ...question, [name]: value });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div
      className="flex-column"
      style={{
        width: '100%',
        gap: '10px',
      }}
    >
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
      <Collapse
        defaultActiveKey={[]}
        style={{
          width: '100%',
          height: 'fit-content',
          overflow: 'auto',
        }}
      >
        {questions.map((question: IQuestion) => (
          <Panel
            header={question.title}
            key={question.id}
            extra={
              <Tag color={question.status === 0 ? '#f50' : '#108ee9'}>
                {question.status === 0 ? '답변 대기 중' : '답변 완료'}
              </Tag>
            }
          >
            <p>{question.title}</p>
          </Panel>
        ))}
      </Collapse>
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
          />
          <TextArea
            size="large"
            autoSize={{ minRows: 4, maxRows: 10 }}
            showCount
            maxLength={300}
            placeholder="문의 내용을 입력해주세요."
            name="message"
            onChange={handleInput}
          />
        </div>
      </Modal>
    </div>
  );
};
