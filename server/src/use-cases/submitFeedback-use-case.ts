import { FeedbacksRepository } from '../repositories/feedbacksRepository';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prismaFeedbacksRepository'
import { MailAdapter } from '../services/mailAdapter';

interface SubmitFeedbackUseCaseRequest {
  type: string,
  comment: string,
  screenshot?: string,
}

export class SubmitFeedbackUseCase {
  
    constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}
  
  async handleNewFeedbackSubmit(request: SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot } = request;

  
  // not following SOLID principles, specially it's dependency inversion principle, attaching the code to an external service
    /* const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

    await prismaFeedbacksRepository.create({
      type,
      comment,
      screenshot,
    })
   */

    if (!type) {
      throw new Error ('Type is required');
    };

    if (!comment) {
      throw new Error ('Comment is requried')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error ('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail(
      {subject: 'Novo Feedback', 
      body: [
        `<div style="font-family: sans-serif; font-size:16px; color: #111">`,
        `<p>Tipo do feedback: ${type} </p>`,
        `<p> Comentário: ${comment}<p/>`,
        screenshot ? `<img style="width: 800px;" src="${screenshot}" />` : null,
        `<br>`,
        `<a href="${screenshot}"> Full Screen Preview </a>`,
        `</div>`
      ].join('\n'),    
    })
  }
}