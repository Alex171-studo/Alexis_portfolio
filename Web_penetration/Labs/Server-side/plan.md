
# 🔱 **ROADMAP DU GOAT — LLM / AI SECURITY (VERSION ULTIME & ULTRA DÉTAILLÉE)**

### Durée : 24–36 mois (tu peux accélérer)

Full gratuit. Pas de vide. Pas de flou. **Tout est ciblé.**

---

# 🟥 **PHASE 1 — Les Fondations Web Security (OBLIGATOIRE)**

🎯 Objectif : maîtriser les primitives d’attaque → nécessaires pour les attaques LLM/RAG/API IA.

## **1.1 — HTTP + Web complète**

**Ressource obligatoire :**
➡️ MDN Web Docs — *HTTP: The Definitive Guide (gratuit)*
Sections exactes à apprendre :

* HTTP Messages
* Cookies, SameSite
* CORS
* Cache-Control
* Authentication headers
* Redirects

**Durée :** 2 semaines
**Production :** notes + schémas.

---

## **1.2 — PortSwigger (ordre exact des labs à faire)**

🎯 Va du plus utile pour LLM Security au plus avancé.

1. Authentication labs (TOUS)
2. Access control labs (TOUS)
3. Business Logic labs (TOUS)
4. SSRF labs → utiles pour RAG breakouts
5. XXE → vecteurs de documents empoisonnés
6. Request smuggling → attaques pipeline IA
7. Desync lab
8. CORS labs
9. API labs (GraphQL labs inclus)

**Ressource :** PortSwigger Web Academy (gratuit)
**Production :**
→ Repos GitHub “PortSwigger Notes” avec schémas d’attaques que TU COMPRENDS.

---

## **1.3 — Projet n°1 (obligatoire) : Web Attacks Cheatsheet pour LLM**

🎯 Ton premier repo GitHub “@TonPseudo – Web Attacks for LLM Security”.

**Contenu exact :**

* résumé des attaques web
* pattern d’injection
* équivalents en prompt injection
* diagrammes simples

---

# 🟧 **PHASE 2 — Fondations IA/ML (orienté hacker)**

🎯 Objectif : comprendre juste ce qu’il faut du ML pour casser les modèles.

## **2.1 — Machine Learning (ordre exact)**

➡️ Google ML Crash Course
Étudier les sections exactes :

1. Training and Test Sets
2. Overfitting & Underfitting
3. Regularization
4. Embeddings
5. Feature Engineering
6. Decision Boundaries

Durée : 2–3 semaines.

---

## **2.2 — Deep Learning (ordre exact)**

➡️ Fast.ai “Practical Deep Learning for Coders” (gratuit)
Suivre absolument :

* Lesson 1 → image classifier
* Lesson 2 → transfer learning
* Lesson 4 → text classification
* Lesson 7 → embeddings

**Production :**
→ notes + un mini-classifier sur MNIST (auto)

---

## **2.3 — Projet n°2 : Mini-Classifier MNIST + Vulnérabilité**

Créer un modèle **intentionnellement vulnérable**.

Ce que TU dois livrer :

* notebook Jupyter
* entraînement d’un modèle small CNN
* tests sur perturbations random
* upload GitHub
* documentation claire “why this model is vulnerable”

---

# 🟨 **PHASE 3 — Adversarial ML (attaque de modèles)**

🎯 Objectif : entrer dans la vraie sécurité IA

## **3.1 — Attaques adversariales (ordre exact)**

➡️ MIT 6.S191 (gratuit)
Regarder :

* Lecture 9 (Adversarial Attacks)

➡️ IBM Adversarial Robustness Toolbox (ART)
Étudier :

* FGSM
* PGD
* DeepFool
* Carlini-Wagner (CW)

---

## **3.2 — Projet n°3 : Adversarial Attack Lab**

Repo obligatoire GitHub : “adversarial-attacks-lab”

Doit contenir :

* notebook FGSM sur ton modèle MNIST
* notebook PGD
* notebook CW
* rapports Markdown expliquant :

  * pourquoi ça marche
  * comment ça trompe un modèle
  * screenshots d’images adversariales

---

