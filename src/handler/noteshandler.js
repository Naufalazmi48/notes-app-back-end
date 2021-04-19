const { nanoid } = require('nanoid');
const notes = require('../notes');

const addNoteHandler = (request, h) => {
  const { title = 'untitled', tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan!',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.find((n) => n.id === id);

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const updateNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    title = 'untitled', tags, body,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((n) => n.id === id);

  const isSuccess = (index > -1);
  if (isSuccess) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui!',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'failed update notes!',
  });
  response.code(404);
  console.log('gagal');
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const isSuccess = notes.find((n) => n.id === id);

  if (isSuccess) {
    notes.splice(id, 1);
    const response = h.response({
      status: 'success',
      message: 'delete note sucessful!',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'failed to delete this note!',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteByIdHandler,
  deleteNoteByIdHandler,
};