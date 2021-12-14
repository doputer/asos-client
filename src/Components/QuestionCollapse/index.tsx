import { Collapse, Divider, Tag } from 'antd';
import { Spinner } from 'Components/Spin';
import { IQuestion } from 'Interfaces/IQuestion';

export const QuestionCollapse = ({ questions }: { questions: IQuestion[] }) => {
  const { Panel } = Collapse;

  return (
    <div
      className="flex-column"
      style={{
        width: '100%',
        height: '100%',
        gap: '10px',
      }}
    >
      {questions ? (
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
              <h1>질문</h1>
              <p>{question.message}</p>
              {question.answer && (
                <>
                  <Divider />
                  <h1>답변</h1>
                  {question.answer.message}
                </>
              )}
            </Panel>
          ))}
        </Collapse>
      ) : (
        <div
          className="flex-center"
          style={{
            height: '100%',
          }}
        >
          <Spinner size={72} />
        </div>
      )}
    </div>
  );
};
