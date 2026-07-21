export interface Project {
  slug: string
  title: string
  category: string
  year: number
  hero: string          // /projects/[slug]/hero.svg
  tags: string[]
  summary: string       // 1 sentence for card
  problem: string       // paragraph
  architecture: string  // paragraph
  outcomes: string[]    // 3–5 bullet strings
  tech: string[]
  githubUrl: string
  readmeContent: string
}

export const projects: Project[] = [
  {
    slug: "tc-guard",
    title: "T&C Guard",
    category: "AI Browser Extension & Compliance",
    year: 2026,
    hero: "/projects/tc-guard/hero.svg",
    tags: ["Gemini API", "Chrome Extension", "DOM Parsing", "AI Risk Analysis"],
    summary: "An AI-driven Chrome Extension utilizing the Gemini API to conduct rapid risk analysis and token-optimized DOM parsing on legal agreements.",
    problem: "Terms and Conditions agreements are notoriously dense, often spanning thousands of words designed to obscure data privacy collection details. Users agree to them blindly because reading them takes hours. The objective was to design a browser extension that could instantly extract legal text from any privacy policy DOM tree, run a token-efficient risk audit using LLMs, and present compliance scores in a clean, legible dashboard.",
    architecture: "The extension runs a lightweight script in the browser sandbox to inspect the active DOM. It filters out boilerplate headers/footers using local heuristic scoring and packages the relevant privacy node text. This text is sent to the Gemini 2.5 Flash API with structure instructions. Analytical results are rendered locally inside a React extension panel featuring Recharts dashboards and compliance reports.",
    outcomes: [
      "Built an AI-driven Chrome Extension utilizing the Gemini API to conduct rapid risk analysis alongside token-optimized DOM parsing on legal agreements.",
      "Formulated a multi-layer fallback scoring engine incorporating local heuristics, paired with an interactive React dashboard featuring Recharts analytics and PDF compliance exporting.",
      "Incorporated intelligent page detection through URL and DOM evaluation, ensuring scans trigger exclusively on valid privacy policies."
    ],
    tech: ["React", "Node.js", "Gemini 2.5 Flash", "Express.js", "Vite", "Recharts", "Chrome Extension API"],
    githubUrl: "https://github.com/AdonisJeswin/TCGuard",
    readmeContent: `# T&C Guard 🛡️

An AI-driven Chrome Extension utilizing the Google Gemini 2.5 Flash API to conduct rapid risk analysis and token-optimized DOM parsing on legal privacy agreements.

## Key Features
- **DOM Node Parser**: Custom browser scripts to extract valid privacy text nodes and filter out layout wrappers/boilerplate headers.
- **AI Scoring Engine**: Interfaces with Gemini 2.5 Flash to analyze clauses for cookie storage, data selling, and auto-renewals.
- **Analytics Dashboard**: Interactive React charts using Recharts for historical compliance trend tracking.
- **PDF Compliance Exporter**: Exports audit details in a high-fidelity formatted report for offline record keeping.

## Technology Stack
- **Extension UI**: React, Vite, Tailwind CSS, Recharts
- **Extension Logic**: Chrome Extensions Manifest V3 API
- **Model Endpoint**: Node.js, Express, Gemini 2.5 Flash SDK

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- NPM or PNPM

### Installation
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/AdonisJeswin/TCGuard.git
   cd TCGuard
   \`\`\`
2. Install package dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`
3. Create a \`.env.local\` file in the root folder and add your Google Gemini API Key:
   \`\`\`env
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`
4. Start the Vite bundler in watch mode:
   \`\`\`bash
   pnpm run dev
   \`\`\`
5. Open Chrome, go to \`chrome://extensions/\`, enable "Developer mode", click "Load unpacked", and select the \`dist\` folder.
`
  },
  {
    slug: "biochain-ai",
    title: "BioChain AI 2.0",
    category: "Web3 Healthcare Platform",
    year: 2026,
    hero: "/projects/biochain-ai/hero.svg",
    tags: ["Solidity", "FastAPI", "IPFS", "MetaMask Web3"],
    summary: "A four-tier distributed healthcare platform supporting Web3 authentication, IPFS-persisted encrypted medical records, and Gemini-based clinical assistance.",
    problem: "Patient medical records are fragmented across proprietary vendor silos, creating major security vulnerabilities and hindering collaborative care. Furthermore, managing explicit patient consent for data sharing is legally complex and prone to abuse. The goal was to build a decentralized health records workspace where patients own their data, authorize provider access cryptographically, and consult an AI agent in a secure interface.",
    architecture: "The system utilizes Solidity Smart Contracts deployed via Hardhat to enforce consent rules and record audit logs on-chain. Sensitive health records are encrypted client-side and saved to IPFS via Pinata. The backend uses FastAPI to coordinate vitals telemetry streams over WebSockets and interfaces with the Gemini API to generate clinical summaries, with MetaMask managing user authentication.",
    outcomes: [
      "Programmed a four-tier distributed healthcare platform supporting distinct user roles, fortified by MetaMask Web3 authentication and OTP two-factor verification.",
      "Authored Solidity Smart Contracts on Hardhat to manage patient consent, securely persisting encrypted medical records onto IPFS via Pinata.",
      "Embedded a Google Gemini API clinical assistant while establishing patient vitals monitoring through secure WebSocket streams."
    ],
    tech: ["React 19", "Vite", "FastAPI", "Solidity", "Hardhat", "IPFS / Pinata", "MetaMask", "WebSockets", "Docker"],
    githubUrl: "https://github.com/AdonisJeswin/BioChainAI",
    readmeContent: `# BioChain AI 2.0 🏥

A decentralized, four-tier electronic health record (EHR) workspace. Securely manages patient consent rules using Solidity Smart Contracts, stores encrypted records in IPFS, and integrates a Gemini AI clinical diagnostic assistant.

## Features
- **Web3 Login**: Client-side authentication via MetaMask cryptographic signatures.
- **Smart Contract Verification**: Deployed Solidity contracts to regulate access credentials for doctors and researchers.
- **IPFS Storage**: Client-side AES-256 encrypted records uploaded to decentralized IPFS via Pinata API.
- **WebSocket Telemetry**: Stream live simulated patient heart rate and oxygen metrics to the workspace.
- **Clinical Copilot**: Integrated Gemini model to compile patient history records into medical summaries.

## Getting Started

### Installation
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/AdonisJeswin/BioChainAI.git
   cd BioChainAI
   \`\`\`
2. Install client dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`
3. Compile Ethereum Smart Contracts:
   \`\`\`bash
   npx hardhat compile
   \`\`\`
4. Run smart contract local node:
   \`\`\`bash
   npx hardhat node
   \`\`\`
5. Deploy contract to local network:
   \`\`\`bash
   npx hardhat run scripts/deploy.js --network localhost
   \`\`\`
6. Set up FastAPI server:
   \`\`\`bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   \`\`\`
`
  },
  {
    slug: "construx",
    title: "Construx",
    category: "Full-Stack Field Ops Suite",
    year: 2025,
    hero: "/projects/construx/hero.svg",
    tags: ["Next.js", "React Native", "Facial Recognition", "Razorpay"],
    summary: "A cross-platform field operations web and mobile application featuring geofence-validated attendance tracking and Razorpay invoicing.",
    problem: "Field construction sites struggle with manual logs, attendance fraud, and slow paper-based invoicing. Managing field operators, tracking materials inventory, and verifying workers' attendance in real-time requires a unified platform that operates reliably across both mobile and desktop screens.",
    architecture: "Construx is structured as a Next.js web application for managers and a React Native (Expo) app for field staff. Attendance is verified by evaluating geo-location boundaries and running DeepFace facial recognition verification. The Node.js/Express backend integrates Razorpay for processing milestones, while MongoDB serves as the database.",
    outcomes: [
      "Developed a cross-platform web and mobile application featuring three distinct dashboards tailored for field operations involving managers, engineers, and workers.",
      "Implemented geofence-validated attendance tracking empowered by DeepFace facial recognition, ensuring location-aware identity verification.",
      "Integrated the Razorpay payment gateway to process milestone invoicing, automate purchase orders, and monitor inventory updates."
    ],
    tech: ["Next.js", "React Native (Expo)", "Node.js", "Express.js", "MongoDB", "Razorpay", "DeepFace API", "JWT"],
    githubUrl: "https://github.com/suhasarali/construx",
    readmeContent: `# Construx 🏗️

A comprehensive cross-platform field operations platform. Employs location-aware geofencing and DeepFace facial recognition verification on mobile check-ins, backed by a manager invoicing panel.

## Features
- **Geofenced Check-In**: Verifies mobile worker coordinates against site-specific radius boundaries.
- **Biometric Attendance**: Leverages DeepFace AI neural networks for facial authentication.
- **Invoicing System**: Integrates Razorpay APIs to execute invoicing releases on milestone approvals.
- **Multi-Role Workspace**: Dashboards tailored specifically for Managers, Field Engineers, and Site Workers.

## Getting Started

### Installation
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/suhasarali/construx.git
   cd construx
   \`\`\`
2. Install root node modules:
   \`\`\`bash
   pnpm install
   \`\`\`
3. Run the backend server (Node.js/Express):
   \`\`\`bash
   cd backend
   pnpm dev
   \`\`\`
4. Run the web frontend (Next.js):
   \`\`\`bash
   cd frontend
   pnpm dev
   \`\`\`
5. Start the mobile Expo app:
   \`\`\`bash
   cd mobile
   npx expo start
   \`\`\`
`
  },
  {
    slug: "guardian-ag",
    title: "GuardianAG",
    category: "AI Threat Intelligence Platform",
    year: 2026,
    hero: "/projects/guardian-ag/hero.svg",
    tags: ["XGBoost", "FastAPI", "SHAP", "Distributed Systems"],
    summary: "A distributed microservices dashboard integrating six machine learning threat models to detect phishing, malicious URLs, and deepfakes.",
    problem: "Digital security is fragmented; users need to navigate different tools to check URLs, emails, media signatures, and behavior anomalies. Advanced ML threat models require high-performance Python backends, making them difficult to aggregate and orchestrate under a single, unified client-side interface for non-technical users.",
    architecture: "GuardianAG utilizes a distributed microservices layer where Flask and FastAPI servers host specialized XGBoost, Isolation Forest, and Transformer models. A Node.js proxy handles request orchestration and aggregates model scores. The real-time visual client is built in React, routing logs to administrative feeds with SHAP explainability charts.",
    outcomes: [
      "Designed a distributed microservices dashboard aggregating six specialized machine learning threat models into a unified interface.",
      "Deployed XGBoost and Hugging Face classifiers utilizing Isolation Forest algorithms, achieving consensus scoring across 66 external vendor feeds.",
      "Configured SHAP explainability techniques and adaptive thresholds that automatically recalibrate every 50 requests, significantly reducing false positive rates."
    ],
    tech: ["Python", "FastAPI", "React", "Node.js", "XGBoost", "SHAP", "HuggingFace"],
    githubUrl: "https://github.com/krishal356/GuardianAG",
    readmeContent: `# GuardianAG 🛡️

GuardianAG is a multi-modular security ecosystem designed to provide a comprehensive layer of protection against modern digital threats. By aggregating multiple specialized AI/ML models into a single, intuitive dashboard, GuardianAG empowers users to identify and mitigate risks in real-time.

## Key Modules & Capabilities
1. **Malicious URL Detection**: Uses an XGBoost-driven ML model to analyze entropy, spoofing signatures, and typosquatting with 66+ VirusTotal vendors consensus.
2. **AI Content & Deepfake Detection**: Analyzes media and text for AI fingerprints to identify synthesized content.
3. **Anomalous Behavior Detection (IDS)**: Combines Isolation Forest and Autoencoders to detect network anomalies with SHAP explainability.
4. **Phishing Email Detection**: Employs HuggingFace Transformer models for advanced semantic classification.
5. **Cyber Assistant Chatbot**: Security chatbot advisor powered by LLM models.

## Technology Stack
- **Languages**: Python 3.9+, Node.js 18+
- **Frameworks**: Flask, FastAPI, React 19 (Vite)
- **AI/ML**: Scikit-Learn, Transformers (HuggingFace), XGBoost, SHAP
- **UI/UX**: TailwindCSS, Framer Motion, Recharts

## Getting Started

### Installation
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/krishal356/GuardianAG.git
   cd GuardianAG
   \`\`\`
2. Launch the Platform:
   - **Windows**: Double-click on \`start_all.bat\`. This will automatically start all backend and frontend services.
   - **Linux/Mac**: Run \`setup_and_start.sh\`.
3. Open your browser to: **http://localhost:5173**
`
  }
];
