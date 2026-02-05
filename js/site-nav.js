(function () {
  const pages = [
    "index.html",
    "awareness-magnus-dashboard.html",
    "user-Dashboard.html",
    "user-report-camp-creation.html",
    "User-Report.html",
    "Report-Card.HTML",
    "Achievement-History.html",
    "Assignment.html",
    "Modules.html",
    "add-module.html",
    "add-new-module-content.html",
    "Security.html",
    "physical-security.html",
    "my-library.html",
    "Campaign-Statistics.html",
    "campaigns-user-leaderboard.html",
    "campaings.html",
    "Survey-Management.html",
    "survey-statistics.html",
    "Quiz-List.html",
    "Quiz-and-Answer.html",
    "add-quiz-manually-fill-form.html",
    "add-quiz-manually-fill-form-option-2.html",
    "Answer-Quiz-Multichoice.html",
    "CertificateList.html",
    "Certificate-list.html",
    "branding-from-cretificate.html",
    "video-player.html",
    "user-darshboard-rtl.html"
  ];

  const currentFile = (window.location.pathname.split("/").pop() || "").toLowerCase();

  const toTitle = (fileName) => {
    const base = fileName.replace(/\.html?$/i, "");
    const spaced = base.replace(/[-_]+/g, " ");
    return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const buildNav = () => {
    const nav = document.createElement("nav");
    nav.id = "site-nav";

    const listItems = pages
      .map((file) => {
        const isCurrent = file.toLowerCase() === currentFile;
        const label = toTitle(file);
        const ariaCurrent = isCurrent ? ' aria-current="page"' : "";
        const currentClass = isCurrent ? " class=\"current\"" : "";
        return `<li><a href=\"${file}\"${ariaCurrent}${currentClass}>${label}</a></li>`;
      })
      .join("");

    nav.innerHTML = `
      <details open>
        <summary>All Pages</summary>
        <ul>${listItems}</ul>
      </details>
    `;

    return nav;
  };

  const injectStyles = () => {
    if (document.getElementById("site-nav-styles")) return;
    const style = document.createElement("style");
    style.id = "site-nav-styles";
    style.textContent = `
      #site-nav {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 9999;
        font-family: "Nunito Sans", Arial, sans-serif;
      }
      #site-nav details {
        background: #ffffff;
        border: 1px solid rgba(0,0,0,0.08);
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        padding: 8px 10px;
        max-width: 260px;
      }
      #site-nav summary {
        cursor: pointer;
        font-size: 12px;
        font-weight: 700;
        color: #0f172a;
        outline: none;
      }
      #site-nav ul {
        margin: 8px 0 0 0;
        padding: 0 0 0 14px;
        max-height: 260px;
        overflow: auto;
        list-style: disc;
      }
      #site-nav li {
        margin: 4px 0;
      }
      #site-nav a {
        font-size: 12px;
        color: #2563eb;
        text-decoration: none;
      }
      #site-nav a:hover {
        text-decoration: underline;
      }
      #site-nav a.current {
        color: #0f172a;
        font-weight: 700;
        text-decoration: none;
        cursor: default;
      }
    `;
    document.head.appendChild(style);
  };

  const mountNav = () => {
    if (document.getElementById("site-nav")) return;
    injectStyles();
    document.body.appendChild(buildNav());
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountNav);
  } else {
    mountNav();
  }
})();
