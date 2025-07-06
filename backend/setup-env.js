#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 MongoDB Atlas Environment Setup\n');

// Check if .env file already exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.question('Do you want to overwrite it? (y/N): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            createEnvFile();
        } else {
            console.log('Setup cancelled.');
        }
        readline.close();
    });
} else {
    createEnvFile();
}

function createEnvFile() {
    console.log('\n📝 Please provide the following information:');
    console.log('(Press Enter to use default values)\n');
    
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const questions = [
        {
            name: 'MONGODB_URI',
            message: 'MongoDB Atlas URI:',
            required: true,
            placeholder: 'mongodb+srv://username:password@cluster.mongodb.net/chatApp?retryWrites=true&w=majority'
        },
        {
            name: 'PORT',
            message: 'Server Port:',
            default: '8080'
        },
        {
            name: 'NODE_ENV',
            message: 'Environment:',
            default: 'development'
        },
        {
            name: 'SECRET',
            message: 'JWT Secret:',
            default: 'your_super_secret_jwt_key_change_this_in_production'
        },
        {
            name: 'FRONTEND_URL',
            message: 'Frontend URL:',
            default: 'http://localhost:3000'
        }
    ];
    
    const answers = {};
    let currentQuestion = 0;
    
    function askQuestion() {
        if (currentQuestion >= questions.length) {
            writeEnvFile(answers);
            return;
        }
        
        const question = questions[currentQuestion];
        const defaultText = question.default ? ` (default: ${question.default})` : '';
        
        readline.question(`${question.message}${defaultText}: `, (answer) => {
            if (answer.trim() === '' && question.default) {
                answers[question.name] = question.default;
            } else if (answer.trim() === '' && question.required) {
                console.log('❌ This field is required!');
                askQuestion();
                return;
            } else {
                answers[question.name] = answer.trim() || question.default;
            }
            
            currentQuestion++;
            askQuestion();
        });
    }
    
    askQuestion();
}

function writeEnvFile(answers) {
    const envContent = `# Server Configuration
PORT=${answers.PORT}
NODE_ENV=${answers.NODE_ENV}

# MongoDB Atlas Configuration
MONGODB_URI=${answers.MONGODB_URI}

# JWT Secret
SECRET=${answers.SECRET}

# CORS Configuration
FRONTEND_URL=${answers.FRONTEND_URL}
`;

    try {
        fs.writeFileSync(envPath, envContent);
        console.log('\n✅ .env file created successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Verify your MongoDB Atlas connection string');
        console.log('2. Start the server: npm run dev');
        console.log('3. Check the console for connection status');
        console.log('\n📖 For detailed setup instructions, see: MONGODB_ATLAS_SETUP.md');
    } catch (error) {
        console.error('❌ Error creating .env file:', error.message);
    }
} 