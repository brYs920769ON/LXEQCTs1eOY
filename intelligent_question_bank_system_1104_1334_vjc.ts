// 代码生成时间: 2025-11-04 13:34:57
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// Define the Question interface
interface Question {
  id: number;
  content: string;
  options: string[];
  correctAnswer: string;
}

// Define the QuestionBank class
class QuestionBank {
  private questions: Question[];

  constructor() {
    this.questions = [];
  }

  // Add a new question to the bank
  public addQuestion(question: Question): void {
    this.questions.push(question);
  }

  // Get a random question from the bank
  public getRandomQuestion(): Question | null {
    if (this.questions.length === 0) {
      throw new Error("No questions available in the bank.");
    }
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return this.questions[randomIndex];
  }

  // Get all questions from the bank
  public getAllQuestions(): Question[] {
    return this.questions;
  }
}

// Define the Router for handling HTTP requests
const router = new Router();
const questionBank = new QuestionBank();

// Add some sample questions to the bank
questionBank.addQuestion({
  id: 1,
  content: "What is the capital of France?",
  options: ["Paris", "London", "Berlin", "Madrid"],
  correctAnswer: "Paris"
});

questionBank.addQuestion({
  id: 2,
  content: "What is 2 + 2?",
  options: ["3", "4", "5", "6"],
  correctAnswer: "4"
});

// GET endpoint to get a random question
router.get("/random-question", async (ctx) => {
  try {
    const question = questionBank.getRandomQuestion();
    if (!question) {
      ctx.response.status = 404;
      ctx.response.body = { message: "No questions found." };
    } else {
      ctx.response.body = question;
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { message: error.message };
  }
});

// GET endpoint to get all questions
router.get("/questions", async (ctx) => {
  try {
    const questions = questionBank.getAllQuestions();
    ctx.response.body = questions;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { message: error.message };
  }
});

// Create and run the application
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => {
  console.log("Server is running on http://localhost:8000");
});

await app.listen({ port: 8000 });