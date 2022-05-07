import { SubmitFeedbackUseCase } from './submitFeedback-use-case'

// spies 

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(
      submitFeedback.handleNewFeedbackSubmit({
        type: 'BUG',
        comment: 'test comment',
        screenshot: 'data:image/png;base64,'
      })
    ).resolves.not.toThrow()
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('Should NOT be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.handleNewFeedbackSubmit({
        type: '',
        comment: 'test comment',
        screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSU'
      })
    ).rejects.toThrow()
    })
    
    it('Should NOT be able to submit feedback without comment', async () => {
      await expect(
        submitFeedback.handleNewFeedbackSubmit({
          type: 'BUG',
          comment: '',
          screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSU'
        })
      ).rejects.toThrow()
    })
    

    it('Should NOT be able to submit feedback with wrong file format', async () => {
      await expect(
        submitFeedback.handleNewFeedbackSubmit({
          type: 'BUG',
          comment: '',
          screenshot: 'test.mp4'
        })
      ).rejects.toThrow()
    })
  })

