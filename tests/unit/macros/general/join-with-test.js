import Ember from 'ember';
import { module, test } from 'qunit';
import { joinWith } from 'ember-macaroni';

const {
  Object: EmberObject,
  get
} = Ember;

module('ember-macaroni/general - joinWith');

test('#joinWith returns a string of values joined with a separator', (assert) => {
  assert.expect(1);

  const expectedResult = 'Bill-Lumbergh';
  const Employee = EmberObject.extend({
    fullName: joinWith('-', 'firstName', 'lastName')
  });
  const subject = Employee.create({
    firstName: 'Bill',
    lastName: 'Lumbergh'
  });
  const result = get(subject, 'fullName');

  assert.deepEqual(result, expectedResult, 'it returns a string of values joined with a separator');
});

test('#joinWith handles empty string', (assert) => {
  assert.expect(1);

  const expectedResult = 'BillLumbergh';
  const Employee = EmberObject.extend({
    fullName: joinWith('', 'firstName', 'lastName')
  });
  const subject = Employee.create({
    firstName: 'Bill',
    lastName: 'Lumbergh'
  });
  const result = get(subject, 'fullName');

  assert.deepEqual(result, expectedResult, 'it handles empty string');
});

test('#joinWith defaults to space when given wrong delimeter type', (assert) => {
  assert.expect(1);

  const expectedResult = 'Bill Lumbergh';
  const Employee = EmberObject.extend({
    fullName: joinWith(42, 'firstName', 'lastName')
  });
  const subject = Employee.create({
    firstName: 'Bill',
    lastName: 'Lumbergh'
  });
  const result = get(subject, 'fullName');

  assert.deepEqual(result, expectedResult, 'defaults to space when given wrong delimeter type');
});
