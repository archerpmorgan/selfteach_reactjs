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

// if hard then flip all problems, if not then just those which the problem set thinks are completed
export function flipCompletedProblemsInBookFromProblemSet(bookdata, problemsetdata, hard) {
  console.log(problemsetdata);
  console.log(bookdata);
  problemsetdata.resources[0].problems.forEach((problem) => {
    if (hard || problem.completed === "true") {
      bookdata.resources.forEach((book)=> {
        if (book.title === problem.bookName) {
          book.sections.forEach((section) => {
            if (section.name === problem.sectionName){
              section.problems.forEach((problemToChange) => {
                if (problemToChange.name === problem.name) {
                  problemToChange.completed = true;
                  console.log(`flipped ${problemToChange.name} in ${problem.sectionName} in ${problem.bookName}`);
                }
              });
            }
          });
        }
      });
    }
  });
  console.log(bookdata);
  return bookdata;
}

export function flipCompletedProblemsInProblemSet(
  allproblemsetdata,
  problemsToFlip
) {
  allproblemsetdata.resources.forEach((set) => {
    set.problems.forEach((problem) => {
      if (problemsToFlip.includes(problem.sectionName + "-" + problem.name)) {
        problem.completed = (problem.completed==="false") ? "true" : "false";
      }
    });
  });
  return allproblemsetdata;
}

export function extractProblemsForProblemSetTable(problemdata) {
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

export function extractProblemsForTable(bookdata) {
  if (Object.keys(bookdata).length === 0) {
    return [
      {
        id: 0,
        sectionName: "",
        name: "",
        completed: false,
      },
    ];
  }
  let i = 0;
  let accumulator = [];
  bookdata.sections.forEach((section) => {
    section.problems.forEach((problem) => {
      accumulator.push({
        id: i,
        sectionName: section.name,
        name: problem.name,
        completed: problem.completed.toString(),
      });
      i++;
    });
  });
  return accumulator;
}
