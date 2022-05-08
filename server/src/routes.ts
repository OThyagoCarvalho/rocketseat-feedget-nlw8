
import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/submitFeedback-use-case'
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { NodemailerMailAdapter } from './services/nodemailer/nodemailerMailAdapter'


export const routes = express.Router();



routes.post('/feedbacks',async (request, response)=>{

  const {type, comment, screenshot } = request.body;

  try {
    
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailer = new NodemailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository, nodemailerMailer
  );

  await submitFeedbackUseCase.handleNewFeedbackSubmit({
    type,
    comment,
    screenshot
  })

  return response.status(201).send();
    
  } catch (err) {
    console.log(err);
    return response.status(500).send();
  }


})

