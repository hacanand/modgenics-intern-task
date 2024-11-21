import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/captcha', (req, res) => {
    try {
        const captcha = Array.from({ length: 8 }, () => {
            const type = Math.floor(Math.random() * 4);
            switch (type) {
                case 0:
                    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                case 1:
                    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                case 2:
                    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
                case 3:
                    return "!@#$%^&*"[Math.floor(Math.random() * 8)];
            }
        }).join("");
        res.send({ captcha });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/api/verify', (req, res) => {
    try {
        const { captcha, input } = req.body;
        if (captcha === input) {
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}   
);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})