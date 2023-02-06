const allTask = document.querySelectorAll(".task");
const allList = document.querySelectorAll(".list");

class dragDropMain {
  constructor() {
    this.handleEvent();
  }

  handleEvent() {
    allTask.forEach((task) => {
      task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
      });
      task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
      });
    });

    allList.forEach((list) => {
      list.addEventListener("dragover", (e) => {
        e.preventDefault();
        const curTask = document.querySelector(".dragging");
        const bottomTask = this.arrangeTask(list, e.clientY);
        // console.log(bottomTask);

        if (!bottomTask) {
          list.appendChild(curTask);
        } else {
          // insertBefore(): method inserts a child node before an existing child.
          list.insertBefore(curTask, bottomTask);
        }
      })
    });
  }

  arrangeTask(list, mouseY) {
    const tastNotDraggings = list.querySelectorAll(".task:not(.dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    tastNotDraggings.forEach((tastNotDragging) => {
      const top  = tastNotDragging.getBoundingClientRect().top;
      // console.log(top);
      const offset = mouseY - top;
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = tastNotDragging;
      }
    });
    // console.log(closestTask);
    return closestTask;
  }
}

const dragDropObj = new dragDropMain