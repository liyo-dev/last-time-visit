/// <reference lib="deno.unstable" />
import { Hono } from "https://deno.land/x/hono@v3.11.10/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.11.10/middleware.ts";
import { streamSSE } from "https://deno.land/x/hono@v3.11.10/helper/streaming/index.ts";

const db = await Deno.openKv();
const app = new Hono();

// Configuración de encabezados CORS
app.use(async (c) => {
    c.res.headers.set("Access-Control-Allow-Origin", "https://bitter-bison-62-yr772rrzbxdt.deno.dev");
    c.res.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    c.res.headers.set("Access-Control-Allow-Methods", "OPTIONS, POST, GET");
});

let i = 0;

app.get('/', serveStatic({ path: './index.html' }));

app.post('/visit', async(c)=>{
    const { country, city, flag } = await c.req.json()
    await db.atomic()
    .set(["lastVisit"], { country, city, flag })
    .sum(["visits"], 1n)
    .commit()
    return c.json({message: 'ok'})
});

app.get('/visit', (c) => {
    return streamSSE(c, async (stream) => {
        const watcher = db.watch([["lastVisit"]])
  
        for await (const entry of watcher){
            const { value } = entry[0]
            if (value != null){
                await stream.writeSSE({ data:JSON.stringify(value), event: 'update', id: String(i++) })
            }
        }
    });
});

Deno.serve(app.fetch);
