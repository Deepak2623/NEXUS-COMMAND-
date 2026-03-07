import os
import asyncio
import sys
from slack_bolt.app.async_app import AsyncApp
from slack_bolt.adapter.socket_mode.async_handler import AsyncSocketModeHandler
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.agents.supervisor import app as supervisor_app

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

# Async Bolt app initialization
app = AsyncApp(token=os.environ.get("SLACK_BOT_TOKEN"))

async def process_nexus_task(query, channel, response_ts=None):
    print(f"📡 Nexus processing Slack query: \"{query[:50]}...\"")
    
    # Run supervisor pipeline asynchronously
    result = await supervisor_app.ainvoke({"messages": [HumanMessage(content=query)]})
    
    final_output = result.get("final_output", "No response generated.")
    audit_hash = result.get("audit_hash", "no-hash")
    routed_to = result.get("routed_to", "nexus_node")
    
    # Format slack message
    slack_response = f"*{final_output}*\n\n_Node: {routed_to.upper()}_ | _Hash: {audit_hash[:12]}_"
    
    # Post back to Slack
    await app.client.chat_postMessage(
        channel=channel,
        text=slack_response,
        thread_ts=response_ts 
    )

@app.event("app_mention")
async def handle_app_mentions(event, say):
    text = event.get("text")
    import re
    query = re.sub(r"<@.*?>", "", text).strip()
    await process_nexus_task(query, event.get("channel"), event.get("ts"))

@app.message()
async def handle_message(event, say):
    if event.get("bot_id"):
        return
        
    channel = event.get("channel")
    default_channel = os.environ.get("SLACK_DEFAULT_CHANNEL")
    channel_type = event.get("channel_type")
    
    # Process if it's in the designated channel or a direct message
    if channel == default_channel or channel_type == "im":
        query = event.get("text")
        await process_nexus_task(query, channel, event.get("ts"))

async def main():
    app_token = os.environ.get("SLACK_APP_TOKEN")
    if not app_token or not app_token.startswith("xapp-"):
        print("❌ Error: SLACK_APP_TOKEN is missing or invalid. Two-way communication requires a Socket Mode token (starting with xapp-).")
        return
    
    print("🚀 Nexus Command Slack Listener starting (Async Socket Mode)...")
    handler = AsyncSocketModeHandler(app, app_token)
    await handler.start_async()

if __name__ == "__main__":
    asyncio.run(main())
