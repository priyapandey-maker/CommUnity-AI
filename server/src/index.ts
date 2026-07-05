import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT ?? '8080';

app.listen(Number(PORT), () => {
  console.log(`[server] Running on port ${PORT} (${process.env.NODE_ENV ?? 'development'})`);
});
