# Clin Biosciences Interactive Chatbot

## 1. Introduction
The Clin Biosciences Interactive Chatbot is a rule-based AI prototype designed to answer user queries about the company, its services, locations, and other key information using natural language processing without relying on external Large Language Models (LLMs).

## 2. Problem Statement
Users require quick, on-demand, and interactive access to basic company information without navigating through complex websites or waiting for human agents.

## 3. Proposed Solution
A rule-based chatbot prototype consisting of a React frontend and a Django backend. It processes natural language queries by normalizing text, correcting common typos, and detecting intents to return relevant predefined responses.

## 4. Objectives
- Natural language interaction.
- Basic spelling mistake handling.
- Intent detection.
- Company information retrieval from a static knowledge base.
- Interactive and modern UI with a typewriter effect.

## 5. Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Python, Django, Django REST Framework

## 6. Architecture
1. **React UI**: Captures user input and displays chat.
2. **Axios POST**: Sends message to Django backend `/api/chat/`.
3. **Normalization**: Lowercases text, removes extra spaces and punctuation.
4. **Spelling Correction**: Handles typos using a static dictionary and aliases.
5. **Intent Detection**: Maps keywords to intents (e.g., SERVICES, CONTACT).
6. **Similarity Matching**: Fallback mechanism for intent detection using word overlap.
7. **Knowledge Base**: Looks up the intended response in a predefined Python dictionary.
8. **Response Generation**: Returns the answer to the frontend where it is typed out character by character.

## 7. API Documentation

### `POST /api/chat/`
**Request:**
```json
{
    "message": "what servises does clin bioscince provide"
}
```

**Response:**
```json
{
    "success": true,
    "intent": "SERVICES",
    "normalized_message": "what services does clin biosciences provide",
    "reply": "Clin Biosciences provides the following services:\n- **Clinical Trial Management**: Comprehensive management of Phase I-IV clinical trials ensuring regulatory compliance and data integrity.\n- **Regulatory Affairs**: Expert guidance and submissions to regulatory authorities including FDA, EMA, and other global health agencies.\n- **Data Management & Biostatistics**: Robust clinical data management, statistical analysis, and reporting services.\n- **Medical Writing**: Preparation of clinical study protocols, investigator brochures, clinical study reports, and regulatory documents.\n- **Quality Assurance**: Independent audits, GCP training, and development of quality management systems.\n"
}
```

## 8. Testing
- The NLP pipeline (normalization, spell correction, intent, similarity) is tested using Django `TestCase`.
- The `/api/chat/` endpoint is tested for valid queries, unknown queries, and empty payloads.

## 9. Limitations
- Uses a static JSON/Python knowledge base.
- No external LLMs, leading to rigid conversation flows.
- Limited typo correction (only handles predefined variations and simple overlapping words).
- Prototype-level UI without authentication, database, or conversation history tracking.

## 10. Future Enhancements
- Integration with external LLMs (e.g., OpenAI, Gemini) and RAG for dynamic responses.
- Database integration (PostgreSQL or MongoDB) to persist chat histories.
- Comprehensive spelling correction models.

## AI/LLM Documentation
* **AI tool used**: Google Deepmind Antigravity Agent (Gemini 3.1 Pro)
* **Purpose of using the tool**: Bootstrapping the initial project structure, UI components, and NLP pipeline algorithms.
* **Prompt used**: "Create a basic working prototype of an Interactive Company Chatbot for Clin Biosciences..."
* **AI-generated code/content**: The entire codebase was generated based on the architectural instructions.
* **Changes made to the generated code**: Code was separated into modular services (`normalization.py`, `spell_correction.py`, etc.) for maintainability, and tests were added to ensure the rule-based logic behaves correctly.
* **Testing performed after modification**: Executed the `TestCase` suite and performed manual frontend testing.