# 🟩 **PHASE 4 — Prompt Injection & LLM Red Teaming**

🎯 Objectif : casser des LLM.

## **4.1 — Prompt Injection (ordre exact d’apprentissage)**

➡️ OWASP LLM Top 10
Lire éléments :

* LLM01 : Prompt Injection
* LLM02 : Data Leakage
* LLM05 : Supply Chain

➡️ OpenAI “Prompt Injection Red Teaming” Document (gratuit)

➡️ Anthropic Research Papers (gratuit)
Lire dans cet ordre :

* “Constitutional AI”
* “Safety Spec”
* “Prompting Strategies”

---

## **4.2 — Projet n°4 : Prompt Injection Attack Suite**

Créer un dossier GitHub : “prompt-injection-suite”

Contenu EXACT :

* liste de 50 prompts jailbreaks classés
* tests sur modèles open-source :

  * Llama 3 8B
  * Mistral 7B
* scripts Python utilisant HuggingFace pour automatiser les tests
* un README complet

---

# 🟦 **PHASE 5 — RAG Security & Vector Stores (indispensable)**

🎯 RAG = système n°1 des entreprises → énorme surface d’attaque.

## **5.1 — Vector Stores**

Étudier :
➡️ Pinecone docs (gratuit)
➡️ Chroma DB docs
Sections à apprendre :

* embeddings
* similarity search
* ingestion pipeline

---

## **5.2 — RAG Attacks (ordre exact)**

➡️ LlamaIndex documentation
Lire :

* “RAG Fundamentals”
* “Context Injection Attacks”
* “Node poisoning”

➡️ LangChain docs
Lire :

* “Retrievers”
* “VectorStores”

---

## **5.3 — Projet n°5 : RAG Poisoning Lab**

Repo GitHub avec :

* un petit RAG utilisant Chroma
* ajouter un document malicieux
* démontrer contamination des réponses
* script pour automatiser l’empoisonnement
* vidéo ou gif montrant l’attaque

**Résultat :**
Ton portfolio décolle.

---

# 🟪 **PHASE 6 — Model Extraction + Stealing**

🎯 Objectif : reproduire un modèle fermé → compétence de niche

## Ressources gratuites :

➡️ Paper : “Stealing Machine Learning Models via Prediction APIs”
➡️ MITRE ATLAS database
(Tactiques EXTA001 et EXTA003)

---

## Projet n°6 : Model Stealer

Repo GitHub :

* créer un modèle cible (petit CNN)
* écrire un script pour envoyer des milliers de requêtes
* entraîner un “volé” modèle
* comparer accuracy

**Très fort niveau.**

---

# 🟫 **PHASE 7 — Pipeline ML Security (MLOps)**

## Étudier gratuitement :

➡️ MLflow docs
(“Tracking”, “Models”, “Registry”)
➡️ Airflow docs
(“DAG”, “Scheduler”, “Operators”)
➡️ DVC docs
(“Data Versioning”)

---

## Projet n°7 : Pipeline ML vulné + exploitation

Créer un pipeline simple :

1. Airflow DAG
2. téléchargement dataset
3. preprocessing
4. entraînement
5. sauvegarde modèle MLflow

Puis :
➡️ empoisonner une étape du pipeline
➡️ montrer l’impact

---

# 🟫 PHASE 8 — API IA & Cloud Security

Apprendre gratuitement :

### API :

➡️ OWASP API Top 10
➡️ Postman Learning Center

### Cloud :

➡️ AWS Authorised Free Learning
Modules exacts :

* IAM
* S3 Security
* API Gateway
* Lambda
* Bedrock basics

---

## Projet n°8 : Scanner sécurité API IA

Créer un outil Python :

* tester rate limiting
* détecter endpoints non protégés
* injecter texte adversarial
* vérifier permissions AWS
* publier comme package PyPI minimal

---

# 🟫 PHASE 9 — Construction du Portfolio “GOAT”

Tu réunis tout dans :
📌 Un GitHub propre
📌 Un portfolio Notion
📌 Un CV orienté AI Security
📌 Un article Medium :
“How I Built a Full AI Security Offensive Toolkit — from Scratch”

