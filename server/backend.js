// ------------------------------
// 1. SET UP SUPABASE CLIENT & DEPENDENCIES
// ------------------------------
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import express from "express";
import cors from "cors";
//import { Configuration, OpenAIApi } from "openai";

const app = express();
// Use cors() with parentheses and enable JSON parsing.
app.use(cors());
app.use(express.json());

// Supabase credentials – you can also load these from environment variables.
const SUPABASE_URL = "https://phfrhemfltbstobombyz.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZnJoZW1mbHRic3RvYm9tYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDEyMzgsImV4cCI6MjA0ODExNzIzOH0.wyDkOGO_-MoaMqJn2FNctb6NNmPYbsF-WiCuUjt_Oh4";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ------------------------------
// 2. DEFINE PDF PATHS ARRAY
// ------------------------------
const pdfPaths = [
  "uploads/injectai/Full_Stack_Dev_Resume_No_Edu_Cloud.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "uploads/injectai/resume1.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "uploads/injectai/resume2.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "uploads/injectai/resume3.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
];

// ------------------------------
// 3. FUNCTION TO EXTRACT TEXT FROM PDF
// ------------------------------
async function extractTextFromPdf(pdfPath) {
  const { data: fileData, error } = await supabase.storage
    .from("pdfs")
    .download(pdfPath);
  if (error) {
    throw error;
  }
  // Convert the file data to a Buffer if needed.
  let buffer;
  if (Buffer.isBuffer(fileData)) {
    buffer = fileData;
  } else if (typeof fileData.arrayBuffer === "function") {
    buffer = Buffer.from(await fileData.arrayBuffer());
  } else {
    throw new Error("Unexpected file data format");
  }
  const pdfData = await pdfParse(buffer);
  return pdfData.text;
}

// ------------------------------
// 4. LANGUAGE MODEL CLASSES
// ------------------------------

