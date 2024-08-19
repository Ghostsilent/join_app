async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function stop(event){
  event.stopPropagation();
}

function openDropdown() {
  // if (window.innerWidth < 830) {
  //     document.getElementById('dropdown').classList.add('dropdown-style-mobile');
  //     document.getElementById('dropdown').classList.toggle('toggle-style-dropdown');
  // } else {
  document.getElementById("dropdown").classList.toggle("d-none");
  // }
}

function renderContact(i, user, color, lastInitial) {
  let initial = user.username[0].toUpperCase();
  let contactHTML = "";

  if (initial !== lastInitial) {
    contactHTML += `<div class="contact-list-letter"><h3>${initial}</h3></div><hr>`;
  }

  contactHTML += /*html*/ `
    <div onclick="renderContactDetails(${i}), contactCardClick(this, ${i})" id="contact-info${i}" class="contact">
      <div class="initials" style="background-color: ${color};">${getInitials(
    user.username
  )}</div>
      <div class="contact-info">
        <p id="name${i}" class="name"><span>${user.username}</span></p>
        <p class="email">${user.email}</p>
      </div>
    </div>
  `;

  return contactHTML;
}

// renderContactDetails.js

function generateContactDetailsHTML(i, user, color, isMobile) {
  if (isMobile) {
    return /*html*/ `
      <div class="render-details-head-mobile">
        <div id="initials-detail" class="profile-initials-mobile">${getInitials(
          user.username
        )}</div>
        <div class="profile-name-mobile">${user.username}</div>
      </div>
      <div class="render-details-info">
        <div class="contact-info-headline-mobile">Contact Information</div>
        <div>
          <div class="single-info">
            <span><b>Email</b></span>
            <span><a href="mailto:${user.email}">${user.email}</a></span>
          </div>
          <div class="single-info">
            <span><b>Phone</b></span>
            <span>${user.contactNumber}</span>
          </div>
        </div>
      </div>
      <div onclick="openMobileEditMenu(); stop(event)" id="details-mobile-round-btn" class="details-mobile-round-btn">
        <img src="../assets/img/kebab-menu.svg" alt="more options">
      </div>
      <div id="mobile-edit-menu">
        <div class="edit-delete-child-mobile">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_207322_3882" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_207322_3882)">
                        <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                    </g>
                </svg>          
                <span onclick="openEditContact(); renderEdit(${i})">Edit</span>
        </div>
        <div onclick="deleteContact(${i})" class="edit-delete-child-mobile">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_207322_4146" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_207322_4146)">
                        <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                    </g>
                </svg>          
                <span>Delete</span>
        </div>
      </div>
    `;
  } else {
    return /*html*/ `
      <div class="render-details-head">
        <div id="initials-detail" class="profile-initials" style="background-color: ${color};">
          ${getInitials(user.username)}
        </div>
        <div>
          <div class="profile-name">${user.username}</div>
          <div class="edit-delete-cont">
            <div class="edit-delete-child">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_207322_3882" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_207322_3882)">
                        <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                    </g>
                </svg>              
                <span onclick="openEditContact(); renderEdit(${i})">Edit</span>
            </div>
            <div onclick="deleteContact(${i})" class="edit-delete-child">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_207322_4146" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_207322_4146)">
                        <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                    </g>
                </svg>              
                <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
      <div class="render-details-info">
        <div class="contact-info-headline">Contact Information</div>
        <div>
          <div class="single-info">
            <span><b>Email</b></span>
            <span><a href="mailto:${user.email}">${user.email}</a></span>
          </div>
          <div class="single-info">
            <span><b>Phone</b></span>
            <span>${user.contactNumber}</span>
          </div>
        </div>
      </div>
    `;
  }
}

