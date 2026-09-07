---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: Home
background: /img/bg-index.jpg
---

<section class="portfolio-intro" aria-labelledby="intro-heading">
  <p class="eyebrow">AI &amp; data engineer</p>
  <h2 id="intro-heading">I study how models learn, store, and update knowledge.</h2>
  <p class="lead">I'm Marsha Nabilah. My work sits between machine learning and data engineering, with research experience in large language models, natural language processing, and cross-lingual knowledge editing.</p>
  <div class="intro-actions">
    <a class="btn btn-primary" href="#research">See my research</a>
    <a class="btn btn-outline-primary" href="mailto:{{ site.email }}">Get in touch</a>
  </div>
</section>

<section class="portfolio-section" id="research" aria-labelledby="research-heading">
  <p class="eyebrow">Selected research</p>
  <h2 id="research-heading">Questions I’ve explored through data</h2>
  <div class="project-grid">
    <article class="project-card">
      <p class="project-number">01</p>
      <h3>Cross-lingual knowledge editing in LLMs</h3>
      <p>Investigated how knowledge edited in one language transfers to another, using an Indonesian-English case study. The work included experimental evaluation, model-performance analysis, and inspection of neuron activations.</p>
      <p class="project-stack">Python · PyTorch · LLMs · NLP</p>
      <p class="project-context">MPhil thesis · Hiroshima University</p>
    </article>
    <article class="project-card">
      <p class="project-number">02</p>
      <h3>Stock prediction using recurrent neural networks</h3>
      <p>Applied recurrent neural networks to market transaction data to study sequence-based stock prediction as part of my Informatics Engineering undergraduate thesis.</p>
      <p class="project-stack">Python · RNNs · Time-series data · Machine learning</p>
      <p class="project-context">Bachelor’s thesis · Institut Teknologi Sepuluh Nopember</p>
    </article>
  </div>
</section>

<section class="portfolio-section experience-section" id="experience" aria-labelledby="experience-heading">
  <p class="eyebrow">Experience</p>
  <h2 id="experience-heading">Engineering experience in production environments</h2>
  <div class="experience-list">
    <article class="experience-item">
      <div class="experience-meta">
        <p>Nov 2022 — Mar 2024</p>
        <p>Surabaya, Indonesia</p>
      </div>
      <div>
        <h3>Software Developer</h3>
        <p class="organization">CamLine Indonesia</p>
        <p>Delivered more than 20 features and enhancements for enterprise applications and resolved more than 50 defects and maintenance requests. Worked across requirements, implementation, testing, deployment support, and post-release maintenance.</p>
        <p class="project-stack">Java · Spring Boot · ZK · JUnit</p>
      </div>
    </article>
    <article class="experience-item">
      <div class="experience-meta">
        <p>Dec 2021 — Jun 2022</p>
        <p>Remote</p>
      </div>
      <div>
        <h3>Software Engineer Intern</h3>
        <p class="organization">Mekari</p>
        <p>Built and maintained internal application features, automated repetitive operational work, and supported data-processing and integration workflows using Apache NiFi and MongoDB.</p>
        <p class="project-stack">Ruby on Rails · Apache NiFi · MongoDB · Jenkins</p>
      </div>
    </article>
  </div>
</section>

<section class="portfolio-section about-preview" aria-labelledby="about-heading">
  <div>
    <p class="eyebrow">About me</p>
    <h2 id="about-heading">Research depth with production engineering experience.</h2>
  </div>
  <div>
    <p>I completed an MPhil in the Data Analysis and Modelling Laboratory at Hiroshima University, where I evaluated large language models using Python and PyTorch.</p>
    <p>My background also includes enterprise software development, automation, data integration, testing, and CI/CD.</p>
    <a href="{{ '/about/' | relative_url }}">More about me <span aria-hidden="true">&rarr;</span></a>
  </div>
</section>

<section class="portfolio-cta" aria-labelledby="contact-heading">
  <p class="eyebrow">Let’s connect</p>
  <h2 id="contact-heading">Have an opportunity or an interesting project?</h2>
  <p>I’d be happy to hear about it.</p>
  <a class="btn btn-light" href="mailto:{{ site.email }}">Email me</a>
</section>
