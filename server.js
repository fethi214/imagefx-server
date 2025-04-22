import express from 'express';
import generateImage from 'imageFX-api';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.post('/generate', async (req, res) => {
    const { prompt, imageCount = 1 } = req.body;
    const auth = process.env.AUTH;  // ?????? ?? ????? ??????

    try {
        const result = await generateImage({
            prompt,
            auth,
            imageCount
        });

        const images = result.imagePanels[0].generatedImages.map(img => img.encodedImage);
        res.json({ images });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`? Server running on port ${PORT}`));