function generateEditContactHTML(user, index) {
  return /*html*/ `
    <div class="edit-contact-top-left-section">
      <img class="edit-contact-logo" src="../assets/img/join_logo_white.png" alt="">
      <h1 class="edit-contact-headline">Edit contact</h1>
      <div class="edit-contact-separator"></div>
    </div>
    <div class="edit-contact-bottom-right-section">
      <span class="edit-contact-avatar"></span>
      <div class="edit-contact-bottom-rightmost-section">
        <div type="reset" onclick="closeEditContactPopup()" id="contactCloseButton" class="edit-contact-close"></div>
        <form onsubmit="editValidateName(); return false" class="edit-contact-form" name="editForm">
          <div class="input-edit-container">
            <input onkeyup="clearEditFields()" name="editName" class="edit-imput edit-imput-name" id="editInputName" type="text" placeholder="Name" value="${user.username}"><br> 
            <span class="validSpanField" id="editValidSpanFieldName"></span>
          </div>
          <div class="input-edit-container">
            <input onkeyup="clearEditFields()" name="editEmail" class="edit-imput edit-imput-email" id="editInputEmail" type="text" placeholder="Email" value="${user.email}"><br> 
            <span class="validSpanField" id="editValidSpanFieldEmail"></span>
          </div>
          <div class="input-edit-container">
            <input onkeyup="clearEditFields()" name="editPhone" class="edit-imput edit-imput-phone" id="editInputPhone" type="number" placeholder="Phone" value="${user.contactNumber}"><br> 
            <span class="validSpanField" id="editValidSpanFieldPhone"></span>
          </div>
          <div class="button-edit-container">
            <button onclick="deleteContact(${index})" class="btn-cancel">
              Delete
            </button>
            <button type="submit" class="btn-create btn-create:hover ::root">Save<img src="../assets/img/check.svg"></button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function generateToDoHTML(element, i) {
  return /*html*/ `
        <div id="task${i}" draggable="true" ondragstart="startDragging(${index_to_do[i]}, ${i})" onclick="openTaskDetails(${index_to_do[i]})" class="task">
            <div class="task-head">
                <div class="task-category" style="background : ${element.category[1]}">${element.category[0]}</div>
                <img onclick="toggleKebabDropdown(${index_to_do[i]}), stop(event)" src="../assets/img/kebab.svg" alt="more options">
                <div id="kebab-dropdown${index_to_do[i]}" class="kebab-dropdown d-none">
                    <span onclick="moveToInProgress(${index_to_do[i]}, stop(event))">In progress</span>
                    <span onclick="moveToAwaitFeedback(${index_to_do[i]}, stop(event))">Await feedback</span>
                    <span onclick="moveToDone(${index_to_do[i]}, stop(event))">Done</span>
                </div>
            
            </div>
            <span id="task-title">${element.title}</span>
            <span id="task-description">${element.description}</span>
            <div class="subtasks">
                <div id="subtask-progress">
                    <div id="progress-bar" style="width:${
                      (100 / element.subtasks.length) *
                      element.subtasks_done.length
                    }%"></div>
                </div>
                <div id="subtask-counter">${element.subtasks_done.length}/${
    element.subtasks.length
  } Subtasks</div>
            </div>
            <div class="assigned-prio-cont">
                <div id="assigned-initials">
                    <div class="test-initials">${element.assigned_to[0]}</div>
                    <div class="test-initials bg-green">${
                      element.assigned_to[1]
                    }</div>
                    <div class="test-initials bg-violet">${
                      element.assigned_to[2]
                    }</div>
                </div>
                <div id="task-prio">
                    <img class="prio-icons" src="${
                      element.prio[1]
                    }" alt="prio icon">
                </div>
            </div>
        </div>
    `;
}

function generateInProgressHTML(element, i) {
  return /*html*/ `
          <div id="task${i}" draggable="true" ondragstart="startDragging(${
            index_in_progress[i]
          })" onclick="openTaskDetails(${index_in_progress[i]})" class="task">
              <div class="task-head">
                  <div class="task-category" style="background : ${
                    element.category[1]
                  }">${element.category[0]}</div>
                  <img onclick="toggleKebabDropdown(${
                    index_in_progress[i]
                  }, stop(event))" src="../assets/img/kebab.svg" alt="more options">
                  <div id="kebab-dropdown${
                    index_in_progress[i]
                  }" class="kebab-dropdown d-none">
                        <span onclick="moveToToDo(${index_in_progress[i]}), stop(event)">To do</span>
                        <span onclick="moveToAwaitFeedback(${
                          index_in_progress[i]
                        }), stop(event)">Await feedback</span>
                        <span onclick="moveToDone(${
                          index_in_progress[i]
                        }), stop(event)">Done</span>
                  </div>
              
              </div>
              <span id="task-title">${element.title}</span>
              <span id="task-description">${element.description}</span>
              <div class="subtasks">
                  <div id="subtask-progress">
                      <div id="progress-bar" style="width:${
                        (100 / element.subtasks.length) *
                        element.subtasks_done.length
                      }%"></div>
                  </div>
                  <div id="subtask-counter">${element.subtasks_done.length}/${
    element.subtasks.length
  } Subtasks</div>
              </div>
              <div class="assigned-prio-cont">
                  <div id="assigned-initials">
                      <div class="test-initials">${element.assigned_to[0]}</div>
                      <div class="test-initials bg-green">${
                        element.assigned_to[1]
                      }</div>
                      <div class="test-initials bg-violet">${
                        element.assigned_to[2]
                      }</div>
                  </div>
                  <div id="task-prio">
                      <img class="prio-icons" src="${
                        element.prio[1]
                      }" alt="prio icon">
                  </div>
              </div>
          </div>
      `;
}

function generateAwaitFeedbackHTML(element, i) {
  return /*html*/ `
          <div id="task${i}" draggable="true" ondragstart="startDragging(${
            index_await_feedback[i]
          })" onclick="openTaskDetails(${index_await_feedback[i]})" class="task">
              <div class="task-head">
                  <div class="task-category" style="background : ${
                    element.category[1]
                  }">${element.category[0]}</div>
                  <img onclick="toggleKebabDropdown(${
                    index_await_feedback[i]
                  }, stop(event))" src="../assets/img/kebab.svg" alt="more options">
                  <div id="kebab-dropdown${
                    index_await_feedback[i]
                  }" class="kebab-dropdown d-none">
                        <span onclick="moveToToDo(${index_await_feedback[i]}), stop(event)">To do</span>
                        <span onclick="moveToInProgress(${
                          index_await_feedback[i]
                        }), stop(event)">In progress</span>
                        <span onclick="moveToDone(${
                          index_await_feedback[i]
                        }), stop(event)">Done</span>
                  </div>
              
              </div>
              <span id="task-title">${element.title}</span>
              <span id="task-description">${element.description}</span>
              <div class="subtasks">
                  <div id="subtask-progress">
                      <div id="progress-bar" style="width:${
                        (100 / element.subtasks.length) *
                        element.subtasks_done.length
                      }%"></div>
                  </div>
                  <div id="subtask-counter">${element.subtasks_done.length}/${
    element.subtasks.length
  } Subtasks</div>
              </div>
              <div class="assigned-prio-cont">
                  <div id="assigned-initials">
                      <div class="test-initials">${element.assigned_to[0]}</div>
                      <div class="test-initials bg-green">${
                        element.assigned_to[1]
                      }</div>
                      <div class="test-initials bg-violet">${
                        element.assigned_to[2]
                      }</div>
                  </div>
                  <div id="task-prio">
                      <img class="prio-icons" src="${
                        element.prio[1]
                      }" alt="prio icon">
                  </div>
              </div>
          </div>
      `;
}

function generateDoneHTML(element, i) {
  return /*html*/ `
          <div id="task${i}" draggable="true" ondragstart="startDragging(${
            index_done[i]
          })" onclick="openTaskDetails(${index_done[i]})" class="task">
              <div class="task-head">
                  <div class="task-category" style="background : ${
                    element.category[1]
                  }">${element.category[0]}</div>
                  <img onclick="toggleKebabDropdown(${
                    index_done[i]
                  }, stop(event))" src="../assets/img/kebab.svg" alt="more options">
                  <div id="kebab-dropdown${
                    index_done[i]
                  }" class="kebab-dropdown d-none">
                        <span onclick="moveToToDo(${index_done[i]}), stop(event)">To do</span>
                        <span onclick="moveToInProgress(${
                          index_done[i]
                        }), stop(event)">In progress</span>
                        <span onclick="moveToAwaitFeedback(${
                          index_done[i]
                        }), stop(event)">Await feedback</span>
                  </div>
              
              </div>
              <span id="task-title">${element.title}</span>
              <span id="task-description">${element.description}</span>
              <div class="subtasks">
                  <div id="subtask-progress">
                      <div id="progress-bar" style="width:${
                        (100 / element.subtasks.length) *
                        element.subtasks_done.length
                      }%"></div>
                  </div>
                  <div id="subtask-counter">${element.subtasks_done.length}/${
    element.subtasks.length
  } Subtasks</div>
              </div>
              <div class="assigned-prio-cont">
                  <div id="assigned-initials">
                      <div class="test-initials">${element.assigned_to[0]}</div>
                      <div class="test-initials bg-green">${
                        element.assigned_to[1]
                      }</div>
                      <div class="test-initials bg-violet">${
                        element.assigned_to[2]
                      }</div>
                  </div>
                  <div id="task-prio">
                      <img class="prio-icons" src="${
                        element.prio[1]
                      }" alt="prio icon">
                  </div>
              </div>
          </div>
      `;
}

function generateTaskDetailsHTML(task, i) {
  return /*html*/ `
        <div class="task-details">
          <div class="task-details-main-part">
            <div class="task-head">
                <div class="task-category-detail" style="background : ${task.category[1]}">${task.category[0]}</div>
                <img onclick="closeTaskDetails()" src="../assets/img/iconoir_cancel.svg" alt="close">
            </div>
            <span class="task-details-title">${task.title}</span>
            <span class="task-details-description">${task.description}</span>
            <div class="task-details-date-style">
                <span class="task-subtitles">Due date:</span>
                <span>${task.due_date}</span>
            </div>
            <div class="task-details-prio-style">
                <span class="task-subtitles">Priority:</span>
                <div class="prio-cont">
                    <span>${task.prio[0]}</span>
                    <img src="${task.prio[1]}">
                </div>
            </div>
            <div class="assigned-to">
                <span class="task-subtitles">Assigned To:</span>
                <div id="assigned-contacts">${task.assigned_to}</div>
            </div>
            <div class="subtasks-popup">
                <span class="task-subtitles">Subtasks</span>
                <div id="subtasks-details"></div>
            </div>
          </div>
            <div class="delete-edit-cont">
            <div onclick="deleteTask(${i})" class="delete-edit-single">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_207322_4146" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_207322_4146)">
                        <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                    </g>
                </svg>              
                <span>Delete</span>
            </div>
            <div class="separator-line"></div>
            <div class="delete-edit-single">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_207322_3882" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_207322_3882)">
                        <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                    </g>
                </svg>              
                <span onclick="">Edit</span>
            </div>
            </div>
        </div>

  `;
}
