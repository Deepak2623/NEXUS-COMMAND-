import os
from typing import List
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader, TextLoader

_vector_db = None

def get_vector_db():
    global _vector_db
    if _vector_db is None:
        # 1. Initialize Embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        
        # 2. Check for local persistence
        persist_dir = os.path.join(os.path.dirname(__file__), "../../faiss_index")
        
        if os.path.exists(persist_dir):
            _vector_db = FAISS.load_local(persist_dir, embeddings, allow_dangerous_deserialization=True)
        else:
            # 3. Build from knowledge folder
            knowledge_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../knowledge"))
            if not os.path.exists(knowledge_path):
                os.makedirs(knowledge_path)
            
            loader = DirectoryLoader(knowledge_path, glob="**/*.md", loader_cls=TextLoader)
            docs = loader.load()
            
            if not docs:
                # If empty, create a dummy DB to prevent errors
                from langchain_core.documents import Document
                docs = [Document(page_content="Nexus Knowledge Base Initialized.", metadata={"source": "system"})]
            
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
            chunks = text_splitter.split_documents(docs)
            
            _vector_db = FAISS.from_documents(chunks, embeddings)
            _vector_db.save_local(persist_dir)
            
    return _vector_db

async def search_knowledge(query: str, k: int = 3) -> str:
    """Vector search retrieval."""
    try:
        db = get_vector_db()
        results = db.similarity_search(query, k=k)
        context = "\n\n".join([f"Source: {r.metadata.get('source')}\n{r.page_content}" for r in results])
        return context
    except Exception as e:
        print(f"RAG Error: {e}")
        return "Internal Knowledge retrieval failed."
