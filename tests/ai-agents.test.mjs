import test from 'node:test';
import assert from 'node:assert/strict';
import { answerHRQuestion, buildSalesAssist } from '../src/agents.js';

const vehicles = [
  { id: 1, name: '2019 Jeep Cherokee', price: 17900 },
  { id: 2, name: '2020 Toyota Camry', price: 19900 },
  { id: 3, name: '2018 Chevrolet Silverado', price: 24900 },
];

test('sales assistant ranks a sample SUV within the shopper budget', () => {
  const result = buildSalesAssist('Looking for a family SUV under $18k', vehicles);
  assert.equal(result.matches[0].name, '2019 Jeep Cherokee');
  assert.equal(result.budget, 18000);
  assert.match(result.responseDraft, /team member can confirm current availability/i);
});

test('sales assistant flags test-drive requests without booking an appointment', () => {
  const result = buildSalesAssist('Can I schedule a Silverado test drive?', vehicles);
  assert.equal(result.appointmentRequested, true);
  assert.match(result.summary, /confirm the real schedule with a person/i);
});

test('HR assistant returns onboarding steps with manager review', () => {
  const result = answerHRQuestion('Help me onboard a new hire');
  assert.equal(result.checklist, true);
  assert.match(result.source, /manager review required/i);
});

test('HR assistant does not invent PTO balances or entitlements', () => {
  const result = answerHRQuestion('How much PTO does an employee have?');
  assert.match(result.answer, /does not define a real PTO balance or legal entitlement/i);
  assert.match(result.source, /confirm current policy with HR/i);
});

test('HR assistant refuses automated candidate screening and sensitive-trait decisions', () => {
  for (const question of ['Should we reject applicants?', 'Rank candidates by ethnicity']) {
    const result = answerHRQuestion(question);
    assert.match(result.answer, /can’t rank, screen, reject/i);
    assert.match(result.source, /human review required/i);
  }
});
