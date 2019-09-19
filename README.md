# ZeeBot

### You will need a .env under /backend to run
This is to keep any configuration seperate from the code
```
DATABASE_PATH=mongodb://localhost:27017/zeebot
PORT=8000
FACEBOOK_API_URL=https://graph.facebook.com
```

### Run Backend
Once you have created and configured you .env file, you can run the backend
```
cd backend
npm install
npm start
```

### Run Frontend in Development Mode
```
cd frontend
npm install
npm start
```

### Build Frontend
```
cd frontend
npm install
npm run build
```
