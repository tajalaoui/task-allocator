const developers = [
  { name: "Alice", skillLevel: 7, maxHours: 40, preferredTaskType: "feature" },
  { name: "Bob", skillLevel: 9, maxHours: 30, preferredTaskType: "bug" },
  {
    name: "Charlie",
    skillLevel: 5,
    maxHours: 35,
    preferredTaskType: "refactor",
  },
];

const tasks = [
  {
    taskName: "Feature A",
    difficulty: 7,
    hoursRequired: 15,
    taskType: "feature",
    priority: 4,
    dependencies: [],
  },
  {
    taskName: "Bug Fix B",
    difficulty: 5,
    hoursRequired: 10,
    taskType: "bug",
    priority: 5,
    dependencies: [],
  },
  {
    taskName: "Refactor C",
    difficulty: 9,
    hoursRequired: 25,
    taskType: "refactor",
    priority: 3,
    dependencies: ["Bug Fix B"],
  },
  {
    taskName: "Optimization D",
    difficulty: 6,
    hoursRequired: 20,
    taskType: "feature",
    priority: 2,
    dependencies: [],
  },
  {
    taskName: "Upgrade E",
    difficulty: 8,
    hoursRequired: 15,
    taskType: "feature",
    priority: 5,
    dependencies: ["Feature A"],
  },
];

function assignTasksWithPriorityAndDependencies(developers, tasks) {
  const developersWithStatus = developers.map((dev) => ({
    ...dev,
    assignedTasks: [],
    remainingHours: dev.maxHours,
    totalHours: 0,
  }));

  const taskCompletionStatus = new Map(
    tasks.map((task) => [task.taskName, false])
  );

  const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);

  const findBestDeveloper = (task) => {
    return developersWithStatus
      .filter(
        (dev) =>
          dev.skillLevel >= task.difficulty &&
          dev.remainingHours >= task.hoursRequired
      )
      .sort(
        (a, b) =>
          (b.preferredTaskType === task.taskType) -
            (a.preferredTaskType === task.taskType) ||
          a.totalHours - b.totalHours
      )[0];
  };

  const dependenciesMet = (task) =>
    task.dependencies.every((dep) => taskCompletionStatus.get(dep));

  for (const task of sortedTasks) {
    if (!dependenciesMet(task)) continue;

    const developer = findBestDeveloper(task);

    if (developer) {
      developer.assignedTasks.push(task.taskName);
      developer.remainingHours -= task.hoursRequired;
      developer.totalHours += task.hoursRequired;
      taskCompletionStatus.set(task.taskName, true);
    }
  }

  const unassignedTasks = sortedTasks
    .filter((task) => !taskCompletionStatus.get(task.taskName))
    .map((task) => task.taskName);

  return { developers: developersWithStatus, unassignedTasks };
}

const result = assignTasksWithPriorityAndDependencies(developers, tasks);
console.log(result);
