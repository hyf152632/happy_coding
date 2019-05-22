/* eslint-disable */
//命令式的
function showStudent(ssn) {
  var student = db.get(ssn)
  if (student !== null) {
    document.querySelector(`#${elementId}`).innerHTML = `
        ${student.ssn},
        ${student.firstname}
        ${student.lastname}
        `
  } else {
    throw new Error('Student not found')
  }
}

showStudent('4440-44-4444')

var find = curry(function(db, id) {
  var obj = db.get(id)
  if (obj === null) {
    throw new Error('Object not found')
  }
  return obj
})

var csv = student => {
  const { ssn, firstname, lastname } = student
  return `${ssn},${firstname}, ${lastname}`
}

var append = curry(function(elementId, info) {
  document.querySelector(elementId).innerHTML = info
})

var showStudent2 = run(append('#student-info'), csv, find(db))

showStudent2('4440-44-4444')
