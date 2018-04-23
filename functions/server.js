const server = require('./src/search').app;

server.listen(process.env.PORT || 5000, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:5000`);
  console.log(`- POST: http://localhost:5000/1/apps/`);
  console.log(`- DELETE: http://localhost:5000/1/apps/:id`);
});
