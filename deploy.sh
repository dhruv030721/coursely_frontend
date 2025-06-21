#!/bin/bash

echo "🚀 Deploying Frontend"

# Load GitHub token from environment securely
GITHUB_TOKEN="ghp_xxxxxxxxxxxxx"

# Pull using token in URL (don't log it!)
git -c credential.helper= pull https://$GITHUB_TOKEN@github.com/yourusername/your-repo.git

npm install
npm run build

pm2 restart 1

echo "✅ Deployment Finished"
