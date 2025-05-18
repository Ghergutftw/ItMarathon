package app.service;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class SteganographyService {

    public byte[] hideTextInImage(byte[] imageData, String text) throws IOException {
        BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageData));
        byte[] textBytes = text.getBytes();

        // Verify image can hold the text
        if (textBytes.length * 8 > image.getWidth() * image.getHeight() * 3) {
            throw new IllegalArgumentException("Image too small to hold the text");
        }

        int textIndex = 0;
        int bitIndex = 0;

        for (int y = 0; y < image.getHeight(); y++) {
            for (int x = 0; x < image.getWidth(); x++) {
                int rgb = image.getRGB(x, y);

                if (textIndex < textBytes.length) {
                    int currentByte = textBytes[textIndex] & 0xFF;
                    int bit = (currentByte >> (7 - bitIndex)) & 1;

                    // Modify LSB of each color channel
                    rgb = (rgb & 0xFFFFFFFE) | bit;

                    bitIndex++;
                    if (bitIndex == 8) {
                        bitIndex = 0;
                        textIndex++;
                    }
                }

                image.setRGB(x, y, rgb);
            }
        }

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        return baos.toByteArray();
    }

    public String extractTextFromImage(byte[] imageData) throws IOException {
        BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageData));
        StringBuilder extractedText = new StringBuilder();
        int currentByte = 0;
        int bitCount = 0;

        outer:
        for (int y = 0; y < image.getHeight(); y++) {
            for (int x = 0; x < image.getWidth(); x++) {
                int rgb = image.getRGB(x, y);
                int lsb = rgb & 1;

                currentByte = (currentByte << 1) | lsb;
                bitCount++;

                if (bitCount == 8) {
                    if (currentByte == 0) break outer;
                    extractedText.append((char) currentByte);
                    currentByte = 0;
                    bitCount = 0;
                }
            }
        }

        return extractedText.toString();
    }
}