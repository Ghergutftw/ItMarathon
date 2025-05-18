package app.service;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

@Service
public class SteganographyService {

    public static byte[] encryptTextInImage(byte[] imageBytes, String text) {
        try {
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageBytes));
            int width = image.getWidth();
            int height = image.getHeight();

            byte[] textBytes = text.getBytes(StandardCharsets.UTF_8);
            byte[] lengthBytes = ByteBuffer.allocate(4).putInt(textBytes.length).array(); // first 4 bytes = length

            byte[] dataToHide = new byte[lengthBytes.length + textBytes.length];
            System.arraycopy(lengthBytes, 0, dataToHide, 0, lengthBytes.length);
            System.arraycopy(textBytes, 0, dataToHide, lengthBytes.length, textBytes.length);

            int dataIndex = 0;
            outer:
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    if (dataIndex >= dataToHide.length * 8) break outer;

                    int rgb = image.getRGB(x, y);
                    int blue = rgb & 0xFF;

                    // Replace LSB of blue channel with 1 bit of data
                    int bit = (dataToHide[dataIndex / 8] >> (7 - (dataIndex % 8))) & 1;
                    blue = (blue & 0xFE) | bit;

                    // Recombine with unchanged red/green
                    int newRgb = (rgb & 0xFFFF00) | blue;
                    image.setRGB(x, y, newRgb);
                    dataIndex++;
                }
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to process image", e);
        }
    }


    public static String decryptTextFromImage(byte[] imageBytes) {
        try {
            BufferedImage image = ImageIO.read(new ByteArrayInputStream(imageBytes));
            int width = image.getWidth();
            int height = image.getHeight();

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            int dataIndex = 0;
            int length = -1;
            int currentByte = 0;

            outer:
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    int rgb = image.getRGB(x, y);
                    int blue = rgb & 0xFF;
                    int bit = blue & 1;

                    currentByte = (currentByte << 1) | bit;
                    dataIndex++;

                    if (dataIndex % 8 == 0) {
                        buffer.write(currentByte);
                        if (dataIndex == 32) {
                            length = ByteBuffer.wrap(buffer.toByteArray()).getInt();
                            buffer.reset();
                        } else if (length != -1 && buffer.size() == length) {
                            break outer;
                        }
                        currentByte = 0;
                    }
                }
            }

            return new String(buffer.toByteArray(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process image", e);
        }
    }



}