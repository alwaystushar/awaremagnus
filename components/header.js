export function initHeader(options = {}) {
  const {
    title = "Welcome",
    name = "User",
    email = "",
    profileImage = "images/img/profile.png",
    onSearch,
    onMailClick,
    onNotificationClick,
    onProfileClick,
    onHamburgerClick,
  } = options;

  // Set dynamic data
  const titleEl = document.getElementById("header-title");
  const nameEl = document.getElementById("profile-name");
  const emailEl = document.getElementById("profile-email");
  const profileImgEl = document.getElementById("profile-image");

  if (titleEl) titleEl.textContent = title;
  if (nameEl) nameEl.textContent = name;
  if (emailEl) emailEl.textContent = email;
  if (profileImgEl) profileImgEl.src = profileImage;

  // Search
  const searchInput = document.getElementById("header-search");
  if (searchInput && typeof onSearch === "function") {
    searchInput.addEventListener("input", (e) => {
      onSearch(e.target.value);
    });
  }

  // Mail
  const mailBtn = document.getElementById("mail-btn");
  if (mailBtn && typeof onMailClick === "function") {
    mailBtn.addEventListener("click", onMailClick);
  }

  // Notification
  const notificationBtn = document.getElementById("notification-btn");
  if (notificationBtn && typeof onNotificationClick === "function") {
    notificationBtn.addEventListener("click", onNotificationClick);
  }

  // Profile
  const profileSection = document.getElementById("profile-section");
  if (profileSection && typeof onProfileClick === "function") {
    profileSection.addEventListener("click", onProfileClick);
  }

  // Hamburger
  const hamburgerBtn = document.getElementById("hamburger");
  if (hamburgerBtn && typeof onHamburgerClick === "function") {
    hamburgerBtn.addEventListener("click", onHamburgerClick);
  }
}
