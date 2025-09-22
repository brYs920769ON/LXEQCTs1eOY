// 代码生成时间: 2025-09-23 01:11:45
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

    // MathToolSet 类包含基本的数学计算功能
    class MathToolSet {
        /**
         * Adds two numbers.
         * @param a - First number.
         * @param b - Second number.
         * @returns The sum of a and b.
         */
        add(a: number, b: number): number {
            return a + b;
        }

        /**
         * Subtracts the second number from the first.
         * @param a - First number.
         * @param b - Second number.
         * @returns The difference of a and b.
         */
        subtract(a: number, b: number): number {
            return a - b;
        }

        /**
         * Multiplies two numbers.
         * @param a - First number.
         * @param b - Second number.
         * @returns The product of a and b.
         */
        multiply(a: number, b: number): number {
            return a * b;
        }

        /**
         * Divides the first number by the second.
         * @param a - First number.
         * @param b - Second number.
         * @returns The quotient of a and b.
         * @throws Error if b is zero.
         */
        divide(a: number, b: number): number {
            if (b === 0) {
                throw new Error('Cannot divide by zero.');
            }
            return a / b;
        }
    }

    // Create an instance of MathToolSet
    const mathTools = new MathToolSet();

    // Set up an Oak application
    const app = new Application();
    const router = new Router();

    // Define routes for each mathematical operation
    router.get('/add/:a/:b', (ctx) => {
        const { a, b } = ctx.params;
        ctx.response.body = { result: mathTools.add(Number(a), Number(b)) };
    });

    router.get('/subtract/:a/:b', (ctx) => {
        const { a, b } = ctx.params;
        ctx.response.body = { result: mathTools.subtract(Number(a), Number(b)) };
    });

    router.get('/multiply/:a/:b', (ctx) => {
        const { a, b } = ctx.params;
        ctx.response.body = { result: mathTools.multiply(Number(a), Number(b)) };
    });

    router.get('/divide/:a/:b', async (ctx) => {
        const { a, b } = ctx.params;
        try {
            ctx.response.body = { result: mathTools.divide(Number(a), Number(b)) };
        } catch (error) {
            ctx.response.status = 400;
            ctx.response.body = { error: error.message };
        }
    });

    // Add the router to the application
    app.use(router.routes());
    app.use(router.allowedMethods());

    // Start the application
    const PORT = 8000;
    app.addEventListener('listen', ({ hostname, port, secure }) => {
        console.log(`Server is running on http://${hostname}:${port}/`);
    });

    await app.listen({ port: PORT });