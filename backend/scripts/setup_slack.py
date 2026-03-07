import os
import sys
from dotenv import load_dotenv, set_key
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

def setup_slack():
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
    load_dotenv(env_path)
    
    token = os.getenv("SLACK_BOT_TOKEN")
    if not token:
        print("❌ Error: SLACK_BOT_TOKEN not found in .env")
        return

    client = WebClient(token=token)
    channel_name = "nexus-command"
    channel_id = os.getenv("SLACK_DEFAULT_CHANNEL")

    # If channel_id exists, verify it
    if channel_id:
        try:
            client.conversations_info(channel=channel_id)
            print(f"✅ Slack channel {channel_name} ({channel_id}) already exists and is valid.")
            return
        except SlackApiError:
            print(f"⚠️ Channel {channel_id} not found or inaccessible. Creating a new one...")

    # Try to find existing channel by name (check public channels first)
    try:
        response = client.conversations_list(types="public_channel,private_channel")
        for channel in response["channels"]:
            if channel["name"] == channel_name:
                channel_id = channel["id"]
                print(f"✅ Found existing channel: {channel_name} ({channel_id})")
                set_key(env_path, "SLACK_DEFAULT_CHANNEL", channel_id)
                # Try to join it if we haven't already
                try:
                    client.conversations_join(channel=channel_id)
                except SlackApiError:
                    pass
                return
    except SlackApiError as e:
        print(f"⚠️ Error listing channels: {e}")
        if "missing_scope" in str(e):
             print(f"ℹ️ Tip: Your SLACK_BOT_TOKEN needs these scopes: 'channels:read', 'groups:read', 'channels:write', 'groups:write', 'chat:write', 'im:read', 'app_mentions:read'")

    # Create new channel
    try:
        print(f"🔨 Creating new channel: {channel_name}...")
        response = client.conversations_create(name=channel_name)
        channel_id = response["channel"]["id"]
        print(f"✅ Created channel: {channel_name} ({channel_id})")
        
        # Update .env
        set_key(env_path, "SLACK_DEFAULT_CHANNEL", channel_id)
        print(f"💾 Updated SLACK_DEFAULT_CHANNEL in .env")
        
    except SlackApiError as e:
        err = e.response["error"]
        if err == "name_taken":
            print(f"⚠️ Channel name '{channel_name}' is already taken but I cannot see it. It might be private.")
            print(f"ℹ️ Action: Please manually invite the bot to the '#{channel_name}' channel.")
        elif err == "missing_scope":
            print(f"❌ Scopes Missing: Your SLACK_BOT_TOKEN lacks 'channels:write' (to create) or 'channels:read' (to list).")
            print(f"ℹ️ Manual Fix: Create a channel named '#{channel_name}' in Slack, invite your bot, and update SLACK_DEFAULT_CHANNEL in .env with its ID.")
        else:
            print(f"❌ Error creating channel: {e}")

if __name__ == "__main__":
    setup_slack()
