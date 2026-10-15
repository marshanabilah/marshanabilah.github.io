(() => {
  const root = document.querySelector("[data-tech-stack-explorer]");
  if (!root) return;

  const status = document.querySelector("#stack-status");
  const errorState = document.querySelector("#stack-error");
  const emptyState = document.querySelector("#stack-empty");
  const workspace = document.querySelector("#stack-workspace");
  const retryButton = document.querySelector("#stack-retry");
  const resetButton = document.querySelector("#stack-reset");
  const chart = document.querySelector("#stack-chart");
  const method = document.querySelector("#stack-method");
  const selection = document.querySelector("#stack-selection");
  const repositoryList = document.querySelector("#stack-repository-list");
  let stackData;

  function setVisibleState(state, message) {
    status.hidden = state !== "loading";
    errorState.hidden = state !== "error";
    emptyState.hidden = state !== "empty";
    workspace.hidden = state !== "ready";
    if (message) status.textContent = message;
  }

  function uniqueRepositories(languages) {
    const repositories = new Map();
    languages.forEach((language) => {
      language.repositories.forEach((repository) => {
        repositories.set(repository.url, repository);
      });
    });
    return [...repositories.values()].sort((left, right) => (
      left.name.localeCompare(right.name)
    ));
  }

  function renderRepositories(language) {
    const languages = language ? [language] : stackData.languages;
    const repositories = uniqueRepositories(languages);
    selection.textContent = language
      ? `${language.name}, ${language.percentage.toFixed(1)}% of detected bytes`
      : "All represented languages";
    repositoryList.replaceChildren();

    repositories.forEach((repository) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;
      item.append(link);
      repositoryList.append(item);
    });
  }

  function selectLanguage(language, selectedButton) {
    chart.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button === selectedButton));
    });
    resetButton.setAttribute("aria-pressed", "false");
    renderRepositories(language);
  }

  function renderChart() {
    chart.replaceChildren();
    stackData.languages.forEach((language, index) => {
      const item = document.createElement("div");
      item.setAttribute("role", "listitem");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "stack-bar";
      button.setAttribute("aria-pressed", "false");
      button.setAttribute(
        "aria-label",
        `Show repositories using ${language.name}, ${language.percentage.toFixed(1)} percent`,
      );

      const rank = document.createElement("span");
      rank.className = "stack-bar-rank";
      rank.textContent = String(index + 1).padStart(2, "0");

      const label = document.createElement("span");
      label.className = "stack-bar-label";
      label.textContent = language.name;

      const track = document.createElement("span");
      track.className = "stack-bar-track";
      const fill = document.createElement("span");
      fill.className = "stack-bar-fill";
      fill.style.width = `${Math.max(language.percentage, 0.6)}%`;
      track.append(fill);

      const value = document.createElement("span");
      value.className = "stack-bar-value";
      value.textContent = `${language.percentage.toFixed(1)}%`;

      button.append(rank, label, track, value);
      button.addEventListener("click", () => selectLanguage(language, button));
      item.append(button);
      chart.append(item);
    });
  }

  function validateData(data) {
    return data
      && Number.isInteger(data.repositoryCount)
      && Array.isArray(data.languages)
      && data.languages.every((language) => (
        typeof language.name === "string"
        && typeof language.percentage === "number"
        && Array.isArray(language.repositories)
      ));
  }

  async function loadStack() {
    setVisibleState("loading", "Loading public repository data.");
    try {
      const response = await fetch(root.dataset.source, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Data request failed with ${response.status}`);
      const data = await response.json();
      if (!validateData(data)) throw new Error("Repository data has an unexpected format");
      if (data.languages.length === 0) {
        setVisibleState("empty");
        return;
      }

      stackData = data;
      method.textContent = `${data.repositoryCount} public repositories, ranked by detected language bytes.`;
      renderChart();
      renderRepositories();
      resetButton.setAttribute("aria-pressed", "true");
      setVisibleState("ready");
    } catch (error) {
      console.error("Tech stack explorer:", error);
      setVisibleState("error");
    }
  }

  resetButton.addEventListener("click", () => {
    chart.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", "false");
    });
    resetButton.setAttribute("aria-pressed", "true");
    renderRepositories();
  });
  retryButton.addEventListener("click", loadStack);
  loadStack();
})();
