import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import db from '../db/knex.js';

beforeAll(async () => {
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('GET /api/v1/shows', () => {
  it('returns all shows', async () => {
    const res = await request(app).get('/api/v1/shows');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
    expect(res.body[0]).toMatchObject({
      name: 'Suits', channel: 'USA Network', genre: 'Drama', rating: 3, explicit: false,
    });
  });
});

describe('GET /api/v1/shows/:id', () => {
  it('returns a single show', async () => {
    const res = await request(app).get('/api/v1/shows/1');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Suits' });
  });

  it('returns 404 for a missing show', async () => {
    const res = await request(app).get('/api/v1/shows/999');
    expect(res.status).toBe(404);
  });

  it('returns 400 for a non-numeric id', async () => {
    const res = await request(app).get('/api/v1/shows/abc');
    expect(res.status).toBe(400);
  });
});

describe('POST /api/v1/shows', () => {
  const newShow = { name: 'Family Guy', channel: 'Fox', genre: 'Comedy', rating: 4, explicit: true };

  it('adds a show', async () => {
    const res = await request(app).post('/api/v1/shows').send(newShow);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newShow);
    expect(res.body.id).toBeDefined();
  });

  it('returns 422 when required fields are missing', async () => {
    const res = await request(app).post('/api/v1/shows').send({ name: 'Incomplete' });
    expect(res.status).toBe(422);
    expect(res.body.details.length).toBeGreaterThan(0);
  });

  it('returns 409 for a duplicate name', async () => {
    const res = await request(app).post('/api/v1/shows').send({ ...newShow, name: 'Suits' });
    expect(res.status).toBe(409);
  });
});

describe('PUT /api/v1/shows/:id', () => {
  it('updates a show', async () => {
    const res = await request(app).put('/api/v1/shows/1').send({ rating: 4, explicit: true });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Suits', rating: 4, explicit: true });
  });

  it('rejects updates that include the id', async () => {
    const res = await request(app).put('/api/v1/shows/1').send({ id: 20, rating: 4 });
    expect(res.status).toBe(422);
  });

  it('returns 404 for a missing show', async () => {
    const res = await request(app).put('/api/v1/shows/999').send({ rating: 4 });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/v1/shows/:id', () => {
  it('deletes a show and returns it', async () => {
    const res = await request(app).delete('/api/v1/shows/1');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: 'Suits' });

    const all = await request(app).get('/api/v1/shows');
    expect(all.body).toHaveLength(3);
    expect(all.body[0].name).toBe('Game of Thrones');
  });

  it('returns 404 for a missing show', async () => {
    const res = await request(app).delete('/api/v1/shows/999');
    expect(res.status).toBe(404);
  });
});