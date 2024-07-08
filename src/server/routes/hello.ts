import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {

    const x = new Promise((resolve) => setTimeout(() => {
        resolve({
            message: "you man!"
        });
    }, 5000));

    return await x;

});