// --- 4a. LanguageModelOpenAI using OpenAI’s API
class LanguageModelOpenAI {
  constructor(modelId = "gpt-3.5-turbo", temperature = 0.7) {
    this.modelId = modelId;
    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error(
        "No OpenAI API key found in environment variables, OPENAI_API_KEY"
      );
    }
    this.chatHistory = [];
    this.temperature = temperature;
    const configuration = new Configuration({ apiKey: this.apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  async chat(userInput) {
    this.chatHistory.push({ role: "user", content: userInput });
    let responseText = "";
    try {
      const response = await this.openai.createChatCompletion({
        model: this.modelId,
        messages: this.chatHistory,
        temperature: this.temperature,
      });
      responseText = response.data.choices[0].message.content;
      this.chatHistory.push({ role: "assistant", content: responseText });
    } catch (error) {
      responseText = `An error occurred: ${error}`;
    }
    return responseText;
  }

  setSystemMessage(message) {
    console.log(`Setting system message: ${message}`);
    const systemMessage = { role: "system", content: message };
    if (this.chatHistory.length > 0 && this.chatHistory[0].role === "system") {
      this.chatHistory[0] = systemMessage;
    } else {
      this.chatHistory.unshift(systemMessage);
    }
  }

  printHistory(indent = "\t") {
    let s = "Chat History:\n";
    for (const item of this.chatHistory) {
      s += `${indent}${item.role}: ${item.content}\n`;
    }
    return s;
  }
}

// --- 4b. LanguageModelAzure calling the Azure OpenAI endpoint via axios
class LanguageModelAzure {
  constructor(
    modelId = "gpt4o",
    temperature = 0.7,
    endpoint =
      "https://iai-gpt-finetune.openai.azure.com/openai/deployments/iai-gpt4o/chat/completions?api-version=2024-02-15-preview"
  ) {
    this.modelId = modelId;
    // Either load from environment variables or use the fallback key.
    this.apiKey = process.env.AZURE_OPENAI_KEY || "9ee9bf1e4c844c5490142e19a629d18e";
    if (!this.apiKey) {
      throw new Error(
        "No Azure OpenAI API key found in environment variables, AZURE_OPENAI_KEY"
      );
    }
    this.chatHistory = [];
    this.temperature = temperature;
    this.endpoint = endpoint;
  }

  reset() {
    this.chatHistory = [];
  }

  // A simple chat method that calls the Azure endpoint.
  async chat(userInput, jsonOut = false) {
    this.chatHistory.push({ role: "user", content: userInput });
    let responseText = "";
    try {
      const body = {
        messages: this.chatHistory,
        temperature: this.temperature,
      };
      if (jsonOut) {
        body.response_format = { type: "json_object" };
      }
      const response = await axios.post(this.endpoint, body, {
        headers: {
          "Content-Type": "application/json",
          "api-key": this.apiKey,
        },
      });
      responseText = response.data.choices[0].message.content.trim();
      this.chatHistory.push({ role: "assistant", content: responseText });
    } catch (error) {
      responseText = `An error occurred: ${error}`;
    }
    return responseText;
  }

  setSystemMessage(message) {
    if (!message) return;
    console.log(`Setting system message: ${message}`);
    const systemMessage = { role: "system", content: message };
    if (this.chatHistory.length > 0 && this.chatHistory[0].role === "system") {
      this.chatHistory[0] = systemMessage;
    } else {
      this.chatHistory.unshift(systemMessage);
    }
  }

  printHistory(indent = "\t") {
    let s = "Chat History:\n";
    for (const item of this.chatHistory) {
      s += `${indent}${item.role}: ${item.content}\n`;
    }
    return s;
  }
}

// ------------------------------
// 5. CHATBOT WRAPPER
// ------------------------------
class ChatbotSimple {
  constructor(languageModel) {
    this.languageModel = languageModel;
    this.mission = null;
  }

  setMission(mission) {
    this.mission = mission;
  }

  // Process a prompt. If a PDF path is provided, its text will be extracted and appended.
  async process(prompt, jsonOut = false, pdfPath = null) {
    // Reset the chat history if supported.
    if (typeof this.languageModel.reset === "function") {
      this.languageModel.reset();
    } else {
      this.languageModel.chatHistory = [];
    }
    if (this.mission) {
      this.languageModel.setSystemMessage(this.mission);
    }
    let pdfContent = "";
    if (pdfPath !== null) {
      try {
        pdfContent = await extractTextFromPdf(pdfPath);
      } catch (error) {
        console.error("Error extracting PDF text:", error);
      }
      prompt = `${prompt}\n\nHere is some PDF content:\n${pdfContent}`;
    }
    // Use the appropriate chat method based on the language model.
    if (this.languageModel instanceof LanguageModelAzure) {
      return await this.languageModel.chat(prompt, jsonOut);
    } else {
      return await this.languageModel.chat(prompt);
    }
  }

  // Process a user query to generate map and reduce prompts.
  async processQueryForMapReduce(query) {
    const prompt = `
Given the following user query, formulate a set of map and reduce prompts that would be most relevant to provide an answer from a knowledge base.

Query: ${query}
Provide the output in the following JSON format:
{
    "Map_prompt": "<map_prompt>",
    "Reduce_prompt": "<reduce_prompt>"
}
    `;
    const response = await this.languageModel.chat(prompt);
    return response;
  }
}

// ------------------------------
// 6. HELPER FUNCTIONS FOR THE WORKFLOW
// ------------------------------
async function getPrompt(llmModel, query) {
  const chatbot = new ChatbotSimple(llmModel);
  chatbot.setMission("You are an HR recruiter evaluating resumes.");
  const response = await chatbot.processQueryForMapReduce(query);
  let responseDict;
  try {
    responseDict = JSON.parse(response);
  } catch (error) {
    console.error("Error: Response is not valid JSON", error);
    return null;
  }
  return responseDict;
}

async function mapStepWithLLM(llmModel, pdfPaths, mapPrompt) {
  const extractedFeatures = {};
  const chatbot = new ChatbotSimple(llmModel);
  chatbot.setMission("You are an HR recruiter evaluating resumes.");

  for (const pdfPath of pdfPaths) {
    const prompt = `${mapPrompt}
Provide the output in the following JSON format:
{
  "name": "<name>",
  "skills": ["<skill1>", "<skill2>", "..."],
  "education": "<education_level>",
  "projects": "<name_of_the_project>",
  "experience": { "<position>": "<year_of_experience>" }
}`;
    console.log(`Map prompt: ${prompt}`);
    const response = await chatbot.process(prompt, true, pdfPath);
    try {
      extractedFeatures[pdfPath] = JSON.parse(response);
    } catch (error) {
      extractedFeatures[pdfPath] = {
        score: null,
        comment: "Invalid JSON response",
      };
    }
  }
  return extractedFeatures;
}

async function reduceStepWithLLM(llmModel, features, reducePrompt) {
  const scores = {};
  const chatbot = new ChatbotSimple(llmModel);
  chatbot.setMission("You are a recruiter grading resumes based on provided features.");

  for (const pdfPath in features) {
    const featureSet = JSON.stringify(features[pdfPath], null, 2);
    const prompt = `Based on the following features:
${featureSet}

Provide a score from 1 to 100 based on the ${reducePrompt}
Also provide a short summary comment.
Output the result in JSON:
{
  "score": <number>,
  "comment": "<summary_comment>"
}`;
    console.log(`Reduce prompt: ${prompt}`);
    const response = await chatbot.process(prompt, true);
    try {
      scores[pdfPath] = JSON.parse(response);
    } catch (error) {
      scores[pdfPath] = {
        score: null,
        comment: "Invalid JSON response",
      };
    }
  }
  return scores;
}

async function gradeResumesUsingLLM(pdfPaths, query) {
  // Initialize the LLM model using the Azure version.
  const llmModel = new LanguageModelAzure("gpt4o", 0.7);
  // Generate the map and reduce prompts.
  const mapReducePrompt = await getPrompt(llmModel, query);
  if (!mapReducePrompt) {
    console.error("Error getting map and reduce prompt.");
    return;
  }

  console.log("Extracting features (Map Step)...");
  const features = await mapStepWithLLM(
    llmModel,
    pdfPaths,
    mapReducePrompt.Map_prompt
  );

  console.log("Scoring resumes (Reduce Step)...");
  const scores = await reduceStepWithLLM(
    llmModel,
    features,
    mapReducePrompt.Reduce_prompt
  );

  // Combine and return the results.
  const results = [];
  for (const pdfPath of pdfPaths) {
    results.push({
      file: pdfPath,
      ...(scores[pdfPath] || {}),
    });
  }
  return results;
}

// ------------------------------
// 7. EXPRESS ENDPOINTS
// ------------------------------

// Welcome endpoint.
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hi, Welcome to AI Chatbot" });
});

// Chat endpoint: processes a user prompt (and optionally a PDF path)
app.post("/chat", async (req, res) => {
  const { prompt, pdfPath } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }
  try {
    // Using the Azure model for this example.
    const llm = new LanguageModelAzure("gpt4o", 0.7);
    const chatbot = new ChatbotSimple(llm);
    chatbot.setMission("You are an HR recruiter evaluating resumes.");
    const responseText = await chatbot.process(prompt, false, pdfPath || null);
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Grade endpoint: grades resumes based on a query.
app.post("/", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }
  try {
    const results = await gradeResumesUsingLLM(pdfPaths, query);
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error in /grade endpoint:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// ------------------------------
// 8. START THE SERVER
// ------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`AI server started on port ${PORT}`));
