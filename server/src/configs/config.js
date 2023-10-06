import { config } from 'dotenv';

config();

export const configs = {
    PORT: process.env.PORT || 5000,

    ACCESS_KEY_SECRET: process.env.ACCESS_KEY_SECRET,
    REFRESH_KEY_SECRET: process.env.REFRESH_KEY_SECRET,

    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL
}