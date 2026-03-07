import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()
key = os.getenv("GOOGLE_API_KEY")
print(f"Key found: {key[:10]}..." if key else "Key NOT found")

llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
print("Calling Gemini...")
try:
    res = llm.invoke([HumanMessage(content="hi")])
    print(f"Response: {res.content}")
except Exception as e:
    print(f"Error: {e}")
