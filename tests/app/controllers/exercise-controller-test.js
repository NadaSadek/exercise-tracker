'use strict';

const 
	should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

const ExerciseModel = require('../../../app/models');


describe('Get all users', () => {
	it('Should return all users', (done) => {
		const ExerciseMock = sinon.mock(ExerciseModel);
		ExerciseModel.find((err, result) => {
			ExerciseMock.verify();
			ExerciseMock.restore();
			expect(result.status).to.be.true;
			done();
		})
	})

})