import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {

    const x = new Promise((resolve) => setTimeout(() => {
        resolve({
            message: "loaded from the server after 5 seconds!"
        });
    }, 5000));

    return await x;

});