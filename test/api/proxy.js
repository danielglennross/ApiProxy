'use strict';

const nock = require('nock');
const expect = require('chai').expect;
const config = require('../../src/config/index');
const serverFac = require('./testServer');

describe("[POST] /notes", () => {
    
    const server = serverFac.create();
    const mockNotes = nock(config.notes.uri).post('/notes');
    
    it("should return notes payload 201 created", done => {
         runSuccessfulTest((res, mockPayload) => {
            expect(res.statusCode).to.equal(201);
            expect(res.payload).to.equal(mockPayload);
        }, done);
    });

    it("should have processedtimestamp in response header", done => {
        runSuccessfulTest((res, mockPayload) => {
            expect(res.headers.processedtimestamp).to.exist;
        }, done);
    });

    // helpers
    const runSuccessfulTest = (assertions, done) => {
        const mockPayload = JSON.stringify(createdNotesPayload());
        mockNotes.reply(201, mockPayload);

        const options = {
            method: 'POST',
            url: '/api/proxy/notes/notes',
            payload: mockPayload,
            headers: {
                'Content-Type':'application/json'
            }
        };

        server.inject(options, res => {
            assertions(res, mockPayload);
            done();
        });
    };

    const createdNotesPayload = () => {
        return {
            Key1: 'Value1',
            Key2: 'Value2'
        };
    };
});

