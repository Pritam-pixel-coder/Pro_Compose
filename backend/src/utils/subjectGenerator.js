function generateSubject(subjectTemplate, data) {
  let subject = subjectTemplate;

  Object.keys(data).forEach(key => {
    const placeholder = `{${key}}`;
    subject = subject.replace(placeholder, data[key]);
  });

  return subject;
}

module.exports = generateSubject;