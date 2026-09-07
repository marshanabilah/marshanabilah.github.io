---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Home
background: /img/bg-index.jpg
---

<section class="portfolio-intro" aria-labelledby="intro-heading">
  <p class="eyebrow">Software developer</p>
  <h2 id="intro-heading">I turn ideas into practical, dependable web experiences.</h2>
  <p class="lead">I'm Marsha Nabilah Wibowo. I enjoy building straightforward digital products, learning through real projects, and making technology feel easier to use.</p>
  <div class="intro-actions">
    <a class="btn btn-primary" href="#work">See my work</a>
    <a class="btn btn-outline-primary" href="mailto:{{ site.email }}">Get in touch</a>
  </div>
</section>

<section class="portfolio-section" id="work" aria-labelledby="work-heading">
  <p class="eyebrow">Selected work</p>
  <h2 id="work-heading">Projects I’m building</h2>
  <div class="project-grid">
    <article class="project-card">
      <p class="project-number">01</p>
      <h3>Personal portfolio</h3>
      <p>A fast, responsive portfolio built with Jekyll and GitHub Pages. The project turns a blog theme into a focused home for my work, experience, and writing.</p>
      <p class="project-stack">Jekyll · HTML · Sass · GitHub Actions</p>
      <a href="https://github.com/{{ site.github_username }}/marshanabilah.github.io">View repository <span aria-hidden="true">&rarr;</span></a>
    </article>
    <article class="project-card">
      <p class="project-number">02</p>
      <h3>Portfolio contact API</h3>
      <p>A lightweight FastAPI service that accepts contact-form messages and delivers them securely by email using environment-based configuration.</p>
      <p class="project-stack">Python · FastAPI · Pydantic · SMTP</p>
      <a href="https://github.com/{{ site.github_username }}/github.io-backend">View repository <span aria-hidden="true">&rarr;</span></a>
    </article>
  </div>
</section>

<section class="portfolio-section about-preview" aria-labelledby="about-heading">
  <div>
    <p class="eyebrow">About me</p>
    <h2 id="about-heading">Curious by nature, thoughtful in execution.</h2>
  </div>
  <div>
    <p>I’m developing my craft through hands-on software projects, with an emphasis on readable code, useful interfaces, and steady improvement.</p>
    <p>My current toolkit includes Python, FastAPI, HTML, CSS/Sass, Jekyll, Git, and GitHub Actions.</p>
    <a href="{{ '/about/' | relative_url }}">More about me <span aria-hidden="true">&rarr;</span></a>
  </div>
</section>

<section class="portfolio-cta" aria-labelledby="contact-heading">
  <p class="eyebrow">Let’s connect</p>
  <h2 id="contact-heading">Have an opportunity or an interesting project?</h2>
  <p>I’d be happy to hear about it.</p>
  <a class="btn btn-light" href="mailto:{{ site.email }}">Email me</a>
</section>
