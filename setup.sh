#!/bin/bash

echo "Setting up Naresh Portfolio Project..."
echo

echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi

echo
echo "Installing backend dependencies..."
cd ../backend
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi

cd ..
echo
echo "Setup complete!"
echo
echo "Next steps:"
echo "1. Copy .env.example to .env in both frontend and backend folders"
echo "2. Fill in your environment variables"
echo "3. Run 'npm run dev:backend' in one terminal"
echo "4. Run 'npm run dev:frontend' in another terminal"
echo