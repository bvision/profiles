'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
    start_date: {
        type: Date,
        default: Date.now
    },
    file: {
        type: Number
    },
    email: {
        type: String
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    assigned_to: {
        type: [String]
    },
    technologies: {
        type: [String]
    },
    belongs: {
        type: Schema.ObjectId,
	ref: 'Employee'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
EmployeeSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
EmployeeSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Employee', EmployeeSchema);
