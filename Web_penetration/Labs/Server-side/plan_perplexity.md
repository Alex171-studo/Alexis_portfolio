## Phase 1: Web Security Foundations

Maîtrisez les attaques web pour attaquer les APIs et pipelines LLM. Suivez cet ordre précis sur PortSwigger Web Security Academy (gratuit) : commencez par tous les labs Authentication (Broken brute-force, 2FA bypass), puis Access Control (tous), Business Logic (Low-level flaw à Encryption oracle), SSRF (tous, priorisez Routing-based), XXE (tous pour document poisoning), Request Smuggling (CL.TE à HTTP/2 tunnelling), CORS (tous), API/GraphQL (tous).[1]

Ressource MDN HTTP : lisez HTTP Messages, Cookies/SameSite, CORS, Cache-Control, Auth headers, Redirects (2 semaines, notes + diagrammes Draw.io).[2]

**Projet 1** : Créez repo GitHub "web-attacks-llm" avec Markdown cheatsheet : 1) Tableau attaques web (SQLi → prompt injection équivalent), 2) Diagrammes Mermaid pour SSRF dans RAG, 3) Script Python Burp-export parser pour logs attaques. Publiez, ajoutez README avec 5 exemples LLM-contextualisés.[3]

## Phase 2: ML/DL Hacker Foundations

Google ML Crash Course : Training/Test Sets, Overfitting/Underfitting, Regularization, Embeddings, Feature Engineering, Decision Boundaries (2-3 semaines, quizzes + notes).[4]

Fast.ai Practical Deep Learning : Lesson 1 (image classifier), Lesson 2 (transfer learning), Lesson 4 (text), Lesson 7 (embeddings). Implémentez mini-classifier MNIST en notebook Colab.[2]

**Projet 2** : Repo "vuln-mnist-classifier" : 1) Jupyter notebook CNN simple (PyTorch, 28x28 input), 2) Ajoutez overfitting intentionnel (no dropout), 3) Testez 100 perturbations random (numpy noise), 4) README avec accuracy drop metrics + screenshots. Poussez sur GitHub.[5]

## Phase 3: Adversarial ML Attacks

MIT 6.S191 Lecture 9 : Regardez adversarial attacks (notes sur FGSM/PGD). IBM ART : Installez pip install adversarial-robustness-toolbox, étudiez notebooks FGSM, PGD, DeepFool, Carlini-Wagner sur MNIST.[6][5]

**Projet 3** : Repo "adversarial-attacks-lab" : 1) Notebook FGSM sur votre MNIST vuln (ART classifier), 2) Notebook PGD (eps=0.3), 3) Notebook CW (confidence=1e-4), 4) Markdown rapport : tableaux accuracy drop, pourquoi (gradients), 10 screenshots perturbations vs originaux.[5]

## Phase 4: LLM Prompt Injection & Red Teaming

OWASP LLM Top 10 : LLM01 Prompt Injection, LLM02 Disclosure, LLM05 Supply Chain (lisez risques + exemples). OpenAI Red Teaming doc + Anthropic "Constitutional AI", "Safety Spec". Installez Promptfoo (npx promptfoo redteam init), configurez GPT/Claude/Llama tests.[7][3]

**Projet 4** : Repo "prompt-injection-suite" : 1) Liste 50 jailbreaks YAML (DAN, roleplay de Promptfoo), 2) Scripts Python HuggingFace (transformers) test Llama3-8B/Mistral-7B (loop prompts, log success), 3) README : tableaux % bypass par modèle, 5 vidéos GIF attaques.[3][7]

## Phase 5: RAG & Vector Store Security

Pinecone/Chroma docs : Embeddings, similarity search, ingestion. LlamaIndex : RAG Fundamentals, Context Injection, Node Poisoning. LangChain : Retrievers/VectorStores.[8][9]

**Projet 5** : Repo "rag-poisoning-lab" : 1) RAG Chroma + LlamaIndex (5 docs CVs, query "best candidate"), 2) Ajoutez doc malicieux (prompt injection blanche texte), 3) Script poison.py (injecte via ingestion), 4) GIF attaque + metrics vuln (Bandit scan outputs), 5) Postprocessor LLMGuard pour mitigation.[10][8]

## Phase 6: Model Extraction/Stealing

Paper "Stealing ML Models via Prediction APIs" + MITRE ATLAS EXTA001/EXTA003 (lisez tactics). Implémentez data-free extraction.[11][6]

**Projet 6** : Repo "model-stealer" : 1) Modèle cible CNN MNIST Flask API, 2) Script querier.py (1000 reqs/class, top-1 labels), 3) Entraînez substitute (PyTorch, synthetic data), 4) Tableau accuracy victim vs stolen (95%+ match), 5) README evasion defenses.[12][11]

## Phase 7: MLOps Pipeline Security

MLflow : Tracking/Models/Registry. Airflow : DAG/Scheduler. DVC : Data Versioning. MITRE ATLAS MLOps attacks (poisoning).[13][14]

**Projet 7** : Repo "vuln-mlops-pipeline" : 1) Airflow DAG (download MNIST, preprocess, train CNN, log MLflow), 2) Poison step (flip 10% labels script), 3) Déployez Docker, montrez accuracy drop, 4) Rapport Markdown impacts + scans.[14][13]

## Phase 8: AI API & Cloud Security

OWASP API Top 10 (freeCodeCamp course : Broken Auth à Unsafe APIs). AWS Free Tier : IAM (roles/policies), S3 (buckets/ACL), API Gateway (auth), Lambda, Bedrock basics (tutos console).[15][16]

**Projet 8** : Repo "ai-api-scanner" (pypi simple) : 1) Python script (requests) : rate-limit test, endpoint enum, adversarial text inject, AWS perms check (boto3), 2) Testez mock Bedrock API, 3) README résultats + --help. Publiez PyPI.[16][15]

## Phase 9: Portfolio GOAT

Réunissez 8 repos GitHub (liens + démos). Créez Notion portfolio : timeline phases, vidéos projets, CV (skills: adversarial ML, RAG poisoning). Article Medium : "Built AI Security Toolkit: 8 Projects from Web to MLOps".

Ce plan forge un profil rare (AI+Sec), junior recherché FAANG/DeepMind (90%+ employabilité post-projets). Accélérez à 18 mois (4h/jour). Suivez ordre strict, publiez tout.