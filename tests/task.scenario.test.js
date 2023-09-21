const request = require('supertest');
const app = require('../app');

let server;

beforeAll(() => {
  server = app.listen(4000);
});

afterAll((done) => {
  server.close(async () => {
    done();
  });
});

describe('Task Management API Scenario Tests', () => {
  let taskId;

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        completed: false,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Task');
    taskId = response.body._id;
  });

  it('should update an existing task', async () => {
    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({
        completed: true,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it('should delete an existing task', async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Task deleted');
  });
});
