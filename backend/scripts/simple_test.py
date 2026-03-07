print("Starting simple test...")
import os
print("OS imported")
from dotenv import load_dotenv
print("Dotenv imported")
load_dotenv()
print("Env loaded")
print(f"Key: {os.getenv('GOOGLE_API_KEY')[:5] if os.getenv('GOOGLE_API_KEY') else 'NONE'}")
