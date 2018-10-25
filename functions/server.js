const server = require('./src/search').app;
const port = process.env.PORT || 5000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`- POST: http://localhost:${port}/1/apps/`);
  console.log(`- DELETE: http://localhost:${port}/1/apps/:id`);
});
