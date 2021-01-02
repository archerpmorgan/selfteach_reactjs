export function summaryStatistics(book) {
  let totalProblems = 0;
  let completedProblems = 0;
  book.sections.forEach((section) => {
    section.problems.forEach((problem) => {
      totalProblems++;
      if (problem.completed) {
        completedProblems++;
      }
    });
  });

  let totalSections = 0;
  let studiedSections = 0;
  book.sections.forEach((section) => {
    totalSections++;
    if (section.haveStudied) {
      studiedSections++;
    }
  });

  return {
    totalProblems,
    completedProblems,
    totalSections,
    studiedSections,
  };
}

// given all the data, return an object containing only that data for a single book
// return {} if the name is not found
export function selectBook(bookdata, name) {
  let retval = {};
  bookdata.resources.forEach((element) => {
    if (element.title === name) {
      retval = element;
    }
  });
  return retval;
}

// given all the data, return an object containing only that data for a single book
// return {} if the name is not found
export function getTitles(bookdata) {
  const titles = [];
  bookdata.resources.forEach((element) => {
    titles.push(element.title);
  });
  return titles;
}

// here working with data for just one book
export function extractSectionsForTable(bookdata) {
  if (Object.keys(bookdata).length === 0) {
    return [
      {
        name: "",
        haveStudied: false,
        studiedDate: "",
        description: "",
      },
    ];
  }
  let accumulator = [];
  bookdata.sections.forEach((section) => {
    accumulator.push({
      name: section.name,
      description: section.description,
      haveStudied: section.haveStudied.toString(),
      studiedDate: section.studiedDate,
    });
  });
  return accumulator;
}

export function flipStudiedSections(bookdata, sectionsToFlip, bookname) {
  bookdata.resources.forEach((book) => {
    if (book.title === bookname) {
      book.sections.forEach((section) => {
        if (sectionsToFlip.includes(section.name)) {
          section.haveStudied = section.haveStudied ? false : true;
        }
      });
    }
  });
  return bookdata;
}

export function flipCompletedProblems(bookdata, problemsToFlip, bookname) {
  bookdata.resources.forEach((book) => {
    if (book.title === bookname) {
      book.sections.forEach((section) => {
        section.problems.forEach((problem) => {
          if (problemsToFlip.includes(section.name + "-" + problem.name)) {
            problem.completed = problem.completed ? false : true;
          }
        });
      });
    }
  });
  return bookdata;
}

export function extractProblemsForTable(problemdata) {
  console.log(problemdata);
  if (
    Object.keys(problemdata).length === 0 ||
    problemdata.resources.length === 0
  ) {
    return [];
  }
  let i = 0;
  let accumulator = [];
  problemdata.resources[0].problems.forEach((problem) => {
    accumulator.push({
      id: i,
      bookName: problem.bookName,
      sectionName: problem.sectionName,
      name: problem.name,
      completed: problem.completed.toString(),
    });
    i++;
  });
  return accumulator;
}
