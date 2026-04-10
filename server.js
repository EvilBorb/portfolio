const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


const forumConfig = {
    host: "discord.com",
    channelId: process.env.CHANNEL_ID,
    myUserId: process.env.MY_USER_ID,
    botToken: process.env.BOT_TOKEN
};


const https = require('https');


function postToForum(postTitle, postContent, usernameSender) {
    const postSource = "portfolio";
    
    const payload = JSON.stringify({
        name: postTitle,
        message: {
            content: `<@${forumConfig.myUserId}> \nFrom: ${usernameSender}\nSource: ${postSource}\n\n${postContent}`
        }
    });

    const options = {
        hostname: forumConfig.host,
        path: `/api/v10/channels/${forumConfig.channelId}/threads`,
        method: 'POST',
        headers: {
            'Authorization': `Bot ${forumConfig.botToken}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    const request = https.request(options, (response) => {
        let responseData = "";
        response.on('data', (chunk) => { responseData += chunk; });
        response.on('end', () => {
            process.stdout.write("Forum post created successfully sir\n");
        });
    });

    request.on('error', () => {
        console.log('boeeeee')
        process.stdout.write("Failed to create forum post sir\n");
    });

    request.write(payload);
    request.end();
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.post('/api/contact', (req, res) => {
    console.log('email request!')
    let body = req.body
    if (!body.mail || !body.title || !body.sender) {
        return res.status(400).json({ error: 'Missing data' });
    }
    console.log('got through!')
    postToForum(body.title, body.mail, body.sender)

    res.json({ email: 'placeholder' });
});

