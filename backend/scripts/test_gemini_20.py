import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
print("Calling Gemini 2.0 Flash...")
try:
    res = llm.invoke([HumanMessage(content="hi")])
    print(f"Response: {res.content}")
except Exception as e:
    print(f"Error: {e}")
