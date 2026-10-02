const terms = {
  truck: /\b(truck|pickup|4x4|silverado|ram)\b/i,
  suv: /\b(suv|family|cherokee)\b/i,
  sedan: /\b(sedan|commute|camry)\b/i,
};

function budgetFrom(text) {
  const match = text.match(/\$\s*(\d[\d,]*(?:\.\d+)?)\s*(k)?/i)
    || text.match(/budget(?: is| of)?\s*(\d[\d,]*(?:\.\d+)?)\s*(k)?/i);
  if (!match) return null;
  const amount = Number(match[1].replaceAll(',', ''));
  return amount * (match[2] ? 1000 : 1);
}

export function buildSalesAssist(message, vehicles) {
  const input = message.trim();
  const budget = budgetFrom(input);
  const desiredType = Object.entries(terms).find(([, pattern]) => pattern.test(input))?.[0];
  const ranked = vehicles.map((vehicle) => {
    const name = vehicle.name.toLowerCase();
    let score = 0;
    if (desiredType === 'truck' && /silverado|ram/.test(name)) score += 5;
    if (desiredType === 'suv' && /cherokee/.test(name)) score += 5;
    if (desiredType === 'sedan' && /camry/.test(name)) score += 5;
    if (budget && vehicle.price <= budget) score += 3;
    if (input.toLowerCase().split(/[^a-z0-9]+/).some((word) => word.length > 2 && name.includes(word))) score += 2;
    return { ...vehicle, score };
  }).sort((a, b) => b.score - a.score || a.price - b.price);

  const withinBudget = budget ? ranked.filter((vehicle) => vehicle.price <= budget) : ranked;
  const matches = (withinBudget.length ? withinBudget : ranked).slice(0, 3);
  const top = matches[0] || null;
  const appointmentRequested = /test.?drive|appointment|schedule|come in|visit the lot/i.test(input);

  if (!top) {
    return { matches: [], budget, appointmentRequested, summary: 'There are no sample vehicles to match yet.', responseDraft: '' };
  }

  const budgetNote = budget && !withinBudget.length
    ? ` Nothing in the sample lot is listed under $${budget.toLocaleString()}, so this is only the closest available option.`
    : '';
  const appointmentNote = appointmentRequested
    ? ' The shopper mentioned a visit; suggest a time, but confirm the real schedule with a person.'
    : ' Ask whether they would like to arrange a test drive.';

  return {
    matches,
    budget,
    appointmentRequested,
    summary: `Best sample-lot match: ${top.name} at $${top.price.toLocaleString()}.${budgetNote}${appointmentNote} Confirm live availability, final pricing, and financing with the dealership before making a promise.`,
    responseDraft: `Hi! Thanks for reaching out. The ${top.name} is listed in our sample inventory at $${top.price.toLocaleString()}. Would you like to arrange a time to see it? A team member can confirm current availability and answer questions about pricing or financing.`,
  };
}

export function answerHRQuestion(question) {
  const text = question.trim();
  const employmentDecision = /\b(rank|score|reject|select|shortlist|screen)\b.*\b(applicants?|candidates?|employees?|resumes?)\b|\b(applicants?|candidates?|employees?|resumes?)\b.*\b(rank|score|reject|select|shortlist|screen)\b/i.test(text);
  const sensitiveAttribute = /\b(age|race|gender|religion|disability|medical|pregnan|nationality|ethnicity|marital status|criminal record)\b/i.test(text);

  if (employmentDecision || sensitiveAttribute) {
    return {
      answer: 'I can’t rank, screen, reject, or make employment decisions about a person, or use sensitive personal traits to guide them. A qualified human should review the situation using consistent, job-related criteria and the dealership’s approved policy.',
      source: 'People-first guardrail · human review required',
      checklist: false,
    };
  }

  if (/onboard|new hire|first day|orientation|welcome/i.test(text)) {
    return {
      answer: 'Here is a starter onboarding sequence for this sample dealership: confirm the role and start date with the manager; prepare access and required forms; walk through the lot, safety expectations, and customer handoffs; pair the teammate with a trainer; then schedule a week-one check-in. A manager or HR lead should verify local requirements and complete the official records.',
      source: 'Sample onboarding playbook · manager review required',
      checklist: true,
    };
  }

  if (/time off|pto|vacation|leave|sick|schedule change/i.test(text)) {
    return {
      answer: 'The demo handbook does not define a real PTO balance or legal entitlement. Capture the dates requested and any coverage plan, then route the request to the employee’s manager or HR contact to check the dealership’s approved policy and applicable local rules.',
      source: 'Sample staff handbook · confirm current policy with HR',
      checklist: false,
    };
  }

  if (/interview|hiring|job post|job description|technician|sales role|open role/i.test(text)) {
    return {
      answer: 'I can help draft a role description, a structured interview guide, and job-related questions. Keep the same criteria for every candidate; a human hiring manager makes all screening, selection, compensation, and offer decisions. Tell me the role, must-have skills, schedule, and location to start a draft.',
      source: 'Hiring workflow guide · no automated candidate decisions',
      checklist: false,
    };
  }

  if (/safety|injury|incident|emergency|harass|threat/i.test(text)) {
    return {
      answer: 'If anyone is in immediate danger, contact local emergency services first. Otherwise, get the person to a safe place and notify the designated manager or HR contact promptly; use the dealership’s approved incident-reporting process. This demo cannot assess emergencies or replace qualified support.',
      source: 'Safety escalation guide · human support required',
      checklist: false,
    };
  }

  return {
    answer: 'I can help with onboarding steps, sample handbook navigation, structured interview materials, and routing a team question to the right person. I only have the limited sample playbook in this demo; share the topic, and I’ll point to a safe next step rather than inventing a policy.',
    source: 'Sample people-ops playbook · no live HR records connected',
    checklist: false,
  };
}
